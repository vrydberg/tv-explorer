<script setup>

const props = defineProps(['searchQuery'])

</script>

<template>
  <div class="flex justify-center px-20 py-6">

    <!-- <div class="grid lg:grid-cols-5 md:grid-cols-3 gap-4 border border-red-600 w-full max-w-7xl"> -->
    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-7xl ">

        <div class="w-full">
            <div class="aspect-[2/3]">
                <img class="w-full h-full object-cover rounded-lg hover:scale-105 transform transition duration-300" src="@/assets/posters/kitty.jpg" alt="">
            </div>

            <div class="mt-2">
                <h3 class="font-semibold text-steel-100">Breaking Bad</h3>
                <p class="text-sm text-steel-100">Rating: 4</p>
            </div>
        </div>

        <div class="w-full">
            <div class="aspect-[2/3]">
                <img class="w-full h-full object-cover rounded-lg hover:scale-105 transform transition duration-300" src="@/assets/posters/kitty.jpg" alt="">
            </div>

            <div class="mt-2">
                <h3 class="font-semibold text-steel-100">Breaking Bad</h3>
                <p class="text-sm text-steel-100">Rating: 4</p>
            </div>
        </div>

        <div class="w-full">
            <div class="aspect-[2/3]">
                <img class="w-full h-full object-cover rounded-lg hover:scale-105 transform transition duration-300" src="@/assets/posters/kitty.jpg" alt="">
            </div>

            <div class="mt-2">
                <h3 class="font-semibold text-steel-100">Breaking Bad</h3>
                <p class="text-sm text-steel-100">Rating: 4</p>
            </div>
        </div>

        <div class="w-full">
            <div class="aspect-[2/3]">
                <img class="w-full h-full object-cover rounded-lg hover:scale-105 transform transition duration-300" src="@/assets/posters/kitty.jpg" alt="">
            </div>

            <div class="mt-2">
                <h3 class="font-semibold text-steel-100">Breaking Bad</h3>
                <p class="text-sm text-steel-100">Rating: 4</p>
            </div>
        </div>

        <div class="w-full">
            <div class="aspect-[2/3]">
                <img class="w-full h-full object-cover rounded-lg hover:scale-105 transform transition duration-300" src="@/assets/posters/kitty.jpg" alt="">
            </div>

            <div class="mt-2">
                <h3 class="font-semibold text-steel-100">Breaking Bad</h3>
                <p class="text-sm text-steel-100">Rating: 4</p>
            </div>
        </div>
        
        
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