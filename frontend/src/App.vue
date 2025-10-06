<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
import Navbar from './components/Navbar.vue'
import SearchBar from './components/SearchBar.vue';
import SearchResults from './components/SearchResults.vue';
import TvShowCard from './components/TvShowCard.vue';

const searchValue = ref('')
const fetchedTvShows = ref([])

const updateSearchValue = async (val) => {
  searchValue.value = val

  // Check if search value empty
  if (val.length === 0 || val.length < 3) {
    return
  }

  // Server uri api tmdb
  const url = `http://localhost:3000/api/tmdb/search/${searchValue.value}`


  console.log("inside here")
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
  <div class="flex flex-col min-h-screen">

    <Navbar></Navbar>
  
  

    <main class="flex flex-1 flex-col">
    <!-- <main class="flex flex-1 flex-col border-4 border-sky-300"> -->
      <SearchBar
        class="mt-12"
        @search-changed="updateSearchValue($event)">
      </SearchBar>
      <SearchResults
        :searchQuery="fetchedTvShows">
      </SearchResults>

    <!-- <TvShowCard></TvShowCard> -->
    </main>

  </div>
  
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
</template>

<style></style>


