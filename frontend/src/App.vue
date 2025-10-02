<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
import Navbar from './components/Navbar.vue'
import SearchBar from './components/SearchBar.vue';
import SearchResults from './components/SearchResults.vue';
import TvShowCard from './components/TvShowCard.vue';

const searchValue = ref('')

const updateSearchValue = (val) => {
  searchValue.value = val
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
        :searchQuery="searchValue">
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


