---
title: "Build Process"
tags: ['meta']
---
# DHQ Wiki — Build Process

> Complete documentation of how this wiki was constructed from source TEI XML to cross-referenced knowledge base.

## Overview

Built on 2026-04-17. Converts the entire Digital Humanities Quarterly journal archive (864 articles, 453 MB of TEI XML) into a searchable Markdown wiki with entity pages, concept/method/debate analysis, and 6,762 cross-referencing wikilinks.

**Time:** ~2 hours end-to-end. **Cost:** ~$0.50 in API calls.

## Source

- **Repository:** [github.com/kltng/dhq-journal](https://github.com/kltng/dhq-journal)
- **Format:** TEI P5 XML, one file per article
- **Size:** 453 MB (too large for direct `git clone` on a small VPS)
- **Access method:** GitHub Contents API via `gh api`

## Step-by-Step Process

### Step 1: Create Wiki Structure

```bash
mkdir -p ~/llm-wikis/dhq-wiki/{raw/articles,entities,concepts,methods,debates,institutions,projects,tools,glossary,volumes}
```

Created `SCHEMA.md` (conventions, frontmatter format, tag taxonomy, directory layout), `index.md` (placeholder), `log.md` (empty).

### Step 2: Download All Articles via GitHub API

The repo is 453 MB — too large for `git clone` on the VPS. Instead, use the GitHub Contents API:

```bash
# List all article directories
gh api repos/kltng/dhq-journal/contents/articles --jq '.[].name'

# For each article directory, find the XML file and download it
for dir in $(cat /tmp/dhq_download_list.txt); do
    XMLFILE=$(gh api "repos/kltng/dhq-journal/contents/articles/$dir" --jq '.[].name' 2>/dev/null | grep '\.xml$' | head -1)
    CONTENT=$(gh api "repos/kltng/dhq-journal/contents/articles/$dir/$XMLFILE" --jq '.content' 2>/dev/null)
    echo "$CONTENT" | base64 -d > "raw/articles/${dir}.xml"
done
```

**Result:** 864 TEI XML files, 71 MB. Took ~30 seconds (all API calls parallelized).

### Step 3: Parse TEI Headers

Python script using `xml.etree.ElementTree` to extract from each article:

| Field | TEI XPath |
|-------|-----------|
| Title | `//tei:teiHeader//tei:titleStmt/tei:title[@type="article"]` |
| Authors | `//tei:teiHeader//dhq:authorInfo/dhq:author_name` |
| Affiliations | `//tei:teiHeader//dhq:authorInfo/dhq:affiliation` |
| Volume | `//tei:teiHeader//tei:publicationStmt/tei:idno[@type="volume"]` |
| Issue | `//tei:teiHeader//tei:publicationStmt/tei:idno[@type="issue"]` |
| Date | `//tei:teiHeader//tei:publicationStmt/tei:date/@when` |
| Article type | `//tei:teiHeader//tei:publicationStmt/dhq:articleType` |
| DHQ keywords | `//tei:teiHeader//tei:profileDesc/tei:textClass/tei:keywords[@scheme="#dhq_keywords"]/tei:term` |
| Author keywords | `//tei:teiHeader//tei:profileDesc/tei:textClass/tei:keywords[@scheme="#authorial_keywords"]/tei:term` |
| Abstract | `//tei:teiHeader//tei:profileDesc/tei:abstract` |
| Word count | Count words in `//tei:text/tei:body` |

**Namespaces:**
```python
ns = {
    'tei': 'http://www.tei-c.org/ns/1.0',
    'dhq': 'http://www.digitalhumanities.org/ns/dhq',
    'html': 'http://www.w3.org/1999/xhtml',
}
```

**Result:** `/tmp/dhq_metadata.json` — 864 entries with all metadata fields.

### Step 4: Build Topic Pages (Concepts, Methods, Debates)

Created 20 pages by:
1. Analyzing the 94 unique DHQ keywords and grouping related ones
2. Identifying representative articles (3–5 per page)
3. Reading full TEI body text of those articles to extract actual arguments
4. Writing structured pages with: Overview, Key Articles table, Arguments/Evolution, Key Voices, See Also

**Keyword → Page mapping** (131 keyword terms → 20 pages):

| Keywords | Page |
|----------|------|
| dh, philosophy, project report | `digital-humanities-dhq` |
| literary studies, reading, poetry, narrative | `literary-studies-dhq` |
| media studies, cultural criticism, visual art, art, film | `media-studies-dhq` |
| archives, access, digitization, data curation | `archives-access` |
| cultural heritage, area studies, museums | `cultural-heritage` |
| gender, race, ethics | `gender-race-ethics` |
| collaboration, interdisciplinarity, project management | `collaboration-interdisciplinarity` |
| publishing, print culture | `publishing-dhq` |
| data analytics, data modeling, data visualization | `data-analytics-dhq` |
| machine learning, NLP, topic modeling | `machine-learning-dhq` |
| corpora, text analysis, linguistics, stylometry | `corpus-methods-dhq` |
| tools, infrastructure, users, TEI, XML | `tools-infrastructure-dhq` |
| pedagogy, digital literacy, teaching | `pedagogy-dhq` |
| history, GIS, mapping | `digital-history-dhq` |
| + 6 debate pages | `definition-of-dh`, `quantitative-vs-qualitative`, etc. |

### Step 5: Build Author Entity Pages

Generated 60 pages for authors with 2+ DHQ articles using a Python script (`/tmp/generate_author_pages.py`) that:

1. Counted author appearances across all 864 articles
2. For each prolific author, collected: all their DHQ publications, affiliations, keyword focus areas, co-authors
3. Generated Markdown pages with YAML frontmatter and `[[wikilinks]]` to related authors/topics

Top authors: Julia Flanders (12), Julianne Nyhan (8), Melissa Terras (7), Johanna Drucker (6), Stéfan Sinclair (6), Geoffrey Rockwell (6).

### Step 6: Build Master Index

Python script that:
1. Grouped all 864 articles by volume, then by issue
2. Generated a table per volume: ID, Title, Authors, Type, Keywords
3. Appended lists of all wiki pages (entities, concepts, methods, debates)
4. Added statistics section

**Result:** `index.md` — 141 KB, 1,067 lines.

### Step 7: Convert TEI XML to Markdown

Custom TEI→Markdown converter handling:

| TEI Element | Markdown Output |
|-------------|-----------------|
| `tei:div` | `## Heading` (nested depth) |
| `tei:p` | Paragraph |
| `tei:head` | `## Heading` |
| `tei:list` + `tei:item` | `- item` or `1. item` |
| `tei:quote` | `> blockquote` |
| `tei:table` + `tei:row` + `tei:cell` | Markdown table |
| `tei:figure` | `![caption](url)` |
| `tei:hi[@rend="bold"]` | `**bold**` |
| `tei:hi[@rend="italic"]` | `*italic*` |
| `tei:emph` | `*italic*` |
| `tei:ref` | `[text](target)` |
| `tei:title[@level="m"]` | `*monograph title*` |
| `tei:foreign` | `*foreign*` |
| `tei:code` | `` `code` `` |
| `tei:note` | `**Note N:** text` |
| `tei:lg` + `tei:l` | Indented poetry lines |
| `tei:said` | `> **Speaker**: text` |

Each Markdown file gets YAML frontmatter with all metadata fields, the article title as H1, author/volume/keywords info, abstract, full body text, and back matter (notes/references).

**Result:** 864 `.md` files in `articles/`, 28.6 MB total, avg 34 KB per article. Zero conversion errors.

### Step 8: Cross-Reference with Wikilinks

Two passes over all 864 Markdown articles:

**Pass 1 — Author & Keyword Links:**
- Author names in the `**Authors:**` line → `[[Entity_Page|Display Name]]`
- Keywords in the `**Keywords:**` line → `[[topic-page|keyword]]` (deduplicated: multiple keywords mapping to same page shown once)

**Pass 2 — See Also Sections:**
- Appended `## See Also` to each article with links to:
  - Author entity pages (for profiled authors)
  - Relevant concept/method/debate pages (from keyword mapping)
- Unmapped keywords stay as plain text

**Result:** 833 articles updated, 2,782 links added, 6,762 total wikilinks across the wiki.

### Step 9: Push to GitHub

```bash
cd ~/llm-wikis/dhq-wiki
git init
git add -A
git commit -m "Initial commit: DHQ wiki — 864 articles, 80 topic pages"
gh repo create kltng/dhq-wiki --private --source . --push
```

## Final Stats

| Metric | Value |
|--------|-------|
| Raw TEI XML articles | 864 (71.3 MB) |
| Markdown articles | 864 (28.6 MB) |
| Entity pages | 60 |
| Concept pages | 8 |
| Method pages | 6 |
| Debate pages | 6 |
| Total .md files | 947 |
| Total wikilinks | 6,762 |
| Total words (all articles) | 5,985,953 |
| Unique authors | 1,614 |
| Unique keywords | 94 |
| Volumes covered | 23 (2007–present) |
| Article types | article (774), review (36), case study (16), editorial (16), opinion (7), field report (2) |
| Total wiki size | 100.3 MB |
| GitHub repo | github.com/kltng/dhq-wiki (private) |

## Files Created During Build (temporary)

These are working files, not part of the wiki:
- `/tmp/dhq_article_dirs.json` — list of all article directory names
- `/tmp/dhq_download_list.txt` — download list for bash script
- `/tmp/dhq_download.sh` — bash download script
- `/tmp/dhq_metadata.json` — parsed metadata for all 864 articles
- `/tmp/generate_author_pages.py` — entity page generator script

## Tools Used

- **GitHub CLI** (`gh api`) — article download
- **Python stdlib** (`xml.etree.ElementTree`, `json`, `re`, `collections`) — TEI parsing, metadata extraction, Markdown conversion, wikilink injection
- **Hermes agent** — orchestration, parallel subagent delegation for concept/method/debate pages
- **git** — version control and push

## Reproducibility

To rebuild from scratch:
1. Clone `github.com/kltng/dhq-journal` (or use API if repo is too large)
2. Run Step 3 TEI parser → `dhq_metadata.json`
3. Run Steps 4–5 for topic/entity pages (requires LLM for analysis)
4. Run Step 7 TEI→Markdown converter
5. Run Step 8 wikilink injector
6. Run Step 9 git push

The TEI parser (Step 3), Markdown converter (Step 7), and wikilink injector (Step 8) are fully deterministic Python scripts. Steps 4–5 (topic pages) require LLM judgment for argument synthesis.
