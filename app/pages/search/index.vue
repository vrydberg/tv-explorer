<script setup>
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const query = computed(() => route.query.q || '')

const { data: results, status } = await useFetch('/api/tmdb/search', {
  query: { query },
  watch: [query],
  immediate: true,
})

const isLoading = computed(() => status.value === 'pending')
const hasResults = computed(() => results.value && results.value.length > 0)
const hasQuery = computed(() => query.value.trim().length > 0)
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <span class="mb-2 inline-block font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Search
        </span>
        <h1 v-if="hasQuery" class="text-md font-semibold text-text-primary sm:text-lg">
          Results for "{{ query }}"
        </h1>
        <h1 v-else class="text-2xl font-semibold text-text-primary sm:text-3xl">
          Search for a show
        </h1>
      </div>

      <!-- Loading state: skeleton cards -->
      <div v-if="isLoading && hasQuery" class="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        <div
          v-for="i in 10"
          :key="i"
          class="aspect-2/3 animate-pulse rounded-md bg-surface-elevated"
        ></div>
      </div>

      <!-- Results grid -->
      <div v-else-if="hasResults" class="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        <TvShowCard
          v-for="show in results"
          :key="show.id"
          :show="show"
          :useNuxtLink="true"
          :hoverable="true"
        />
      </div>

      <!-- No results state -->
      <div v-else-if="hasQuery && !isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="mb-4 rounded-full bg-surface-elevated p-4">
          <svg class="h-8 w-8 text-text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 class="mb-2 text-lg font-medium text-text-primary">No shows found</h2>
        <p class="text-sm text-text-muted">
          Try adjusting your search or explore trending shows
        </p>
        <NuxtLink
          to="/"
          class="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-border-hover hover:text-text-primary"
        >
          Browse Trending
        </NuxtLink>
      </div>

      <!-- Empty state: no query -->
      <div v-else class="flex flex-col items-center justify-center py-20">
        <div class="mb-4 rounded-full bg-surface-elevated p-4">
          <svg class="h-8 w-8 text-text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 class="mb-2 text-lg font-medium text-text-primary">Start searching</h2>
        <p class="text-sm text-text-muted">
          Use the search bar to find your favorite shows
        </p>
      </div>
    </div>
  </div>
</template>
