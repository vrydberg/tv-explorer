<script setup>

definePageMeta({
    layout: 'default',
})

const route = useRoute()
const id = route.params.id


const { data: showData, error } = await useFetch(`/api/tmdb/shows/${id}`);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    message: error.value.message
  })
}

const placeholderBackdrop = ''


const sortedEpisodes = computed(() => {
  if (showData.value) {
    const ratings = showData.value.ratings
    const now = new Date()
    const sortedEpisodes = ratings.map(season => season.episodes).flat()
                                  .filter((episode) => new Date(episode.air_date) <= now)
                                  .sort((a, b) => b.rating - a.rating)
    return sortedEpisodes
  }
})

</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="absolute max-w-8xl w-full inset-0 -z-10 left-1/2 -translate-x-1/2">
      
      <div 
        class="aspect-[3/2] sm:aspect-[16/9] md:aspect-[21/9] w-full bg-center bg-cover"
        :style="{ backgroundImage: showData.show.backdrop ? `url(https://image.tmdb.org/t/p/original/${showData.show.backdrop})` : placeholderBackdrop }"
        >
            
        <div class="w-full h-full bg-[linear-gradient(90deg,#14181c_0%,rgba(20,24,28,0.986)_0.97%,rgba(20,24,28,0.945)_2.08%,rgba(20,24,28,0.883)_3.3%,rgba(20,24,28,0.803)_4.6%,rgba(20,24,28,0.711)_5.97%,rgba(20,24,28,0.61)_7.37%,rgba(20,24,28,0.504)_8.77%,rgba(20,24,28,0.398)_10.16%,rgba(20,24,28,0.296)_11.5%,rgba(20,24,28,0.203)_12.78%,rgba(20,24,28,0.122)_13.96%,rgba(20,24,28,0.059)_15.02%,rgba(20,24,28,0.016)_15.93%,rgba(20,24,28,0)_16.67%,rgba(20,24,28,0)_83.33%,rgba(20,24,28,0.016)_84.07%,rgba(20,24,28,0.059)_84.98%,rgba(20,24,28,0.122)_86.04%,rgba(20,24,28,0.203)_87.22%,rgba(20,24,28,0.296)_88.5%,rgba(20,24,28,0.398)_89.84%,rgba(20,24,28,0.504)_91.23%,rgba(20,24,28,0.61)_92.64%,rgba(20,24,28,0.711)_94.03%,rgba(20,24,28,0.803)_95.4%,rgba(20,24,28,0.883)_96.7%,rgba(20,24,28,0.945)_97.92%,rgba(20,24,28,0.986)_99.03%,#14181c_100%),linear-gradient(0deg,#14181c_0%,#14181c_21.48%,rgba(20,24,28,0.986)_23.64%,rgba(20,24,28,0.945)_26.1%,rgba(20,24,28,0.883)_28.81%,rgba(20,24,28,0.803)_31.71%,rgba(20,24,28,0.711)_34.74%,rgba(20,24,28,0.61)_37.85%,rgba(20,24,28,0.504)_40.97%,rgba(20,24,28,0.398)_44.06%,rgba(20,24,28,0.296)_47.05%,rgba(20,24,28,0.203)_49.88%,rgba(20,24,28,0.122)_52.5%,rgba(20,24,28,0.059)_54.85%,rgba(20,24,28,0.016)_56.88%,rgba(20,24,28,0)_58.52%)]">
        </div>
      </div>
    </div>

    <!-- Need to check xl above devices -->
    <div class="max-w-7xl w-full mx-auto pt-40 sm:pt-65 md:pt-65 lg:pt-85">

      <div class="flex flex-col gap-6 md:gap-8">
        
        <TvShowDetail
        :show="showData.show"
        >
        </TvShowDetail>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <InfographicCard title="Highest Rated Episodes">
            <ul class="flex flex-col w-full gap-3">
              <li 
                v-for="episode in sortedEpisodes.slice(0, 3)"
                class="flex justify-between items-center gap-3">
                <p class="text-xs font-medium text-text-tertiary w-3/4 truncate"
                  :title="episode.title"
                >
                  <span class="text-xs text-text-tertiary inline-block w-14 pr-2">
                    S{{ episode.season_number }}E{{ episode.episode_number }}
                  </span>
                  {{ episode.title }}
                </p>
                <span class="text-xs font-medium text-rating-high shrink-0">{{ episode.rating.toFixed(1) }}</span>
              </li>
            </ul>
          </InfographicCard>

          <InfographicCard title="Lowest Rated Episodes">
              <ul class="flex flex-col w-full gap-3">
                <li
                  v-for="episode in sortedEpisodes.slice(-3).reverse()"  
                  class="flex justify-between items-center gap-3"
                >
                  <p class="text-xs font-medium text-text-tertiary w-3/4 truncate"
                    :title="episode.title"
                  >
                    <span class="text-xs text-text-tertiary inline-block w-14 pr-2">
                      S{{ episode.season_number }}E{{ episode.episode_number }}
                    </span>
                    {{ episode.title }}
                  </p>
                  <span class="text-xs font-medium text-rating-low shrink-0">{{episode.rating.toFixed(1)}}</span>
                </li>
              </ul>
          </InfographicCard>

          <InfographicCard
            class="md:col-span-2"
            title="Rating Sparkline"
          >
            <RatingSparkline
              :ratings="showData.ratings"
              :show="showData.show"
            >
            </RatingSparkline>
          </InfographicCard>      
        </div>

        <RatingHeatmap
          class="flex-1 mb-8"
          :ratings="showData.ratings" 
          >
        </RatingHeatmap>
      </div>
    </div>
  </div>

</template>

<style></style>