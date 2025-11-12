<script setup>
import { ref } from 'vue'
import { debounce } from '@/util/debounce'

const emit = defineEmits(['search-changed'])
const searchValue = ref('')

const emitSearch = (searchValue) => {
    console.log("emittin")
    emit('search-changed', searchValue)
}

// Wait 400ms after user types to emit the function and fetch results
const debouncedSearch = debounce(emitSearch, 400) 

const handleInput = (searchValue) => {
    debouncedSearch(searchValue)
}

// 1. User emits event based on keystroke change
// 2. This triggers the handleInput event handler function
// 3. In this handleInput, we initialize the first debounce

</script>

<template>

    <div class="flex flex-col px-16 py-4 items-center">
        <h1 class="mb-8 text-3xl font-bold leading-none text-steel-100">Start Exploring</h1>
        <input
            v-model="searchValue"
            name="searchInput"
            type="search"
            class="w-full max-w-2xl px-4 py-4 rounded-full text-md font-medium bg-steel-100"
            placeholder="Find a movie"
            @input="handleInput(searchValue)">
            <!-- @input="$emit('search-changed', value)"> -->
        </input>
    </div>
    
</template>

<style></style>