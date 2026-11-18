# alaidi.net

Course pages of Abdul Hadi M. Alaidi, College of Computer Science and
Information Technology, Wasit University. Live at **https://alaidi.net**.

Each course page has the syllabus week by week, the textbooks, and the lecture
slides, labs and assignments to download. The site is in English and Arabic,
switched by the **ع** button in the header.

## Download the whole site

**Code → Download ZIP** on this page, or:

```bash
git clone https://github.com/alaidi/alaidi.net.git
```

That gives you every page and every lecture file except one: the Computer
Vision Lecture 1 slides (116 MB) are over GitHub's 100 MB limit, so they are
only on the live site. Get them from
[fall-2024/computer-vision](https://alaidi.net/fall-2024/computer-vision/).

## Browse it offline

It is plain HTML and CSS: no build step, no dependencies. From the folder you
downloaded:

```bash
python3 -m http.server 8899
```

Then open http://localhost:8899. Opening `index.html` straight from disk does
not work well: links point at folders, and the search box needs a server.

## What's where

| Path | Contents |
|---|---|
| `index.html` | Course list, newest term first |
| `<term>/<course>/` | One page per course, e.g. `fall-2026/soft-computing/` |
| `download/` | Lecture slides, labs, assignments and books |
| `about-me/` | Bio, books, publications, career timeline |
| `privacy-policy/` | What the site collects and how to opt out |
| `style.css`, `i18n.js` | The only stylesheet and the English/Arabic switch |

## Editing

Maintenance rules (cache-busting hashes, the three-state theme, the bilingual
setup, deploy) are in [CLAUDE.md](CLAUDE.md). Read it before changing shared
files: the header and footer are copied into every page on purpose.

## Use

© Abdul Hadi M. Alaidi. All rights reserved. You may download and read the
material for study. Ask before republishing it.
