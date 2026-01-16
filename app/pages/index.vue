<script setup>
definePageMeta({
  layout: 'default',
})

const { data: trendingData, error } = await useFetch('/api/tmdb/trending')

if (error.value) {
  console.error('API ERROR:', error.value)
}

const trendingTvShows = ref(trendingData.value)

const genres = [
  { id: 18, name: 'Drama' },
  { id: 35, name: 'Comedy' },
  { id: 10759, name: 'Action & Adventure' },
  { id: 80, name: 'Crime' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 9648, name: 'Mystery' },
  { id: 99, name: 'Documentary' },
]
</script>

<template>
  <div class="flex flex-col">
    <Hero />

    <!-- Trending Section - Prominent placement -->
    <section class="relative z-20 -mt-4 sm:-mt-6">
      <TrendingResults
        class="py-8 sm:py-10 lg:py-12"
        :trendingQuery="trendingTvShows"
      />
    </section>

    <!-- Browse by Genre -->
    <section class="w-full px-6 py-12 sm:py-16">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col items-center">
          <h2 class="text-sm font-medium tracking-wide uppercase text-text-secondary mb-6 sm:mb-8">
            Browse by Genre
          </h2>
          <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
            <NuxtLink
              v-for="genre in genres"
              :key="genre.id"
              to="/explorer"
              class="px-4 py-2 text-sm text-text-muted border border-border rounded-sm transition-colors duration-200 hover:text-text-primary hover:border-border-hover sm:px-5"
            >
              {{ genre.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full max-w-7xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </div>

    <!-- Features Grid -->
    <section class="w-full px-6 py-14 sm:py-16">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">

          <!-- Search -->
          <div class="border border-border rounded-md bg-surface flex flex-col p-4 gap-2 items-center text-center sm:items-start sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div class="p-1 text-text-muted rounded-sm bg-surface-elevated flex items-center justify-center">
                <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-text-primary">Search</h3>
            </div>
            <p class="mt-1.5 text-xs leading-relaxed text-text-muted">
              Find any show instantly with quick, responsive search.
            </p>
          </div>

          <!-- Rating Visualizations -->
          <div class="border border-border rounded-md bg-surface flex flex-col p-4 gap-2 items-center text-center sm:items-start sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div class="p-1 text-text-muted rounded-sm bg-surface-elevated flex items-center justify-center">
                <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-text-primary">Rating visualizations</h3>
            </div>
            <p class="mt-1.5 text-xs leading-relaxed text-text-muted">
              Heatmaps and sparklines reveal how shows evolve across seasons.
            </p>
          </div>

          <!-- Build Collections -->
          <div class="border border-border rounded-md bg-surface flex flex-col p-4 gap-2 items-center text-center sm:items-start sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div class="p-1 text-text-muted rounded-sm bg-surface-elevated flex items-center justify-center">
                <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-text-primary">Build collections</h3>
            </div>
            <p class="mt-1.5 text-xs leading-relaxed text-text-muted">
              Create custom lists to organize shows however you like.
            </p>
          </div>

          <!-- Track Favorites -->
          <div class="border border-border rounded-md bg-surface flex flex-col p-4 gap-2 items-center text-center sm:items-start sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div class="p-1 text-text-muted rounded-sm bg-surface-elevated flex items-center justify-center">
                <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-text-primary">Track favorites</h3>
            </div>
            <p class="mt-1.5 text-xs leading-relaxed text-text-muted">
              Mark what you've watched and never lose track of what's next.
            </p>
          </div>

          <!-- Trending Insights -->
          <div class="border border-border rounded-md bg-surface flex flex-col p-4 gap-2 items-center text-center sm:items-start sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div class="p-1 text-text-muted rounded-sm bg-surface-elevated flex items-center justify-center">
                <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-text-primary">Trending insights</h3>
            </div>
            <p class="mt-1.5 text-xs leading-relaxed text-text-muted">
              Stay updated with what's popular and gaining momentum.
            </p>
          </div>

          <!-- Filtering -->
          <div class="border border-border rounded-md bg-surface flex flex-col p-4 gap-2 items-center text-center sm:items-start sm:text-left">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div class="p-1 text-text-muted rounded-sm bg-surface-elevated flex items-center justify-center">
                <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-text-primary">Filter your way</h3>
            </div>
            <p class="mt-1.5 text-xs leading-relaxed text-text-muted">
              Genre, rating, year, network — find exactly what you want.
            </p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
