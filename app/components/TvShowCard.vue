<script setup>

import { NuxtLink } from '#components'

const props = defineProps(['show', 'useNuxtLink', 'hoverable'])

const rating = ref(props.show.rating)

const stars = computed(() => {
    const displayedRating = rating.value
    const relativeRating = displayedRating / 2;
    const mappedStars = Math.round(relativeRating * 2) / 2;

    const fullStars = Math.floor(mappedStars);
    const halfStars = mappedStars % 1 ? 1 : 0;

    const stars = []    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push('full')
        } else if (i <fullStars + halfStars) {
            stars.push('half')
        } else {
            stars.push('empty')
        }
    }

    return stars
})

</script>



<template>
  <div>
    <div 
      class="relative aspect-2/3 w-full flex items-center"
      :class="{'group': hoverable}">

      <component
        :is="useNuxtLink ? NuxtLink : 'div'"
        v-bind="useNuxtLink && show.id ? { to: `/shows/${show.id}` } : {}"
        class="block w-full h-full"
      >

        <img 
          class="w-full h-full object-cover rounded-md shadow-xl/30"
          :class="{
              'cursor-pointer hover:outline-3 hover:outline-indigo-600': hoverable
          }"
          :src="`https://image.tmdb.org/t/p/w500/${show.poster}`"
          :alt="show.title"
          draggable="false"    
        >
      </component>

      <div v-if="hoverable && show.rating"
        class="absolute pointer-events-none group-hover:flex hidden items-center justify-center p-3 bg-transparent w-full h-full rounded-md z-10">
        <div class="bg-eigengrau-900/50 backdrop-blur-lg rounded-md h-full w-full flex flex-col justify-center items-center gap-3 px-2">
          <h3 class="font-semibold truncate text-xs text-pretty max-h-1/4 text-center text-white">{{ show.title || 'Title Unavailable'}}</h3>
          
          <div class="flex gap-1">
            <RatingStar
              v-for="(star, index) in stars"
              :key=index
              :type=star
              class="h-3 w-3 text-indigo-600"
            >
            </RatingStar>
          </div>
          <p class="leading-none text-xs font-semibold text-white">{{ show.rating.toFixed(1) }}</p>
        </div>
      </div>
    </div>
  </div>
  

</template>

<style></style>