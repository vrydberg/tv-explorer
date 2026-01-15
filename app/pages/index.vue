<script setup>

definePageMeta({
    layout: 'default',
})

const { data: trendingData, error } = await useFetch('/api/tmdb/trending');

if (error.value) {
  console.error('API ERROR:', error.value);
}

const trendingTvShows = ref(trendingData.value)
</script>

<template>
  <div class="flex flex-col">
    <Hero />

    <!-- Trending flows from hero gradient -->
    <TrendingResults
      class="py-2 sm:py-4"
      :trendingQuery="trendingTvShows"
    />
  </div>
</template>

<style></style>
