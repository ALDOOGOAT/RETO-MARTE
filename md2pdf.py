import markdown
import sys
import subprocess
import os

for md_file in sys.argv[1:]:
    pdf_file = md_file.replace('.md', '.pdf')
    html_file = md_file.replace('.md', '.html')

    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()

    html = markdown.markdown(text)

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write('<html><head><meta charset="utf-8"></head><body style="font-family: sans-serif; padding: 2em; line-height: 1.6;">')
        f.write(html)
        f.write('</body></html>')

    subprocess.run([
        'google-chrome', 
        '--headless', 
        '--disable-gpu', 
        '--print-to-pdf=' + os.path.abspath(pdf_file), 
        '--no-margins',
        'file://' + os.path.abspath(html_file)
    ])

    os.remove(html_file)
    print(f"Generated {pdf_file}")
