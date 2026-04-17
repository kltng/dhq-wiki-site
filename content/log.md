---
title: "Wiki Log"
tags: ['meta']
---
# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete

## [2026-04-17] create | Wiki initialized
- Domain: Digital Humanities Quarterly (DHQ) — full journal archive
- Source: github.com/kltng/dhq-journal (869 articles in TEI XML)
- Structure created with SCHEMA.md, index.md, log.md

## [2026-04-17] create | 20 CONCEPT, METHOD, and DEBATE pages
- Created 8 concept pages in concepts/:
  - digital-humanities-dhq.md (DH field identity, 182 articles)
  - literary-studies-dhq.md (computational literary analysis, ~195 articles)
  - media-studies-dhq.md (media studies, cultural criticism, visual art, ~255 articles)
  - archives-access.md (archives, access, digitization, data curation, ~312 articles)
  - cultural-heritage.md (cultural heritage, area studies, ~121 articles)
  - gender-race-ethics.md (gender, race, ethics in DH, ~159 articles)
  - collaboration-interdisciplinarity.md (collaboration, interdisciplinarity, ~278 articles)
  - publishing-dhq.md (digital publishing, access, ~131 articles)
- Created 6 method pages in methods/:
  - data-analytics-dhq.md (data analytics, modeling, visualization, ~244 articles)
  - machine-learning-dhq.md (machine learning, AI, 64 articles)
  - corpus-methods-dhq.md (corpora, text analysis, 64 articles)
  - tools-infrastructure-dhq.md (tools, infrastructure, users, ~314 articles)
  - pedagogy-dhq.md (pedagogy, digital literacy, 97 articles)
  - digital-history-dhq.md (digital history, spatial humanities, 158 articles)
- Created 6 debate pages in debates/:
  - definition-of-dh.md (what counts as DH? field boundaries)
  - quantitative-vs-qualitative.md (distant reading vs. close reading)
  - tools-and-theory.md (tool-building vs. theory-generating tension)
  - algorithmic-bias-ethics.md (ethics, bias, race/gender in DH)
  - sustainability-infrastructure.md (sustainability of DH projects)
  - access-openness.md (open access, democratization, digital divides)
- Read representative articles: 000005, 000007, 000012, 000020, 000039, 000043, 000055
- Extracted arguments from TEI XML body text and abstracts
- Each page includes: Overview, Key Articles table, Arguments/Evolution, Key Voices, See Also wikilinks
- Updated index.md with all 20 pages cataloged

## [2026-04-17] ingest | Bulk article download + wiki build
- Downloaded 864 TEI XML articles from github.com/kltng/dhq-journal via GitHub API
- Parsed all article headers: title, authors, keywords, volume/issue, dates, word counts
- Built 80 wiki pages:
  - entities/: 60 author pages (2+ articles each)
  - concepts/: 8 pages (digital humanities, literary studies, media studies, archives, cultural heritage, gender/race/ethics, collaboration, publishing)
  - methods/: 6 pages (data analytics, machine learning, corpus methods, tools/infrastructure, pedagogy, digital history)
  - debates/: 6 pages (definition of DH, quantitative vs qualitative, tools vs theory, algorithmic bias, sustainability, access)
- Master index with all 864 articles organized by volume
- Total wikilinks across wiki: 652
- Stats: 864 articles, 1,614 unique authors, 5.98M words, 94 unique keywords, 23 volumes

## [2026-04-17] ingest | Full article Markdown conversion
- Converted all 864 TEI XML articles to Markdown (28.6 MB)
- Each article: YAML frontmatter (title, authors, volume, issue, date, type, keywords, word count) + full body text + notes/references
- TEI elements mapped: div→headings, p→paragraphs, list→lists, table→markdown tables, quote→blockquotes, figure→images, hi→bold/italic, ref→links, foreign→italic, code→inline code
- Zero conversion errors
- Output: articles/XXXXXX.md (864 files, avg 34 KB each)

## [2026-04-17] update | Wikilink cross-referencing
- Added [[wikilinks]] to 833 articles (authors → entity pages, keywords → concept/method/debate pages)
- Deduplicated keyword links (multiple keywords mapping to same page shown once)
- Added "See Also" sections to all articles with relevant entity/topic links
- 6,762 total wikilinks across entire wiki (was 652)
