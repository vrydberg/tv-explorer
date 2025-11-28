<script setup>

import { ref, TransitionGroup } from 'vue';

// const props = defineProps(['searchQuery'])

const openSections= ref({
  genres: false,
  languages: false,
})

const dialog = ref(null)


let dialogMediaQuery

const fetchedShows = ref([])
const page = ref(1)
const selectedSort = ref('popularity.desc')
const selectedGenres = ref([])
const selectedLanguage = ref('')
const minReleaseDate = ref('')
const maxReleaseDate = ref('')
const minRating = ref(0)
const minRuntime = ref(0)
const maxRuntime = ref(360)


const filters = computed(() => ({
  include_adult: false,
  include_null_first_air_dates: false,
  language: 'en-US',
  page: page.value,
  sort_by: selectedSort.value,
  with_genres: selectedGenres.value,
  with_original_language: selectedLanguage.value,
  "first_air_date.gte": minReleaseDate.value,
  "first_air_date.lte": maxReleaseDate.value,
  "vote_average.gte": minRating.value,
  "with_runtime.gte": minRuntime.value,
  "with_runtime.lte": maxRuntime.value,
  "vote_count.gte": 0
}))

const defaultFilterValues = {
  minRating: 0,
  minRuntime: 0,
  maxRuntime: 240,
  selectedSort: 'most_popular',
  selectedGenres: [],
  selectedLanguage: 'English'
}

const genres = [
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 10759, name: "Action & Adventure" },
  { id: 80, name: "Crime" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy"},
]
    
const languages = [
  { code: "", english_name: "Any", name: "Any" },
  { code: "en", english_name: "English", name: "English" },
  { code: "es", english_name: "Spanish", name: "Español" },
  { code: "fr", english_name: "French", name: "Français" },
  { code: "ko", english_name: "Korean", name: "한국어/조선말" },
  { code: "ja", english_name: "Japanese", name: "日本語" },
  { code: "zh", english_name: "Mandarin", name: "普通话" },
  { code: "de", english_name: "German", name: "Deutsch" },
  { code: "sv", english_name: "Swedish", name: "svenska" }
]

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'first_air_date.desc', label: 'Newest First' },
  { value: 'first_air_date.asc', label: 'Oldest First' },
  { value: 'name.asc', label: 'Title (A-Z)' },
  { value: 'name.desc', label: 'Title (Z-A)' },
]

const stars = computed(() => {
  const displayedRating = minRating.value
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




const applyFilters = async () => {
  fetchedShows.value = []
  page.value = 1
  console.log("Applying Filters!")
  await fetchShows()
  await nextTick()
  initializeIntersectionObserver()
}

const fetchShows = async () => {
  
  try {
    if (isLoading.value) { return}
    isLoading.value = true

    // await new Promise(resolve => setTimeout(resolve, 100)) - Maybe implement debounce instead of interval delay
    const url = `/api/tmdb/explorer`
    const tvShowData = await $fetch(url, {
      method: 'POST',
      body: {
        filters: filters.value
      }
    });

    // fetchedShows.value = [...tvShowData] || []
    fetchedShows.value = [...fetchedShows.value, ...(tvShowData ?? [])]
    // fetchedShows.value = tvShowData || []

    console.log("we in it to win it!")
  } catch (error) {
    console.log("erroooooor meister!")
    console.log("Error: ", error)
  } finally {
    isLoading.value = false
  }

}


const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]

}
const sectionIsOpen = (section) => {
  return openSections.value[section]
}

const handleDialogEvent = (e) => {
  if (e.matches && dialog.value?.open) {
    dialog.value.close()
  }
}

const filtersUnchanged = computed(() => {
  return (
    minRating.value === defaultFilterValues.minRating &&
    minRuntime.value === defaultFilterValues.minRuntime &&
    maxRuntime.value === defaultFilterValues.maxRuntime &&
    selectedSort.value === defaultFilterValues.selectedSort &&
    selectedLanguage.value === defaultFilterValues.selectedLanguage &&
    selectedGenres.value.length === defaultFilterValues.selectedGenres.length
  )
})

const resetFilters = () => {
  minRating.value = defaultFilterValues.minRating
  minRuntime.value = defaultFilterValues.minRuntime
  maxRuntime.value = defaultFilterValues.maxRuntime
  selectedSort.value = defaultFilterValues.selectedSort
  selectedLanguage.value = defaultFilterValues.selectedLanguage
  selectedGenres.value = defaultFilterValues.selectedGenres
}

// const isLoading = ref(false)
// const hasMore = ref(true)

const isLoading = ref(true)

let observer
const scrollTriggerRef = useTemplateRef('scroll-trigger-ref')

