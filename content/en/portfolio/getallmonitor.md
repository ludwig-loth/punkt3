---
title: GetallMonitor
description: An interactive health dashboard that focuses on displaying, annotating, and evaluating temperature data from human feet. It integrates thermal images from sensor-based soles of feet as well as other “standard” health-related information.
post_image: /images/projects/getallmonitor/header.png
post_image_caption: Home page (overview) of GetAllMonitor
role: Frontend Lead
slug: getallmonitor
status: published
subtitle: Interactive dashboard for temperature data from the soles of the feet
tags:
  - id: 32d80cb1-e91c-48f7-a781-b00e6001e426
    value: css
    icon: 8161fa59-07b8-414d-8669-2ec31d7dbd9d
    color: null
    sort: 9
    name: CSS
    skill_level: null
  - id: 76c9e769-bd2b-44ea-a19e-593c32931c81
    value: javascript
    icon: f4560c3f-dd57-4a52-907f-45aeaf59a64f
    color: null
    sort: 10
    name: JavaScript
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
  - id: 4cd09e2c-6eb4-4297-84bb-c4dc8f2c3033
    value: node
    icon: 413cdade-77f9-4fb6-a9a2-66e895239301
    color: null
    sort: 7
    name: Node
    skill_level: null
type: Full Stack
year: 2023
---

## What is GetAllMonitor?

![Overview of individual notes](/images/projects/getallmonitor/block-undefined.png)

GetAllMonitor is an interactive health dashboard that focuses on displaying, annotating, and evaluating temperature data from human feet. It integrates thermal images from sensor-based soles of feet as well as other “standard” health-related information.

It was developed as part of the RIGL project at Fulda University of Applied Sciences.

The main task of this application is to display temperature data on a heat map. This data can also be animated as a kind of video over a specific period of time. Furthermore, annotations can be made at any position on the displayed foot, which can store metadata and be accompanied by text.

---

## Development

![](/images/projects/getallmonitor/block-undefined.png)

The entire application, including the backend, was implemented as a demonstrator and feasibility study.

The application is based entirely on web technologies and was implemented with Vue.js (version 2). The backend was implemented with Node.js and a MongoDB.

The most crucial and difficult part was the implementation of the heat map. I was finally able to implement this with three different overlapping HTML canvases.

## Heat map

This visualization approach is particularly efficient because it consistently separates geometric representation and color logic. Instead of drawing colored areas directly, gray values are first generated to represent the intensity of a temperature value at a point. These gray scales enable high-performance processing and precise control of transitions and weightings in the image.

The gray values are subsequently converted into colors using a predefined color palette that is structured as a vertical gradient. This separation not only allows for a clear system in the code, but also ensures that the color scale can be flexibly adjusted at any time without changing the rendering process itself.

Another advantage lies in the use of soft-focus brush structures (brushes) with which the gray values are entered. This creates smooth, natural transitions between individual sensor values that visually resemble a real temperature curve. At the same time, the computing effort remains low, as an individual color decision does not have to be made for each sensor point.

In addition, the method supports two display modes: a smooth variant with flowing color gradients and a discrete, zone-based variant for clearly delineating individual temperature ranges. This makes the approach suitable for both aesthetically demanding visualizations and analytically precise applications.

The combination of performance, flexibility, and visual quality makes this approach particularly effective for real-time applications with high sensor density.
