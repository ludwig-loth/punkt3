<script setup lang="ts">
const { tStatic } = await useTranslation()
</script>
<template>
  <div class="relative flex items-end justify-start h-10 p-1 mx-auto max-w-7xl">
    <div class="flex items-center justify-center gap-2 p-1 rounded-sm bg-base-100">
      <div class="text-sm text-base-content">&#169 Ludwig Loth</div>
      <NuxtLink to="/legal-notice" class="text-sm font-medium text-primary-content">{{
        tStatic('legal_notice') }}
      </NuxtLink>
    </div>
  </div>
</template>
<style></style>