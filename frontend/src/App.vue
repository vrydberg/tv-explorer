<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue';
// import SearchResults from './components/SearchResults.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  
  <div class="relative min-h-screen flex flex-col border border-white">

    <Navbar />
    
    <main class="flex flex-col flex-1">
      <Hero class="" />
      <RouterView class="mt-4 mb-10" />
    </main>

    <Footer />
  </div>

</template>

<style></style>


