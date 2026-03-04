---
slug: kompetenzeditor
status: published
year: 2022
post_image: /images/projects/kompetenzeditor/header.png
project_url: https://doi.org/10.18420/delfi2022-ws-32
source_code_url: https://github.com/ludwig-loth/kompetenzeditor
title: Kompetenzeditor
subtitle: Ein NLP-basierter Editor zur Optimierung von Kompetenzbeschreibungen
description: Ein webbasiertes Werkzeug, das mittels NLP die Qualität deutschsprachiger Kompetenzformulierungen analysiert und Nutzenden in Echtzeit gezielte Feedbacks und konkrete Änderungsvorschläge gibt, um die Verständlichkeit und Präzision ihrer Texte zu verbessern.
post_image_caption: null
role: Solo Developer & Product Owner
type: Full Stack
tags:
  - id: accd0b08-b496-486c-b7fd-3146c9b57fa7
    value: docker
    icon: 48cee8e5-7738-48b1-a60f-6fe8ef9cca17
    color: null
    sort: 4
    name: Docker
    skill_level: null
  - id: 76c9e769-bd2b-44ea-a19e-593c32931c81
    value: javascript
    icon: f4560c3f-dd57-4a52-907f-45aeaf59a64f
    color: null
    sort: 10
    name: JavaScript
    skill_level: null
  - id: d472b5b6-c7d8-4bf3-a800-20d5ea58ce4d
    value: mogodb
    icon: 7fb31c4d-7991-4812-9c13-e437385e767e
    color: null
    sort: 13
    name: MongoDB
    skill_level: null
  - id: 9011704a-66e0-4a08-a14b-46625fe57e71
    value: mongoose
    icon: 655ba355-ed51-4516-a352-3bc18b374f2f
    color: null
    sort: 14
    name: Mongoose
    skill_level: null
  - id: 79e77694-1991-44a5-a406-576f1d7d85e8
    value: spacy
    icon: a837af4b-6cf0-4bc9-900b-936386099433
    color: null
    sort: 0
    name: spaCy
    skill_level: null
  - id: d2074b67-d053-4615-ae94-b69ba63bf3dd
    value: vue
    icon: 84a6cf7f-0ce6-45e5-949d-0db01df7bfa1
    color: null
    sort: 6
    name: Vue
    skill_level: null
  - id: 11047c44-fc40-47e9-afff-7b2435d7ebbe
    value: vuetify
    icon: 50ea2c97-3c0a-4313-ab70-4650ce59dfa1
    color: null
    sort: 0
    name: Vuetify
    skill_level: null
  - id: b0f3feae-7783-4fae-8286-2da9b61976d9
    value: nuxt
    icon: 9bd6ae34-304a-4754-b7f8-d3577e952761
    color: null
    sort: 0
    name: Nuxt
    skill_level: null
  - id: 4cd09e2c-6eb4-4297-84bb-c4dc8f2c3033
    value: node
    icon: 413cdade-77f9-4fb6-a9a2-66e895239301
    color: null
    sort: 7
    name: Node
    skill_level: null
---

## Warum Kompetenzbeschreibungen oft scheitern - Ausgangspunkt und Motivation des Projekts

![](/images/projects/kompetenzeditor/block-undefined.png)

Kompetenzbeschreibungen spielen eine zentrale Rolle bei der Vermittlung von Lernzielen an Hochschulen und Bildungseinrichtungen. Sie dienen nicht nur der Orientierung für Studierende, sondern geben auch Lehrenden wichtige Hinweise, welche Fertigkeiten und Kenntnisse vermittelt und geprüft werden sollen. In der Praxis entstehen Kompetenzbeschreibungen jedoch oft unter suboptimalen Bedingungen: Die Verfassenden, meist Lehrpersonen ohne spezialisierte Ausbildung im Verfassen solcher Texte, haben häufig Schwierigkeiten, präzise und verständliche Formulierungen zu finden. Dadurch entstehen Formulierungen, die zu allgemein, mehrdeutig oder gar missverständlich sind. Dies hat zur Folge, dass die Studierenden nicht klar erkennen können, was genau von ihnen erwartet wird, und Lehrende die Lernziele nur schwer überprüfen können.

