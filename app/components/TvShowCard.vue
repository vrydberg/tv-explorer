<script setup>
    const props = defineProps(['show'])

</script>

<template>
    <div class="w-full">
        <div class="aspect-2/3">
            <img 
                    class="w-full h-full object-cover rounded-md cursor-pointer hover:border-3 hover:border-indigo-600"
                    :src="`https://image.tmdb.org/t/p/w500/${show.poster}`"
                    draggable="false"
                >
            
        </div>

        <!-- <div class="flex flex-col justify-between mt-2 items-center"> -->
            <!-- <h3 class="truncate font-medium text-sm text-steel-100">{{ show.title }}</h3> -->
            <!-- <h3 class="mb-4 text-base font-bold leading-none text-steel-100">Trending</h3> -->
            <!-- <p class="text-sm italic text-steel-100">Rating: {{ show.rating }}</p> -->
        <!-- </div> -->
    </div>
</template>

<style></style>