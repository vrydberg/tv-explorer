<script setup>
import { onMounted, ref } from 'vue';
// import SearchBar from '../components/SearchBar.vue'
import SearchResults from '../../../nuxt-temp/app/components/TrendingResults.vue';
// import Hero from '@/components/Hero.vue';

const searchedTvShows = ref([])
const trendingTvShows = ref([])

onMounted( async () => {
  try {

    const url = `http://localhost:3000/api/tmdb/trending`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Response status:" + response.status)      
    }

    
    const result = await response.json();
    console.log(result)

    trendingTvShows.value = result || []
  } catch (error) {
    console.log(error.message)
  }
})

const updateSearchResults = async (val) => {
  
  // Validate search value before submitting request
  // if (val.length === 0 || val.length < 3) {
  if (val.length === 0) {
    searchedTvShows.value = []
    return
  }

  // Server uri api tmdb
  const url = `http://localhost:3000/api/tmdb/search/${encodeURIComponent(val)}`
  
  try {
    const response = await fetch(url)
    console.log(response)
    if (!response.ok) {
      throw new Error("Response status:" + response.status)      
    }

    const result = await response.json();  

    console.log(result)
    
    searchedTvShows.value = result || []
  } catch (error) {
    console.error(error.message);

  }
}


</script>

<template>
  <SearchResults
        :trendingQuery="trendingTvShows"
        :searchQuery="searchedTvShows">
  </SearchResults>

  <!-- // Below is original explorer view -->
  <!-- <div class="flex flex-1 flex-col">
      <SearchBar
        class="mt-6"
        @search-changed="updateSearchResults($event)">
      </SearchBar>
      <SearchResults
        class="mt-6"
        :trendingQuery="trendingTvShows"
        :searchQuery="searchedTvShows">
      </SearchResults>
  </div> -->

</template>

<style></style>