Die Idee, einen unterstützenden Editor zu entwickeln, entstand aus genau dieser Problematik heraus. Ziel war es, ein Instrument zu schaffen, das Lehrenden unmittelbar hilft, qualitativ hochwertige Kompetenzbeschreibungen zu formulieren – präzise, verständlich und eindeutig.

---

## Innovation und Besonderheiten

![](/images/projects/kompetenzeditor/block-undefined.png)

### Innovativer Ansatz: Ein NLP-gestützter Editor speziell für deutsche Texte

Die wesentliche Innovation des Kompetenzeditors, welche die Anwendung von anderen abhebt, liegt in seiner Nutzung von Natural Language Processing (NLP) zur Echtzeitanalyse deutschsprachiger Kompetenzformulierungen. NLP ist ein Bereich der künstlichen Intelligenz, der sich mit der maschinellen Verarbeitung natürlicher Sprache beschäftigt. Bisher konzentrieren sich die meisten NLP-Werkzeuge auf die englische Sprache, sodass für den deutschsprachigen Raum kaum vergleichbare Lösungen existieren.

Dieser Editor schließt diese Lücke, indem er deutsche Texte unmittelbar auf ihre Qualität hin untersucht. Er erkennt Schlüsselwörter und problematische Formulierungen automatisch und bietet den Nutzenden sofortige, kontextsensitive Verbesserungsvorschläge. Die Analyse basiert auf wissenschaftlich fundierten Taxonomien und Bewertungskriterien, wodurch die Nutzerinnen und Nutzer genaue Hinweise darauf erhalten, wie sie ihre Texte optimieren können. Dadurch steigt nicht nur die sprachliche Qualität, sondern es wird auch sichergestellt, dass die beschriebenen Kompetenzen klar messbar und überprüfbar sind. Was ein zentraler Anspruch in der akademischen Lehre ist.

![Beispielausschnitt der Hilfestellungen](/images/projects/kompetenzeditor/block-undefined.png)

### Dynamische Hilfestellungen und intuitive Benutzerführung

Der Kompetenzeditor bietet eine umfassende Nutzererfahrung, die es ermöglicht, Kompetenzbeschreibungen intuitiv und einfach zu erstellen oder zu verbessern. Durch die dynamische Echtzeitanalyse werden problematische Begriffe und Formulierungen direkt im Text markiert. Anwendende erhalten übersichtliche Hinweise zur Optimierung, wobei jedes erkannte Problem mit konkreten Alternativen versehen wird. Zusätzlich bietet der Editor eine prozentuale Qualitätsbewertung, die den Gesamtzustand des Textes auf einen Blick sichtbar macht.

Das übersichtliche, benutzerfreundliche Interface wurde speziell entwickelt, um Anwenderinnen und Anwendern unabhängig von ihrem technischen Hintergrund einen leichten Einstieg zu ermöglichen. Ergänzt durch ausführliche Erklärungen und Hilfetexte wird eine einfache Nutzung und hohe Akzeptanz gewährleistet.

---

## Meine Rolle - zwischen Forschung und praktischer Anwendung

![](/images/projects/kompetenzeditor/block-undefined.png)

Als alleiniger Entwickler war meine Rolle in diesem Projekt umfangreich und anspruchsvoll zugleich: Von der eigenständigen Konzeptentwicklung über die vollständige technische Umsetzung mit modernen Webtechnologien bis hin zur Integration komplexer NLP-Methoden habe ich alle Arbeitsschritte eigenverantwortlich geplant und umgesetzt. Die ursprüngliche Projektidee entstand zwar im Rahmen eines fachlichen Austauschs, doch die gesamte Konzeption, methodische Ausgestaltung und praktische Realisierung stammen vollständig von mir. Meine persönliche Motivation war es, eine praxisorientierte und wissenschaftlich fundierte Lösung für ein häufig auftretendes, aber bisher wenig adressiertes Problem im Hochschulalltag zu schaffen. Besonders fasziniert hat mich dabei die Chance, theoretisches Wissen unmittelbar in ein nützliches Werkzeug für Lehrende und Studierende zu verwandeln.
