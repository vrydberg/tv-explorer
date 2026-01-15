<script setup>
import TvShowCard from './TvShowCard.vue';
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps(['trendingQuery'])

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})

const windowSize = ref({
  height: 0,
  width: 0
})

const carouselRef = ref()
const carouselConfig = {
  height: 'auto',
  gap: 16,
  transition: 200,
  transitionEasing: 'linear',
  itemsToShow: 3,
  snapAlign: 'start',
  wrapAround: true,
  mouseDrag: true, 
  touchDrag: true,
  breakpoints: {
    640: {
      itemsToShow: 4,
      gap: 20,
      snapAlign: 'start'
    },
    768: {
      itemsToShow: 5,
      gap: 24,
      snapAlign: 'start'
    },
    1024: {
      itemsToShow: 6,
      gap: 28,
      wrapAround: false,
      snapAlign: 'start',
      mouseDrag: false,
      touchDrag: false,
    },
    1536: {
      itemsToShow: 6,
      gap: 32,
      wrapAround: false,
      snapAlign: 'start',
      mouseDrag: false,
      touchDrag: false,
    }
  },
  
}

const currentSlide = ref(0)
const currentPageIndex = ref(0)
const slidesPerPage = ref(1) 

const updateWindowSize = () => {
  windowSize.value.height = window.innerHeight
  windowSize.value.width = window.innerWidth
}

// Need to go over this again to see what is necessary
const trendingPages = computed(() => {
  const width = windowSize.value.width

  if (width >= 1536) {
    slidesPerPage.value = 8
  } else if (width >= 1024) {
    slidesPerPage.value = 6
  } else if (width >= 768) {
    slidesPerPage.value = 5
  } else if (width >= 640) {
    slidesPerPage.value = 4
  } else {
    slidesPerPage.value = 3
  }
  return Math.ceil(props.trendingQuery.length / slidesPerPage.value)
})

const next = () => {
  currentPageIndex.value += 1
  
  if (currentPageIndex.value >= trendingPages.value) {
    currentPageIndex.value = 0
  }

  carouselRef.value.slideTo(currentPageIndex.value * slidesPerPage.value) 
}

const prev = () => {
  currentPageIndex.value -= 1

  if (currentPageIndex.value < 0) {
    currentPageIndex.value = trendingPages.value - 1
  }

  carouselRef.value.slideTo(currentPageIndex.value * slidesPerPage.value) 
}

const setActivePage = (index) => {
  currentPageIndex.value = index
  carouselRef.value.slideTo(index * slidesPerPage.value + 1)
}


</script>

<template>
  <div class="w-full flex justify-between items-center flex-col px-6 gap-3">

    
    <div class="w-full max-w-7xl flex items-center justify-between">


      <div class="flex items-center gap-3">

        <h3 class="text-sm font-medium tracking-wide uppercase text-text-secondary sm:text-sm">Trending Now</h3>
      </div>

      
      <div class="hidden lg:flex justify-center items-center gap-2">
        <button
          class="flex items-center justify-center w-6 h-6 text-text-muted cursor-pointer transition-colors hover:text-text-primary"
          @click="prev()"
          aria-label="Previous"
          >
            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

        <ul class="flex gap-1">
          <li
            v-for="(p, index) in trendingPages"
            :key="index"
            :class="index === currentPageIndex ? 'bg-text-primary w-6' : 'bg-eigengrau-600 hover:bg-eigengrau-400 w-3'"
            class="h-0.5 cursor-pointer transition-all duration-200 rounded-full"
            @click="setActivePage(index)"
            >
          </li>
        </ul>

        <button
          class="flex items-center justify-center w-6 h-6 text-text-muted cursor-pointer transition-colors hover:text-text-primary"
          @click="next()"
          aria-label="Next"
        >
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Carousel -->
    <div class="w-full max-w-7xl">
      <Carousel
          v-bind="carouselConfig"
          class="w-full max-w-7xl"
          ref="carouselRef"
        >
          <Slide class="border-2 border-transparent hover:border-accent-500/60 rounded-md transition-colors" v-for="s in trendingQuery" :key="s">
            <TvShowCard
              :show="s"
              :useNuxtLink="false"
              :hoverable="true"
              @click="navigateTo(`/shows/${s.id}`)"
            />
          </Slide>
      </Carousel>
    </div>
  </div>
</template>

<style></style>