// let triggerRef = null
const initializeIntersectionObserver = () => {

  // If existing observer watching target element, disconnect it
  if (observer) {
    observer.disconnect()
  }

  if (!scrollTriggerRef?.value) {
    console.log("Scroll trigger template ref does not refer to an actual DOM element")
    return
  }

  console.log(scrollTriggerRef.value)

  const options = {
    root: null,
    rootMargin: "300px",
    threshold: 0.1,
  };
  
  observer = new IntersectionObserver( (entries) => {
    const target = entries[0]
    // if (target.isIntersecting && hasMore.value && !isLoading.value) {
    //   page.value++
    // }
    if (target.isIntersecting && !isLoading.value) {
      page.value++
    }
  }, options);

  observer.observe(scrollTriggerRef.value[0]);
}


watch(page, async (newPageValue) => {
  if (newPageValue > 1) {
    
    await fetchShows()
    await nextTick()
    initializeIntersectionObserver()
  }
});

onMounted( async () => {
  await fetchShows()
  await nextTick()
    dialogMediaQuery = window.matchMedia('(min-width: 1024px)')
  dialogMediaQuery.addEventListener('change', handleDialogEvent)
  initializeIntersectionObserver()
})

onUnmounted(() => {
  dialogMediaQuery.removeEventListener('change', handleDialogEvent)
})

</script>

