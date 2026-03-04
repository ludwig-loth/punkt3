---
title: GetallMonitor
description: "Ein interaktives Gesundheitsdashboard, welches sich auf die Anzeige, Annotation und Bewertung von Temperaturdaten menschlicher Füße konzentriert. Es integriert Wärmebilder von sensorbasierten Fußsohlen sowie andere „übliche“ gesundheitsrelevante Informationen. "
post_image: /images/projects/getallmonitor/header.png
post_image_caption: Startseite (Übersicht) des GetAllMonitors
role: Frontend Lead
slug: getallmonitor
status: published
subtitle: interaktives Dashboard für Temperaturdaten von Fußsohlen
tags:
  - id: 32d80cb1-e91c-48f7-a781-b00e6001e426
    value: css
    icon: 8161fa59-07b8-414d-8669-2ec31d7dbd9d
    color: ""
    sort: 9
    name: CSS
    skill_level: ""
  - id: 76c9e769-bd2b-44ea-a19e-593c32931c81
    value: javascript
    icon: f4560c3f-dd57-4a52-907f-45aeaf59a64f
    color: ""
    sort: 10
    name: JavaScript
    skill_level: ""
  - id: d2074b67-d053-4615-ae94-b69ba63bf3dd
    value: vue
    icon: 84a6cf7f-0ce6-45e5-949d-0db01df7bfa1
    color: ""
    sort: 6
    name: Vue
    skill_level: ""
  - id: 11047c44-fc40-47e9-afff-7b2435d7ebbe
    value: vuetify
    icon: 50ea2c97-3c0a-4313-ab70-4650ce59dfa1
    color: ""
    sort: 0
    name: Vuetify
    skill_level: ""
  - id: 4cd09e2c-6eb4-4297-84bb-c4dc8f2c3033
    value: node
    icon: 413cdade-77f9-4fb6-a9a2-66e895239301
    color: ""
    sort: 7
    name: Node
    skill_level: ""
type: Full Stack
year: 2023
---

## Was ist GetAllMonitor?

![Übersicht der individuellen Anmerkungen](/images/projects/getallmonitor/block-undefined.png)

Der GetAllMonitor is ein interaktives Gesundheitsdashboard, welches sich auf die Anzeige, Annotation und Bewertung von Temperaturdaten menschlicher Füße konzentriert. Es integriert Wärmebilder von sensorbasierten Fußsohlen sowie andere „übliche“ gesundheitsrelevante Informationen.
Dieser entstand in dem RIGL-Projekt der Hochschule Fulda.

Die Hauptaufgabe dieser Anwendung ist es Temperaturdaten auf einer Wärmekarte anzuzeigen. Diese können auch als eine Art Video über einen bestimmten Zeitraum animiert dargestellt werden. Weiterhin können an jeder Position des dargestellten Fußes Anmerkungen gemacht werden, welche Metadaten speichern und mit einem Text versehen werden können.

---

## Entwicklung

![](/images/projects/getallmonitor/block-undefined.png)

Insgesamt wurde die komplette Anwendung samt Backend als Demonstrator und Machbarkeitsstudie umgesetzt.

Die Anwendung basiert komplett auf Webtechnologien und wurde mit Vue.js (Version 2) umgesetzt. Das Backend ist mit Node.js und einer MongoDB umgesetzt worden.

Der entscheidende und schwierigste Teil war die Implementierung der Wärmekarte bzw. Heatmap. Diese habe ich schlussendlich mit 3 verschiedenen übereinanderliegenden HTML Canvas umsetzen können.

### Heatmap

Dieser Visualisierungsansatz ist besonders effizient, weil er die Trennung von geometrischer Darstellung und Farblogik konsequent umsetzt. Statt direkt farbige Bereiche zu zeichnen, werden zunächst Grauwerte erzeugt, die die Intensität eines Temperaturwerts an einem Punkt repräsentieren. Diese Graustufen ermöglichen eine performante Verarbeitung und präzise Steuerung von Übergängen und Gewichtungen im Bild.

Die spätere Umwandlung der Grauwerte in Farben erfolgt über eine vordefinierte Farbpalette, die als vertikaler Gradient aufgebaut ist. Diese Trennung erlaubt nicht nur eine klare Systematik im Code, sondern sorgt auch dafür, dass die Farbskala jederzeit flexibel angepasst werden kann, ohne den Rendering-Prozess selbst zu verändern.

Ein weiterer Vorteil liegt im Einsatz von weichgezeichneten Pinselstrukturen (Brushes), mit denen die Grauwerte eingetragen werden. Dadurch entstehen stufenlose, natürliche Übergänge zwischen einzelnen Sensorwerten, die visuell einem echten Temperaturverlauf nahekommen. Gleichzeitig bleibt der Rechenaufwand gering, da nicht bei jedem Sensorpunkt eine individuelle Farbentscheidung getroffen werden muss.

Zusätzlich unterstützt die Methode zwei Darstellungsformen: eine sanfte Variante mit fließenden Farbverläufen und eine diskrete, zonenbasierte Variante zur klaren Abgrenzung einzelner Temperaturbereiche. Dadurch eignet sich der Ansatz sowohl für ästhetisch anspruchsvolle Visualisierungen als auch für analytisch präzise Anwendungen.

Die Kombination aus Performance, Flexibilität und optischer Qualität macht diesen Ansatz besonders effektiv für Echtzeitanwendungen mit hoher Sensordichte.
