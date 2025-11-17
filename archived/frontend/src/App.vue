<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import Navbar from '../../nuxt-temp/app/components/Navbar.vue'
import Hero from '../../nuxt-temp/app/components/Hero.vue';
import Footer from '../../nuxt-temp/app/components/Footer.vue';
import SearchResults from '../../nuxt-temp/app/components/TrendingResults.vue';

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


