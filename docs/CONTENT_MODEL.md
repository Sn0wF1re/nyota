# NYOTA — CONTENT MODEL

## Stories (JSON)

Each story contains:

* slug
* collection
* isHorizon
* mapCoords

### Hero

* headline
* subHeadline
* videoSrc

### Nyota Lens

* architectNote
* uspIcons[]

### Sensory Chapters

Array of:

* chapterTitle
* narrativeBody
* mediaUrl
* type (image | video)

### Pairing

* targetSlug
* reasoning

---

## Journals (Markdown)

Frontmatter:

* slug
* title
* category
* readingTime
* geographicFocus
* relatedStory

Body:

* Long-form editorial content

---

## Relationship Model

Stories ↔ Journals:

* Journals reference stories
* Stories can suggest journals (future improvement)

---

## Content Philosophy

Stories = Emotion
Journals = Intelligence
Universe = Exploration
Discovery = Action
