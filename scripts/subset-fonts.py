"""Subset the two variable fonts to the characters this site uses.

Keeps Basic Latin, Latin-1 (accented names, ©, ·, ×) and typographic
punctuation, and drops everything else, roughly halving the download.
Needs: pip install fonttools brotli. Run: python3 scripts/subset-fonts.py
Output: app/fonts/*.woff2 (referenced by app/styles/fonts.css)
"""
import os

from fontTools import subset

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FS = os.path.join(ROOT, "node_modules", "@fontsource-variable")
OUT = os.path.join(ROOT, "app", "fonts")
os.makedirs(OUT, exist_ok=True)

UNICODES = "U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2026,U+2032-2033,U+2192"
FILES = {
    "newsreader-roman.woff2": "newsreader/files/newsreader-latin-wght-normal.woff2",
    "newsreader-italic.woff2": "newsreader/files/newsreader-latin-wght-italic.woff2",
    "instrument-sans.woff2": "instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
}

for out_name, src in FILES.items():
    src_path = os.path.join(FS, src)
    out_path = os.path.join(OUT, out_name)
    args = [
        src_path,
        f"--unicodes={UNICODES}",
        "--flavor=woff2",
        f"--output-file={out_path}",
        "--layout-features=kern,liga,calt,lnum,tnum,onum,ccmp,locl,mark,mkmk",
        "--no-hinting",
        "--desubroutinize",
    ]
    subset.main(args)
    print(f"{out_name}: {os.path.getsize(src_path) // 1024} KB -> {os.path.getsize(out_path) // 1024} KB")
