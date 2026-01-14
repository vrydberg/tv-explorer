<script setup>

const props = defineProps(['show'])

const stars = computed(() => {
    const displayedRating = props.show.rating
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

const showFavorited = ref(false)
const showWatched = ref(false)
const showWatchlisted = ref(false)
</script>

<template>

  <div class="flex flex-col gap-6 sm:gap-8">  
    <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6
      sm:gap-x-8 sm:gap-y-6
      md:gap-x-10 md:gap-y-8
      lg:gap-x-12 lg:gap-y-4
      xl:gap-x-14 xl:gap-y-8
      lg:grid-cols-[auto_1fr_auto]">
      
      <TvShowCard 
        v-if="show.poster"
        class="w-32 sm:w-42 md:w-48 lg:w-56 xl:w-64 row-span-2 lg:row-span-3"
        :show="show"
        :hoverable="false"
        :useNuxtLink="false"
      />

      <div class="row-span-2 sm:row-span-1 lg:row-span-1 lg:col-start-2 self-end sm:self-auto">
        <div class="flex items-center flex-wrap gap-2">
          <h1 class="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">{{ show.title || '' }}</h1>
          <span class="text-xs sm:text-sm xl:text-base text-gray-300">({{ show.release_year || 'Unknown'}})</span>

          <span v-if="show.created_by"
            class="text-xs sm:text-sm xl:text-base w-full lg:w-auto text-gray-400">Created by {{ show.created_by }}
          </span>
          <span v-else
            class="text-xs sm:text-sm w-full xl:text-base lg:w-auto text-gray-400">Creator Unknown</span>

          <div v-if="show.rating"
            class="md:hidden flex items-center text-xs w-full">
            <div class="flex items-center gap-3">
              <div class="flex gap-1">
                <RatingStar
                  v-for="(star, index) in stars"
                  :key=index
                  :type=star
                  class="h-2 w-2 sm:h-3 sm:w-3 text-accent-500"
                  >
                </RatingStar>
              </div>
              <span class="text-white text-xs">({{ show.rating.toFixed(1) }}/10) • {{ show.total_votes || 0 }} votes</span>
            </div>
          </div>

          
        </div>
        
      </div>

      
      <div class="flex flex-col gap-2 text-white col-span-2 sm:col-span-1 lg:row-span-1 lg:col-start-2">
        <p v-if="show.tagline"
          class="font-medium uppercase text-xs xl:text-sm">
          {{ show.tagline }}
        </p>
        <p class="text-sm xl:text-base text-gray-400">{{ show.overview || 'No overview available' }}</p>
      </div>

      <div class="contents md:grid md:col-span-2 md:grid-cols-[1fr_auto] md:gap-2 lg:contents">
        <div class="flex flex-col gap-3 lg:gap-6 col-span-2 text-white md:col-span-1 
          lg:grid lg:grid-cols-[1fr_1fr]
        ">
          
          <div class="contents lg:flex lg:flex-col lg:gap-3 xl:gap-4">
            <div v-if="show.rating"
              class="hidden md:flex items-center text-xs xl:text-sm ">
              <h5 class="font-medium w-22 shrink-0 pr-2">Rating:</h5>
              <div class="flex items-center gap-3">
                <div class="flex gap-1">
                  <RatingStar
                    v-for="(star, index) in stars"
                    :key=index
                    :type=star
                    class="h-3 w-3 xl:h-4 xl:w-4 text-accent-500"
                    >
                  </RatingStar>
                </div>
                <span class="text-white text-xs xl:text-sm">({{ show.rating.toFixed(1) }}/10) • {{ show.total_votes || 0 }} votes</span>
              </div>
            </div>
            
            <div v-if="show.languages?.length > 0"
              class="flex items-start text-xs xl:text-sm">
              <h5 class="font-medium w-22 shrink-0 pr-2">Language:</h5>
              <div class="flex flex-wrap gap-2">
                
                <button
                  v-for="lang in show.languages"
                  class="px-1.5 rounded-lg text-xs xl:text-sm bg-gray-700">
                  {{ lang.english_name }}
                </button>            
              </div>
            </div>

            <div v-if="show.genres?.length > 0"
              class="flex items-start text-xs xl:text-sm">

              <h5 class="font-medium w-22 shrink-0 pr-2">Genres:</h5>
              <div class="flex flex-wrap gap-2">
                
                <button
                  v-for="genre in show.genres"
                  class="px-1.5 rounded-lg text-xs xl:text-sm bg-gray-700">
                  {{ genre.name }}
                </button>
              </div>
            </div>    
          </div>
          
          <div class="contents lg:flex lg:flex-col lg:gap-3 xl:gap-4">
            <div class="flex items-start text-xs xl:text-sm">
              <h5 class="font-medium w-22 shrink-0 pr-2">Status:</h5>
              <span class="text-gray-400">{{ show.status || 'Unknown' }}</span>
            </div>

            <div class="flex items-start text-xs xl:text-sm">
              <h5 class="font-medium w-22 shrink-0 pr-2">Country:</h5>
              <span class="text-gray-400">{{ show.origin_country || 'Unknown' }}</span>
            </div>

            <div v-if="show.production_companies?.length > 0" class="flex items-start text-xs xl:text-sm">
              <h5 class="font-medium w-22 shrink-0 pr-2">Production:</h5>
              <span class="text-gray-400">
                {{ show.production_companies.map(company => company.name).join(' • ') }}
              </span>
            </div>
            <div v-else class="flex items-start text-xs">
              <h5 class="font-medium w-22 shrink-0 pr-2">Production:</h5>
              <span class="text-gray-400">Unknown</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col col-span-2 text-white gap-3 lg:gap-0 md:col-span-1 lg:row-span-3 lg:row-start-1 lg:col-start-3">
          <button class="p-3 lg:px-3 lg:py-5 xl:px-4 xl:py-6 flex rounded-lg lg:flex-col lg:rounded-none lg:rounded-t-lg justify-start items-center gap-2 lg:border-b lg:border-b-eigengrau-500 bg-eigengrau-700 hover:bg-eigengrau-600 cursor-pointer">
            <svg v-if="showFavorited"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>

            <svg v-else
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            <p class="text-xs lg:hidden">Add to your favorites</p>
            <p class="hidden text-xs lg:block">Favorite</p>
          </button>

          <button class="p-3 rounded-lg lg:px-3 lg:py-5 xl:px-4 xl:py-6 flex lg:flex-col justify-start lg:rounded-none lg:border-b lg:border-b-eigengrau-500 items-center gap-2 bg-eigengrau-700 hover:bg-eigengrau-600 cursor-pointer">
            <svg v-if="showWatched"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
            </svg>

            <svg v-else
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p class="text-xs lg:hidden">Mark as watched</p>
            <p class="hidden text-xs lg:block">Watched</p>
          </button>

          <button class="p-3 rounded-lg lg:px-3 lg:py-5 xl:px-4 xl:py-6 flex lg:flex-col lg:rounded-none lg:rounded-b-lg justify-start items-center gap-2  bg-eigengrau-700 hover:bg-eigengrau-600 cursor-pointer">
            
            <svg v-if="showWatchlisted"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
            </svg>
            
            <svg v-else
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>

            <p class="text-xs lg:hidden">Add to your watchlist</p>
            <p class="hidden text-xs lg:block">Watchlist</p>

          </button>

        </div>
      </div>
      
    </div>
    
  </div>
</template>



<style></style>