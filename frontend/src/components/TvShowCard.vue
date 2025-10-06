<script setup>
    const props = defineProps(['show'])

</script>

<template>
    <div class="w-full">
        <div class="aspect-[2/3]">
            <img 
                class="w-full h-full object-cover rounded-lg hover:scale-105 transform transition duration-300"
                :src="`https://image.tmdb.org/t/p/w500/${show.poster}`"
            >
        </div>

        <div class="mt-2">
            <h3 class="font-semibold text-steel-100">{{ show.title }}</h3>
            <p class="text-sm text-steel-100">Rating: {{ show.rating }}</p>
        </div>
    </div>
</template>

<style></style>