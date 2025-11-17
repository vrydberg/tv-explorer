<script setup>

import { onMounted, ref } from 'vue';

definePageMeta({
    layout: 'default',
})

const { data: trendingData, error } = await useFetch('/api/tmdb/trending');

if (error.value) {
  console.error('API ERROR:', error.value);
}

const trendingTvShows = ref(trendingData.value)

// const updateSearchResults = async (val) => {
//   if (val.length === 0) {
//     searchedTvShows.value = []
//     return
//   }

//   // Server uri api tmdb
//   const url = `http://localhost:3000/api/tmdb/search/${encodeURIComponent(val)}`
  
//   try {
//     const response = await fetch(url)
//     console.log(response)
//     if (!response.ok) {
//       throw new Error("Response status:" + response.status)      
//     }

//     const result = await response.json();  

//     console.log(result)
    
//     searchedTvShows.value = result || []
//   } catch (error) {
//     console.error(error.message);

//   }
// }

</script>



<template>

  <div class="flex flex-col">
    <Hero />
    <TrendingResults
      class="mt-6 mb-6"
      :trendingQuery="trendingTvShows"
    </TrendingResults>

    <>
  </div>
  
</template>

<style></style>