<template>
  

  <div class="bg-white px-4 sm:px-6 lg:px-8">
    <!-- Mobile filter dialog -->
    <div>
      <dialog ref="dialog" id="mobile-filters" class="overflow-hidden backdrop:bg-transparent lg:hidden">
        <div tabindex="0" class="fixed inset-0 flex focus:outline-none">
          <div class="px-2 relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">Filters</h2>
              <!-- perhaps add a save button here to apply the filter -->
              <button type="button" command="close" commandfor="mobile-filters" class="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
                  <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <form class="mt-4 border-t border-gray-200">
              <h3 class="sr-only">Categories</h3>
              <!-- <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                <li>
                  <a href="#" class="block px-2 py-1">Trending</a>
                </li>
                <li>
                  <a href="#" class="block px-2 py-1">Top Rated</a>
                </li>
                <li>
                  <a href="#" class="block px-2 py-1">Most Popular</a>
                </li>
              </ul> -->

              <div class="border-t border-gray-200 px-4 py-6">
                <h3 class="-mx-2 -my-3 flow-root">
                  <button 
                    type="button"
                    command="--toggle"
                    commandfor="filter-section-mobile-color"
                    class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    @click="toggleSection('genres')"
                    >
                    <span class="font-medium text-gray-900">Genres</span>

                    <span class="ml-6 flex items-center">
                      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 in-aria-expanded:hidden">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                      </svg>
                      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 not-in-aria-expanded:hidden">
                        <path d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clip-rule="evenodd" fill-rule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id="filter-section-mobile-color"
                  :class="[
                    'pt-4',
                    sectionIsOpen('genres') ? 'block' : 'hidden' 
                  ]">

                  <div class="space-y-4">
                    <div class="columns-2 gap-4">
                      <FilterCheckbox
                        v-model="selectedGenres"
                        v-for="genre in genres"
                        :key="genre.id"
                        :value="genre.id"
                        :label="genre.name"
                      >
                      </FilterCheckbox>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <h2 class="leading-none font-medium text-gray-900">Languages</h2>
                <select 
                  v-model="selectedLanguage"
                  class="w-full text-sm border-l-2 mt-4 border-indigo-600 p-1">
                  <option
                    v-for="lang in languages"
                    :key="lang.code"
                    :value="lang.code"
                  >
                    {{ lang.english_name }}
                  </option>
                </select>
                  
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <div class="flex items-center justify-between">
                  <h2 class="leading-none text-sm font-medium text-gray-900">Rating</h2>
                  <div class="flex gap-1">
                    <RatingStar
                      v-for="(star, index) in stars"
                      :key=index
                      :type=star
                      class="h-3 w-3 text-indigo-600"
                      >
                    </RatingStar>
                  </div>
                </div>
                
                <div class="flex gap-2 items-center mt-4">
                  <label class="flex text-xs font-medium gap-1" for="">>= <span>{{ minRating }}</span></label>
                  <Slider
                    v-model="minRating"
                    :min="0"
                    :max="10"
                    :step="1"
                    >
                  </Slider>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <h2 class="leading-none text-sm font-medium text-gray-900">Runtime</h2>

                <div class="flex flex-col gap-3 mt-4">
                  <div class="flex justify-between">
                    <label class="text-xs font-medium leading-none">
                      Min <span>{{ minRuntime }}</span>
                    </label>
                    <label class="text-xs font-medium leading-none">
                      Max <span>{{ maxRuntime }}</span>
                    </label>
                  </div>
                  <DualSlider
                    v-model:minVal="minRuntime"
                    v-model:maxVal="maxRuntime"
                    :min="0"
                    :max="360"
                    :step="10"
                  >
                  </DualSlider>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">

                <h2 class="leading-none text-sm font-medium text-gray-900">Release Date</h2>
                
                <div class="flex flex-col gap-2 mt-4">
                
                  <div class="flex justify-between items-center">
                    <label class="text-xs" for="release-start">Start:</label>
                    <input
                      v-model="minReleaseDate"
                      class="border text-xs"
                      type="date"
                      id="start"
                      name="release-start"
                    />
                  </div>

                  <div class="flex justify-between items-center">
                    <label class="text-xs" for="release-end">End:</label>
                    <input
                      v-model="maxReleaseDate"
                      class="border text-xs"
                      type="date"
                      id="release-end"
                      name="release-end"
                    />
                  </div>
                </div>
              </div>

              



              <div class="border-t border-gray-200 px-4 py-6">
                <div class="flex items-center gap-4">
                  <button 
                    :class="[
                      'py-1.5 flex-1 rounded-lg font-medium text-sm text-white',
                      filtersUnchanged ? 'bg-eigengrau-200 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer' 
                    ]"
                    type="button"
                    @click="applyFilters"
                    >
                    Apply
                  </button>
                    
                  <button 
                    class="cursor-pointer text-eigengrau-900 hover:text-indigo-600"
                    type="button"
                    @click="resetFilters"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-5 w-5">
                      <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clip-rule="evenodd" />
                    </svg>

                  </button>
                </div>


                
              </div>

              
            </form>
          </div>
        </div>
      </dialog>
    </div>

    <main xclass="border-2 border-blue-500 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          class="mx-auto max-w-7xl">

      <div xclass="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6"
            class="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-2">
        <h1 class="text-xl md:text-2xl font-semibold tracking-tight text-eigengrau-900">TV Show Explorer</h1>

        <div class="flex items-center">

          <div class="relative inline-block text-left">
            <details class="group relative inline-block text-left">
  
              <summary class="list-none cursor-pointer inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <svg viewBox="0 0 20 20" fill="currentColor" class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500 transition-transform group-open:rotate-180">
                  <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
              </summary>

              <div class="absolute right-0 top-8 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-2xl shadow-black ring-1 ring-black/20 focus:outline-none">
                <div class="py-1">
                  <button
                    v-for="option in sortOptions"
                    :key="option.value"
                    type="button"
                    class="block text-left rounded-md px-4 py-2 w-full text-align text-sm font-medium text-gray-900 hover:bg-gray-100"
                    @click="handleSort(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </details>
          </div>

          <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
            <span class="sr-only">View grid</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
              <path d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </button>
          <button type="button" command="show-modal" commandfor="mobile-filters" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <span class="sr-only">Filters</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
              <path d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" class="pt-6 pb-24">        
        <h2 id="products-heading" class="sr-only">Products</h2>

        <div class=" grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-5">
          
          <form class="hidden lg:flex lg:flex-col lg:gap-6">
            
            <!-- <div class="pb-6 border-b border-gray-200">
              <h3 class="sr-only">Categories</h3>
              <ul role="list" class="flex flex-col gap-4 text-sm font-medium text-gray-900">
                <li>
                  <a href="#">Trending</a>
                </li>

                <li>
                  <a href="#">Top Rated</a>
                </li>

                <li>
                  <a href="#">Most Popular</a>
                </li>
                
              </ul>
            </div> -->
            

            <div class="flex flex-col gap-4 pb-6 border-b border-gray-200">
              <div class="">
                <h3 class="flow-root">

                  <button type="button" 
                    class="flex w-full items-center justify-between bg-white py-0 text-sm text-gray-400 hover:text-gray-500"
                    @click="toggleSection('genres')"
                  >
                    <span class="font-medium text-gray-900">Genres</span>
                    <span class="ml-6 flex items-center">
                      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 in-aria-expanded:hidden">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                      </svg>
                      <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 not-in-aria-expanded:hidden">
                        <path d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clip-rule="evenodd" fill-rule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </h3>
                
                <div
                  xclass="block pt-6"
                  :class="[
                    'pt-6',
                    sectionIsOpen('genres') ? 'block' : 'hidden' 
                  ]">

                  <div class="space-y-4">
                    <div class="columns-2 gap-2">
                      <FilterCheckbox
                        v-model="selectedGenres"
                        v-for="genre in genres"
                        :key="genre.id"
                        :value="genre.id"
                        :label="genre.name"
                      >
                      </FilterCheckbox>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4 pb-6 border-b border-gray-200">    
              <h2 class="leading-none text-sm font-medium text-gray-900">Languages</h2>
              <select 
                v-model="selectedLanguage"
                class="text-xs border-l-2 border-indigo-600 px-2">
                <option
                  v-for="lang in languages"
                  :key="lang.code"
                  :value="lang.code"
                >
                  {{ lang.english_name }}
                </option>
              </select>
              
            </div>
            


            <div class="flex flex-col gap-4 pb-6 border-b border-gray-200">    
              <div class="flex items-center justify-between">
                <h2 class="leading-none text-sm font-medium text-gray-900">Rating</h2>
                <div class="flex gap-1">
                  <RatingStar
                    v-for="(star, index) in stars"
                    :key=index
                    :type=star
                    class="h-3 w-3 text-indigo-600"
                    >
                  </RatingStar>
                </div>
              </div>
              
              <div class="flex gap-2 items-center">
                <label class="flex text-xs font-medium gap-1" for="">>= <span>{{ minRating }}</span></label>
                <Slider
                  v-model="minRating"
                  :min="0"
                  :max="10"
                  :step="1"
                  >
                </Slider>
              </div>
              
            </div>

            <div class="flex flex-col gap-4 pb-6 border-b border-gray-200">
              <h2 class="leading-none text-sm font-medium text-gray-900">Runtime</h2>

              <div class="flex flex-col gap-3">
                <div class="flex justify-between">
                  <label class="text-xs font-medium leading-none">
                    Min <span>{{ minRuntime }}</span>
                  </label>
                  <label class="text-xs font-medium leading-none">
                    Max <span>{{ maxRuntime }}</span>
                  </label>
                </div>
                <DualSlider
                  v-model:minVal="minRuntime"
                  v-model:maxVal="maxRuntime"
                  :min="0"
                  :max="240"
                  :step="10"
                >
                </DualSlider>
              </div>
            </div>

            <div class="flex flex-col gap-4 pb-6 border-b border-gray-200">
              <h2 class="leading-none text-sm font-medium text-gray-900">Release Date</h2>
              
              <div class="flex justify-between items-center">
                <label class="text-xs" for="release-start">Start:</label>
                <input
                  v-model="minReleaseDate"
                  class="border text-xs"
                  type="date"
                  id="start"
                  name="release-start"
                />
              </div>

              <div class="flex justify-between items-center">
                <label class="text-xs" for="release-end">End:</label>
                <input
                  v-model="maxReleaseDate"
                  class="border text-xs"
                  type="date"
                  id="release-end"
                  name="release-end"
                />
              </div>
            </div>


            <div class="flex flex-col gap-4 pb-6  border-gray-200">

              <div class="flex items-center gap-4">
                <button 
                  :class="[
                    'py-1.5 flex-1 rounded-lg font-medium text-sm text-white',
                    filtersUnchanged ? 'bg-eigengrau-200 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer' 
                  ]"
                  type="button"
                  @click="applyFilters"
                  >
                  Apply
                </button>
                  
                <button 
                  class="cursor-pointer text-eigengrau-900 hover:text-indigo-600"
                  type="button"
                  @click="resetFilters()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-5 w-5">
                    <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clip-rule="evenodd" />
                  </svg>

                </button>
              </div>


              
            </div>
                        
          </form>

          <!-- Product grid -->
          <div class=" lg:col-span-4">

            <TransitionGroup
              
              name="fade"
              tag="div" 
              :class="isLoading ? 'hidden': 'w-full grid gap-6 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'">
              
              <div
                v-for="(s, index) in fetchedShows"
                :ref="index === fetchedShows.length - 1 ? 'scroll-trigger-ref' : null"
                :key="s.id"
              >
                <TvShowCard
                  :class="index === fetchedShows.length - 1 ? 'border-4' : ''"
                  :show="s"
                  :extraInfo="true"
                />
              </div>




              
            </TransitionGroup>

            <!-- <div ref="triggerRef" class="border flex justify-center items-center py-8 min-h-[100px]">
              <div v-if="isLoading" class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-2"></div>
                <p class="text-gray-400">Loading more shows...</p>
              </div>
              
              <div v-else-if="!hasMore" class="text-gray-400 text-center">
                <p class="text-xl mb-2">🎬</p>
                <p>You've reached the end!</p>
                <p class="text-sm">Total shows loaded: {{ items.length }}</p>
              </div>
            </div> -->

            
          </div>

        </div>
      </section>
    </main>
</div>

</template>

<style>


.fade-enter-from {
  opacity: 0;
  transform: translateY(10px); /* optional for slide effect */
}

.fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}


</style>

