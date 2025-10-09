<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import Navbar from './components/Navbar.vue'

</script>

<template>
  
  <div class="flex flex-col min-h-screen">
    <!-- <Navbar></Navbar> -->
    <Navbar />

    <main>
      <RouterView />
    </main>

    <!-- <Footer> -->
  </div>
  
  
</template>

<style></style>


