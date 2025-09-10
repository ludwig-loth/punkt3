<script setup lang="ts">
definePageMeta({
  layout: 'sidebars',
  hasHeader: true,
  hasSubMenu: true,
  underConstruction: true,
  subMenu: {
    type: 'custom',
    headingSlug: 'blog',
    items: [
      { slug: 'foo', title: 'Foo', icon: null },
      { slug: 'bar', title: 'Bar', icon: null }
    ]
  }
})
const isDev = import.meta.dev
</script>

<template>
  <div v-if="isDev" class="w-full">
    <div class="max-w-max">
      Diese Seite ist momentan im Aufbau und wird bald mit weiteren Projekten gefüllt.
      <br />
      Momentan sind hier keine weiteren Projekte aufgelistet. Schau doch mal in meinem
      <NuxtLink to="/portfolio" class="text-primary">Portfolio</NuxtLink> vorbei, dort findest du
      eine Übersicht meiner Arbeiten.
    </div>
    <div class="max-w-max">
      This page is currently under construction and will soon be filled with more projects.
      <br />
      Currently, there are no other projects listed here. Why not check out my
      <NuxtLink to="/portfolio" class="text-primary">Portfolio</NuxtLink>, where you can find an
      overview of my work.
    </div>
  </div>
</template>
<style></style>