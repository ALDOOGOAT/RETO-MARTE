import markdown
import sys
import subprocess
import os

CSS = """
@page { size: A4; margin: 16mm 14mm 18mm 14mm; }
body { font-family: "DejaVu Sans", "Liberation Sans", sans-serif; font-size: 10pt;
       line-height: 1.5; color: #1b1b1f; }
h1 { font-size: 20pt; color: #7a2718; border-bottom: 3px solid #c1440e; padding-bottom: .2em;
     margin-top: 1.4em; page-break-after: avoid; }
h1:first-of-type { margin-top: 0; }
h2 { font-size: 15pt; color: #8c3a12; margin-top: 1.5em; border-bottom: 1px solid #e0c4b4;
     padding-bottom: .15em; page-break-after: avoid; }
h3 { font-size: 12pt; color: #2f4858; margin-top: 1.2em; page-break-after: avoid; }
h4 { font-size: 10.5pt; color: #2f4858; page-break-after: avoid; }
table { border-collapse: collapse; width: 100%; margin: .8em 0; font-size: 8.6pt;
        page-break-inside: avoid; }
th { background: #f2e4dc; text-align: left; }
th, td { border: 1px solid #cbb8ae; padding: 4px 6px; vertical-align: top; }
tr:nth-child(even) td { background: #fbf7f5; }
blockquote { border-left: 4px solid #c1440e; background: #fdf6f2; margin: .9em 0;
             padding: .5em .9em; page-break-inside: avoid; }
code { font-family: "DejaVu Sans Mono", monospace; font-size: 8.5pt; background: #f0eeec;
       padding: 1px 3px; border-radius: 2px; }
pre { background: #1e1e22; color: #e8e6e3; padding: .8em; border-radius: 4px;
      font-size: 7.4pt; line-height: 1.35; overflow-x: hidden; page-break-inside: avoid; }
pre code { background: none; color: inherit; font-size: inherit; }
ul, ol { margin: .5em 0; padding-left: 1.4em; }
li { margin: .18em 0; }
hr { border: none; border-top: 1px solid #d8cec8; margin: 1.6em 0; }
a { color: #8c3a12; word-break: break-all; }
strong { color: #101014; }
"""

for md_file in sys.argv[1:]:
    pdf_file = md_file.replace('.md', '.pdf')
    html_file = md_file.replace('.md', '.tmp.html')

    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()

    html = markdown.markdown(text, extensions=['tables', 'fenced_code', 'sane_lists', 'attr_list'])

    with open(html_file, 'w', encoding='utf-8') as f:
        title = os.path.splitext(os.path.basename(md_file))[0]
        f.write('<html><head><meta charset="utf-8"><title>' + title +
                '</title><style>' + CSS + '</style></head><body>')
        f.write(html)
        f.write('</body></html>')

    subprocess.run([
        'google-chrome',
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=15000',
        '--no-pdf-header-footer',
        '--print-to-pdf=' + os.path.abspath(pdf_file),
        '--no-margins',
        'file://' + os.path.abspath(html_file)
    ], stderr=subprocess.DEVNULL)

    os.remove(html_file)
    print(f"Generated {pdf_file}")
