<script setup>

  const props = defineProps(['title'])
</script>

<template>
  <div class="rounded-lg border max-h-[160px] border-eigengrau-700 p-4 shadow-sm flex flex-col min-w-0 overflow-hidden h-full">

    <h3 class="font-semibold text-sm mb-4 text-white truncate">{{ title }}</h3>

    <div class="flex flex-col overflow-y-auto flex-1 min-h-0">
      <slot />
    </div>
  </div>
</template>

<style></style>