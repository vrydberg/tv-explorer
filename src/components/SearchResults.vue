<script setup>
import TvShowCard from './TvShowCard.vue';


const props = defineProps(['searchQuery'])



</script>

<template>
  <div class="flex justify-center px-20 py-6">

    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-7xl ">


        <TvShowCard v-for="c in searchQuery.length"></TvShowCard>        
        
    </div>

    

    
    
    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      
      <div 
        v-for="movie in searchQuery" 
        :key="movie.id" 
        class="bg-steel-200 p-4 rounded shadow hover:shadow-lg transition">
        <img :src="movie.poster" :alt="movie.title" class="w-full h-48 object-cover rounded mb-2"/>
        <h3 class="text-lg font-semibold text-steel-800">{{ movie.title }}</h3>
        <p class="text-steel-600 text-sm">{{ movie.year }}</p>
      </div>
    </div> -->

    
  </div>
</template>


<style></style>