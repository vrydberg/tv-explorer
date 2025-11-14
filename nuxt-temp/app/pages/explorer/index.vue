<script setup>
import { ref } from 'vue'

definePageMeta({
    layout: 'default',
})

const searchedTvShows = ref([])

const updateSearchResults = async (val) => {
  try {
    if (val.length === 0) {
      searchedTvShows.value = []
      return
    }

    const url = `api/tmdb/search`
    
    const searchData = await $fetch(url, {
      params: { query: val }
    });

    searchedTvShows.value = searchData || []

  } catch (error) {
    console.error("ERROR:", error.message);
  }  
}


</script>

<template>
  Hello!
  <SearchBar
    @search-changed="updateSearchResults($event)">
  </SearchBar>  
  <TvShowGrid
    :searchQuery="searchedTvShows">
  </TvShowGrid>
</template>

<style></style>