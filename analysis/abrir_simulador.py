#!/usr/bin/env python3
"""Abre MILPA-360 en localhost con permiso de cámara persistente y perfil propio."""

import argparse
import json
import os
from pathlib import Path
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit


RAIZ = Path(__file__).resolve().parent.parent
PUBLICOS = {"prototipo-3d", "config", "visuales"}
ORIGEN = "http://127.0.0.1:8765"
URL = ORIGEN + "/prototipo-3d/milpa360-simulador.html"
PERFIL = Path.home() / ".local/share/milpa360/chrome"


def ruta_publica(url):
    ruta = (RAIZ / unquote(urlsplit(url).path).lstrip("/")).resolve()
    partes = ruta.relative_to(RAIZ).parts
    if len(partes) < 2 or partes[0] not in PUBLICOS or any(p.startswith(".") for p in partes):
        raise ValueError("Ruta no pública")
    return ruta


class Publicos(SimpleHTTPRequestHandler):
    def translate_path(self, url):
        return str(ruta_publica(url))

    def send_head(self):
        try:
            ruta = ruta_publica(self.path)
        except (OSError, ValueError):
            self.send_error(403, "Ruta no publica")
            return None
        if not ruta.is_file():
            self.send_error(404, "Archivo no encontrado")
            return None
        return super().send_head()

    def list_directory(self, _ruta):
        self.send_error(403, "No se permite listar directorios")
        return None

    def log_message(self, _formato, *_args):
        pass


def configurar_camara(perfil):
    lock = perfil / "SingletonLock"
    bloqueado = os.path.lexists(lock)
    if bloqueado:
        try:
            equipo, texto_pid = os.readlink(lock).rsplit("-", 1)
            pid = int(texto_pid)
        except (OSError, ValueError):
            pass
        else:
            if equipo == socket.gethostname() and pid > 0:
                try:
                    os.kill(pid, 0)
                except ProcessLookupError:
                    bloqueado = False  # Chrome retira su lock obsoleto al arrancar.
                except PermissionError:
                    pass
    if bloqueado:
        raise RuntimeError("El perfil de MILPA-360 está abierto o bloqueado. Cierra su ventana antes de abrir otra.")
    archivo = perfil / "Default/Preferences"
    datos = json.loads(archivo.read_text()) if archivo.exists() else {}
    excepciones = datos.setdefault("profile", {}).setdefault("content_settings", {}).setdefault("exceptions", {})
    excepciones.setdefault("media_stream_camera", {})[ORIGEN + ",*"] = {
        "setting": 1,
        "last_modified": str(time.time_ns() // 1000 + 11644473600000000),
    }
    archivo.parent.mkdir(parents=True, exist_ok=True)
    temporal = None
    try:
        with tempfile.NamedTemporaryFile("w", dir=archivo.parent, delete=False, encoding="utf-8") as salida:
            temporal = Path(salida.name)
            json.dump(datos, salida, ensure_ascii=False)
        os.replace(temporal, archivo)
    finally:
        if temporal is not None:
            temporal.unlink(missing_ok=True)


def comprobar():
    assert ruta_publica("/prototipo-3d/milpa360-simulador.html?lang=en") == RAIZ / "prototipo-3d/milpa360-simulador.html"
    for url in ("/", "/.git/config", "/AGENTS.md", "/prototipo-3d/../../etc/passwd", "/prototipo-3d/%2e%2e/AGENTS.md"):
        try:
            ruta_publica(url)
        except ValueError:
            continue
        raise AssertionError("Se permitió una ruta privada: " + url)
    with tempfile.TemporaryDirectory(prefix="milpa-comprobar-") as carpeta:
        perfil = Path(carpeta)
        configurar_camara(perfil)
        archivo = perfil / "Default/Preferences"
        antes = archivo.read_bytes()
        excepciones = json.loads(antes)["profile"]["content_settings"]["exceptions"]
        assert set(excepciones) == {"media_stream_camera"}
        assert set(excepciones["media_stream_camera"]) == {ORIGEN + ",*"}
        assert excepciones["media_stream_camera"][ORIGEN + ",*"]["setting"] == 1
        lock = perfil / "SingletonLock"
        for destino in (socket.gethostname() + "-otro-12345", f"{socket.gethostname()}-{os.getpid()}"):
            lock.symlink_to(destino)
            try:
                configurar_camara(perfil)
            except RuntimeError:
                pass
            else:
                raise AssertionError("Se editó un perfil vivo o de otro equipo")
            assert archivo.read_bytes() == antes
            lock.unlink()
        terminado = subprocess.Popen([sys.executable, "-c", "pass"])
        terminado.wait()
        destino = f"{socket.gethostname()}-{terminado.pid}"
        lock.symlink_to(destino)
        configurar_camara(perfil)
        assert os.readlink(lock) == destino, "Chrome debe limpiar su propio lock obsoleto"
    print("Correcto: sólo cámara en 127.0.0.1:8765, rutas públicas y perfil cerrado.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--comprobar", action="store_true", help="verifica configuración y rutas sin abrir Chrome")
    args = parser.parse_args()
    if args.comprobar:
        comprobar()
        return 0
    chrome = shutil.which("google-chrome") or shutil.which("chromium")
    if not chrome:
        raise RuntimeError("No se encontró Google Chrome ni Chromium.")
    # Reservar el puerto antes de conceder acceso: si está ocupado, no cambiar el perfil.
    with ThreadingHTTPServer(("127.0.0.1", 8765), Publicos) as servidor:
        configurar_camara(PERFIL)
        threading.Thread(target=servidor.serve_forever, daemon=True).start()
        proceso = None
        try:
            proceso = subprocess.Popen([chrome, "--no-first-run", "--no-default-browser-check",
                                        "--user-data-dir=" + str(PERFIL), "--app=" + URL])
            return proceso.wait()
        finally:
            if proceso is not None and proceso.poll() is None:
                proceso.terminate()
                try:
                    proceso.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    proceso.kill()
                    proceso.wait()
            servidor.shutdown()


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
    except (OSError, RuntimeError, ValueError, TypeError, AttributeError) as error:
        print("No se pudo abrir MILPA-360: " + str(error), file=sys.stderr)
        sys.exit(1)
