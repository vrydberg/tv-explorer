<script setup>
// import { RouterLink, RouterView } from 'vue-router'

import { ref } from 'vue';
import SearchBar from '../components/SearchBar.vue'
import SearchResults from '../components/SearchResults.vue';


// THIS IS GOING TO BE EXPLORER.VUE NOT APP.VUE
// const searchValue = ref('')
const fetchedTvShows = ref([])

const updateSearchResults = async (val) => {
  
  // Validate search value before submitting request
  // if (val.length === 0 || val.length < 3) {
  if (val.length === 0) {
    fetchedTvShows.value = []
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
    
    fetchedTvShows.value = result || []
  } catch (error) {
    console.error(error.message);

  }


}


</script>

<template>
  <!-- <div class="flex flex-col border-4 min-h-screen border-red-400"> -->

  <div class="flex flex-1 flex-col">
    <!-- <main class="flex flex-1 flex-col border-4 border-sky-300"> -->
      <SearchBar
        class="mt-20"
        @search-changed="updateSearchResults($event)">
      </SearchBar>
      <SearchResults
        :searchQuery="fetchedTvShows">
      </SearchResults>
  </div>
  
</template>

<style></style>


