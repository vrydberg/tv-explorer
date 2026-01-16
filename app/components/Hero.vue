<script setup>
const router = useRouter()
const searchQuery = ref('')
const searchInput = ref(null)

const handleSearchSubmit = () => {
  const query = searchQuery.value.trim()
  if (query) {
    router.push({ path: '/search', query: { q: query } })
    searchQuery.value = ''
  }
}
</script>

<template>
  <section class="w-full relative z-10">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-center bg-cover"
      style="background-image: url('https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg');"
    ></div>

    <!-- Heavy dark overlay for muted effect -->
    <!-- <div class="absolute inset-0 bg-eigengrau-900/70"></div> -->

    <div class="absolute inset-0 bg-eigengrau-900/40"></div>


    <!-- Gradient overlays for depth -->
    <div class="absolute inset-0 bg-gradient-to-b from-eigengrau-900/40 via-transparent to-eigengrau-900/80"></div>

    <!-- Bottom fade to page background -->
    <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"></div>

    <!-- Content -->
    <div class="relative flex flex-col items-center justify-center px-6 py-20 sm:px-8 sm:py-24 lg:py-28">

      <!-- Tagline -->
      <h1 class="font-serif text-2xl font-medium tracking-tight text-text-primary text-center sm:text-3xl lg:text-4xl">
        What will you watch next?
      </h1>

      <!-- Search Bar -->
      <form
        @submit.prevent="handleSearchSubmit"
        class="relative w-full max-w-md mt-8 sm:mt-10 lg:mt-12 lg:max-w-lg"
      >
        <div class="relative group">
          <!-- Input -->
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search for a show..."
            class="w-full bg-eigengrau-900/60 backdrop-blur-sm border border-eigengrau-600 text-text-primary placeholder:text-text-muted rounded-sm pl-12 pr-4 py-3.5 text-base transition-all duration-200 focus:bg-eigengrau-900/80 focus:border-eigengrau-500 focus:outline-none sm:pl-14 sm:pr-20 sm:py-4 sm:text-lg"
          />

          <!-- Search Icon -->
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary pointer-events-none sm:left-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <!-- Submit hint (desktop) -->
          <div class="hidden absolute right-4 top-1/2 -translate-y-1/2 sm:flex items-center pointer-events-none">
            <kbd class="px-2 py-1 text-[10px] font-mono text-text-muted bg-eigengrau-800 border border-eigengrau-600 rounded">
              Enter
            </kbd>
          </div>
        </div>
      </form>

      <!-- Account Benefit Line -->
      <p class="mt-6 text-sm text-text-muted sm:mt-8">
        <NuxtLink
          to="/register"
          class="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-text-secondary"
        >
          <span>Create an account to save favorites and build your watchlist</span>
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<style></style>
