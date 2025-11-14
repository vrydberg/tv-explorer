<script setup>
import TvShowCard from './TvShowCard.vue';
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps(['trendingQuery', 'searchQuery'])


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
  breakpoints: {
    640: {
      itemsToShow: 4,
      // itemstoScroll: 1,
      gap: 20,
      snapAlign: 'start'
    },
    768: {
      itemsToShow: 5,
      // itemstoScroll: 3,
      gap: 24,
      snapAlign: 'start'
    },
    1024: {
      itemsToShow: 6,
      gap: 28,
      // itemstoScroll: 6,
      wrapAround: false,
      snapAlign: 'start'
    },
    1536: {
      itemsToShow: 8,
      gap: 32,
      // itemstoScroll: 6,
      wrapAround: true,
      snapAlign: 'start'
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
  <div class="w-full flex justify-between items-center flex-col px-6 gap-4">
  
    <div class="w-full max-w-6xl flex items-start justify-between ">


      <h3 class="text-md leading-none mt-0 mb-0 pt-0 pb-0 flex font-medium text-white lg:text-md">Trending</h3>

      <div class="hidden lg:flex justify-center items-center gap-4">
      
        <button
            class="flex items-center justify-center bg-steel-700 text-white rounded-3xl cursor-pointer p-1 hover:bg-eigengrau-500"
            @click="prev()"
          >
            <svg
              class="w-12 h-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

      

        <ul class="flex gap-2">
          <li
            v-for="(p, index) in trendingPages"
            :key="index"
            :class="index === currentPageIndex ? 'bg-white' : 'bg-eigengrau-600 hover:bg-eigengrau-300'"
            class="h-1 w-6 cursor-pointer"
            @click="setActivePage(index)"
            >
          </li>
        </ul>

        <button 
          class="flex items-center justify-center bg-eigengrau-700 text-white rounded-3xl cursor-pointer p-1 hover:bg-eigengrau-500"
          @click="next()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-12 h-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div> 
    </div>
      
    <div 
      xv-if="searchQuery.length === 0"
      class="w-full max-w-6xl">
    
      <Carousel
          v-bind="carouselConfig"
          v-model="currentSlide"
          class="w-full max-w-6xl"
          ref="carouselRef"
        >        
          <Slide v-for="s in trendingQuery" :key="s">
            <TvShowCard :show="s" />
          </Slide>
      </Carousel>      
    
    </div>

    
    <!-- <div 
      v-else
      class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-7xl">
      <TvShowCard
        v-for="s in searchQuery"
        :key="s.id"
        :show="s"
        >
      </TvShowCard>
    </div> -->
  </div>
</template>


<style></style>