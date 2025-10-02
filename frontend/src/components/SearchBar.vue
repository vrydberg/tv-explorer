<script setup>
import { ref } from 'vue'

const value = ref('')

</script>

<template>

    <!-- <div class="border-2 border-blue-500 px-6 py-6 mb-4">
        <input type="search" class="block mx-auto w-full max-w-3xl px-6 py-6 rounded-full text-md font-medium bg-steel-100" placeholder="Find a movie"></input>
    </div> -->

    <div class="flex flex-col px-6 py-6 items-center">
        <!-- <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">Start Exploring</h1> -->
        <h1 class="mb-10 text-4xl font-bold leading-none text-steel-100">Start Exploring</h1>
        <input
            v-model="value" 
            type="search"
            class="w-full max-w-3xl px-6 py-6 rounded-full text-md font-medium bg-steel-100"
            placeholder="Find a movie"
            @input="$emit('search-changed', value)">
        </input>
    
    </div>
    
</template>

<style></style>