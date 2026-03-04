---
slug: vr-kugelauditorium
status: published
year: 2021
post_image: /images/projects/vr-kugelauditorium/header.jpg
project_url: https://www.youtube.com/watch?v=tY1yPSs6_r0
source_code_url: https://github.com/ludwig-loth/Kugelauditorium
title: VR Spherical Auditorium
subtitle: Virtual reconstruction of the Spherical Auditorium - My first Unity project
description: A virtual reconstruction of the spherical sound space of the world exhibition “Expo 1970”. Using Unity and SteamVR, an immersive environment is created in which users can experience sound spatially and control it using hand tracking via an interactive mixing console.
post_image_caption: Overview of the spherical auditorium with visible audio spheres
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

## Project idea and context

![Exterior and interior view of the original spherical auditorium](/images/projects/vr-kugelauditorium/block-undefined.jpg)

As part of my studies, I dealt with a special historical object: the spherical auditorium at Expo 1970 in Osaka. This spherical auditorium, designed according to the ideas of the composer Karlheinz Stockhausen, made it possible to create specific acoustic effects in individual areas of the room using a ring-shaped loudspeaker structure.

My aim was to transfer this special spatial-acoustic feature into a virtual reality environment in order to make it accessible and tangible for today's users.

---

## Technical implementation

![Overview of the project in Unity](/images/projects/vr-kugelauditorium/block-undefined.jpg)

I used the following technologies to create a virtual representation of the spherical auditorium:

### Unity

The development platform formed the backbone of the project. It enabled the creation of the 3D environment and the scripting of the audio distribution.

### SteamVR

The integration of this interface enabled the use of VR headsets and the use of index controllers for precise hand tracking.

### Unity's 3D Audio Engine

As a replacement for Max/MSP, it ensured that the spatial localization of sounds within the dome became possible.

### Index Controller

These allowed the targeted control of individual finger movements to operate the virtual control panel.

The virtual dome contained seven rows of loudspeakers, with the top and bottom rows each containing five audio sources and the middle three rows each containing ten. The challenge was to control the sounds so that they targeted specific areas within the virtual sphere, as was intended in the original.

---

![](/images/projects/vr-kugelauditorium/block-undefined.jpg)

### Special features of the project

What makes this project special is the combination of historical avant-garde architecture and modern immersive technologies. I deliberately chose an object that is not only technically challenging, but also culturally significant. The spherical auditorium stands for a visionary space-sound concept that was far ahead of its time.

Transferring this idea to the VR world required a deep understanding of acoustic room design, interaction design and the possibilities of modern engines. The development of a virtual mixing console with which the audio channels could be individually controlled was particularly exciting.

### Challenges and insights

At the beginning of the project, I had no experience with Unity. This meant that I had to acquire basic knowledge of the structure of GameObjects, components, shading techniques and script integration on my own. The familiarization took place alongside several other modules, which made scheduling considerably more difficult.

There were also technical challenges:

-   The originally planned connection between Max/MSP and Unity was prone to errors and was replaced by Unity's own audio solution.
-   The acoustic assignment of the sounds to the virtual loudspeakers was complex, but could be successfully realized with patience and precise work.
-   Addressing individual finger movements via the index controllers was technically challenging, but could be successfully implemented thanks to SteamVR.

### Final thoughts

The project showed me how powerful Unity can be as a platform for immersive experiences. I not only gained technical know-how, but also important insights into project planning, UX design and the limits of individual resilience.
