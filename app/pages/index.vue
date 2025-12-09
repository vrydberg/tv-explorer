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
    <TrendingResults
      class="mt-6 mb-6"
      :trendingQuery="trendingTvShows"
    </TrendingResults>
  </div>
</template>

<style></style>
