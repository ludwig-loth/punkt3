---
slug: vr-kugelauditorium
status: published
year: 2021
post_image: /images/projects/vr-kugelauditorium/header.jpg
project_url: https://www.youtube.com/watch?v=tY1yPSs6_r0
source_code_url: https://github.com/ludwig-loth/Kugelauditorium
title: VR Kugelauditorium
subtitle: Virtuelle Rekonstruktion des Kugelauditoriums – Mein erstes Unity-Projekt
description: Eine virtuelle Rekonstruktion des sphärischen Klangraums der Weltausstellung "Expo 1970". Mittels Unity und SteamVR entsteht eine immersive Umgebung, in der Nutzer Klang räumlich erleben und per Handtracking über ein interaktives Mischpult steuern können.
post_image_caption: Übersicht des Kugelauditoriums mit sichtbaren Audiosphären
role: Solo Developer & Product Owner
type: Game Dev
tags:
  - id: f03820cb-97e5-4fad-831d-6831b1f1ca92
    value: c#
    icon: af8d1e7b-05f1-4262-a34b-1e6c7f6f352e
    color: null
    sort: 0
    name: C#
    skill_level: null
  - id: d95f611d-c968-47f2-9573-24ace24c6ba7
    value: unity
    icon: 2407d21b-77f5-46e7-be39-759cd05a439f
    color: null
    sort: 0
    name: Unity
    skill_level: null
---

## Projektidee und Kontext

![Außen- und Innenansicht des original Kugelauditoriums](/images/projects/vr-kugelauditorium/block-undefined.jpg)

Im Rahmen meines Studiums habe ich mich mit einem besonderen historischen Objekt auseinandergesetzt: dem Kugelauditorium der Expo 1970 in Osaka. Dieses sphärisch angelegte Auditorium, entworfen nach den Vorstellungen des Komponisten Karlheinz Stockhausen, ermöglichte durch eine ringförmig angeordnete Lautsprecherstruktur eine gezielte akustische Bespielung einzelner Bereiche im Raum.

Mein Ziel war es, diese räumlich-akustische Besonderheit in eine Virtual-Reality-Umgebung zu übertragen, um sie heutigen Nutzerinnen und Nutzern zugänglich und erlebbar zu machen.

---

## Technische Umsetzung

![Übersicht des Projektes in Unity](/images/projects/vr-kugelauditorium/block-undefined.jpg)

Um das Kugelauditorium virtuell darzustellen, habe ich folgende Technologien eingesetzt:

### Unity

Die Entwicklungsplattform bildete das Rückgrat des Projekts. Sie ermöglichte die Erstellung der 3D-Umgebung und das Scripting der Audioverteilung.

### SteamVR

Die Integration dieser Schnittstelle ermöglichte die Nutzung von VR-Headsets und den Einsatz der Index Controller für präzises Handtracking.

### Unitys 3D Audio Engine

Als Ersatz für Max/MSP stellte sie sicher, dass die räumliche Verortung von Klängen innerhalb der Kuppel möglich wurde.

### Index Controller

Sie erlaubten die gezielte Ansteuerung einzelner Fingerbewegungen für die Bedienung des virtuellen Steuerpults.

Die virtuelle Kuppel beinhaltete sieben Lautsprecherreihen, wobei die obere und untere je fünf, und die mittleren drei Reihen je zehn Audioquellen umfassten. Die Herausforderung bestand darin, die Klänge so zu steuern, dass sie gezielt bestimmte Bereiche innerhalb der virtuellen Kugel ansprechen, so wie es im Original vorgesehen war.

---

![](/images/projects/vr-kugelauditorium/block-undefined.jpg)

### Besonderheiten des Projekts

Was dieses Projekt besonders macht, ist die Kombination aus historisch-avantgardistischer Architektur und modernen immersiven Technologien. Ich habe bewusst ein Objekt gewählt, das nicht nur technisch herausfordernd, sondern auch kulturell bedeutungsvoll ist. Das Kugelauditorium steht für ein visionäres Raum-Klang-Konzept, das seiner Zeit weit voraus war.

Die Übertragung dieser Idee in die VR-Welt erforderte ein tiefes Verständnis von akustischer Raumgestaltung, Interaktionsdesign und den Möglichkeiten moderner Engines. Besonders spannend war die Entwicklung eines virtuellen Mischpults, mit dem die Audiokanäle individuell angesteuert werden konnten.

### Herausforderungen und Erkenntnisse

Zu Beginn des Projekts hatte ich keinerlei Erfahrung mit Unity. Dadurch musste ich mir grundlegende Kenntnisse zur Struktur von GameObjects, Komponenten, Shading-Techniken und Skriptintegration selbstständig aneignen. Die Einarbeitung erfolgte neben mehreren anderen Modulen, was die Zeitplanung erheblich erschwerte.

Hinzu kamen technische Herausforderungen:

-   Die ursprünglich geplante Verbindung von Max/MSP und Unity war fehleranfällig und wurde durch Unitys eigene Audiolösung ersetzt.
    
-   Die akustische Zuordnung der Klänge zu den virtuellen Lautsprechern war komplex, konnte aber mit Geduld und präziser Arbeit erfolgreich realisiert werden.
    
-   Das Ansprechen einzelner Fingerbewegungen über die Index Controller war technisch anspruchsvoll, konnte jedoch dank SteamVR erfolgreich implementiert werden.
    

### Fazit

Das Projekt hat mir gezeigt, wie leistungsfähig Unity als Plattform für immersive Erlebnisse sein kann. Ich habe nicht nur technisches Know-how gewonnen, sondern auch wichtige Erkenntnisse über Projektplanung, UX-Design und die Grenzen individueller Belastbarkeit.
