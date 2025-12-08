<script setup>

const props = defineProps(['show', 'extraInfo', 'inCarousel'])

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
  <div class="w-full">
    <div class="relative aspect-2/3 flex justify-center items-center group">
      <div v-if="inCarousel">
        <img 
          class="w-full h-full object-cover rounded-md shadow-xl/30 cursor-pointer"
          :src="`https://image.tmdb.org/t/p/w500/${show.poster}`"
          draggable="false"    
        >
      </div>

      <NuxtLink v-else
        to="/"
      >
        <img 
          class="w-full h-full object-cover rounded-md shadow-xl/30 cursor-pointer hover:outline-3 hover:outline-indigo-600"
          :src="`https://image.tmdb.org/t/p/w500/${show.poster}`"
          draggable="false"    
      >
      </NuxtLink>
        
      <div class="absolute pointer-events-none group-hover:flex hidden items-center justify-center p-3 bg-transparent w-full h-full rounded-md z-10">
        <div class="bg-eigengrau-900/50 backdrop-blur-lg rounded-md  h-full w-full flex flex-col justify-center items-center gap-3 px-2">
          <h3 class="font-semibold truncate text-xs text-pretty max-h-1/4 text-center text-white">{{ show.title }}</h3>
          
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

    <div v-if="!extraInfo" 
      class="flex flex-col mt-2 gap-1 items-start">
      <h3 class="w-full truncate font-medium text-sm">{{ show.title }}</h3>
      
      <div class="w-full flex gap-2 items-center">
        <div class="flex gap-1">
          <RatingStar
              v-for="(star, index) in stars"
              :key=index
              :type=star
              class="h-3 w-3 text-indigo-600"
              >
          </RatingStar>
        </div>
        <p class="leading-none text-sm">{{ show.rating.toFixed(1) }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>