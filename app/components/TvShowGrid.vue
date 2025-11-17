<script setup>

const props = defineProps(['searchQuery'])

</script>

<template>

  <div 
    class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-7xl">
    <TvShowCard
      v-for="s in searchQuery"
      :key="s.id"
      :show="s"
      >
    </TvShowCard>
  </div>


</template>

<style></style>

