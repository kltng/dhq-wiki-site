---
title: "Wiki Schema"
tags: ['meta']
---
# Wiki Schema: Digital Humanities Quarterly Knowledge Base

## Domain
Digital Humanities Quarterly (DHQ) — an open-access, peer-reviewed journal of digital humanities published by ADHO. This wiki covers all 869 articles published in DHQ, encompassing: computational literary analysis, text encoding (TEI), digital archives and editions, cultural heritage informatics, digital pedagogy, critical DH theory, spatial humanities, network analysis, OCR, NLP for humanities, linked data, knowledge graphs, gaming and interactive media, and AI/ML applications in humanities research.

## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `distant-reading.md`)
- Every wiki page starts with YAML frontmatter (see below)
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- When updating a page, always bump the `updated` date
- Every new page must be added to `index.md` under the correct section
- Every action must be appended to `log.md`
- Author names: use full name as given in the TEI header
- Article references: use DHQ article ID (e.g., `DHQ:000100`)

## Frontmatter
```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | method | debate | institution | project | tool | volume | glossary
tags: [from taxonomy below]
sources: [list of DHQ article IDs and other sources]
---
```

## Tag Taxonomy
### DHQ Keyword Taxonomy (from official schema)
- `cultural-criticism` — Cultural criticism, media theory
- `digital-literacy` — Digital literacy, pedagogy
- `digital-publishing` — Digital publishing, open access
- `games` — Games, interactive media, play
- `informatics` — Information science, data management
- `interdisciplinary` — Cross-disciplinary DH work
- `linguistics` — Computational linguistics, NLP
- `literary-studies` — Computational literary analysis
- `media-studies` — Media archaeology, new media
- `philosophy` — Philosophy of technology, ethics
- `spatial-humanities` — GIS, mapping, spatial analysis
- `text-encoding` — TEI, XML, markup languages
- `visual-culture` — Digital art, visual analytics

### Additional Tags
- `network-analysis` — Social network analysis, graph theory
- `ocr` — Optical character recognition
- `linked-data` — RDF, SPARQL, semantic web
- `archives` — Digital archives, preservation
- `digital-editions` — Scholarly editing, digital editions
- `corpus-linguistics` — Corpus methods, text collections
- `historical-research` — Historical methods, digital history
- `authorship-attribution` — Stylometry, authorship
- `topic-modeling` — Topic modeling, LDA
- `sentiment-analysis` — Sentiment, emotion analysis
- `distant-reading` — Computational text analysis at scale
- `close-reading` — Interpretive, hermeneutic approaches
- `data-visualization` — Visual representation of data
- `digital-archaeology` — Archaeological computing
- `musicology` — Digital musicology
- `art-history` — Digital art history
- `pedagogy` — Teaching, curriculum
- `infrastructure` — Tools, platforms, systems
- `ai-ml` — Artificial intelligence, machine learning
- `knowledge-graphs` — Graph databases, ontologies
- `digitization` — Scanning, OCR, document processing
- `digital-collections` — Libraries, museums, galleries
- `crowdsourcing` — Citizen scholarship, participation
- `privacy-ethics` — Ethics, privacy, bias

## Directory Structure
```
dhq-wiki/
├── SCHEMA.md           # This file
├── index.md            # Content catalog
├── log.md              # Action log
├── raw/
│   └── articles/       # Full TEI XML of all DHQ articles (immutable)
├── entities/           # People (authors, cited scholars), organizations
├── concepts/           # Theoretical concepts, frameworks
├── methods/            # Methodologies discussed in DHQ
├── debates/            # Scholarly debates and tensions
├── institutions/       # Universities, labs, organizations
├── projects/           # DH projects discussed
├── tools/              # Software, platforms, tools
├── glossary/           # Quick reference terms
└── volumes/            # Volume/issue summaries
```

## Page Thresholds
- **Create a page** for any entity/concept appearing in 2+ articles OR central to one article
- **Add to existing page** when new articles mention something already covered
- **Split a page** when it exceeds ~200 lines
- **Author pages**: Create for every unique DHQ author (they wrote for the journal)
