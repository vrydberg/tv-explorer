<script setup>
import { ref } from 'vue';
import tvIcon from '~/assets/images/icons/tv.png';

const route = useRoute()
const router = useRouter()

const isOpen = ref(false)
const searchQuery = ref('')
const showSearch = ref(false)
const searchInput = ref(null)

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const handleSearchSubmit = () => {
  const query = searchQuery.value.trim()
  if (query) {
    router.push({ path: '/search', query: { q: query } })
    searchQuery.value = ''
    showSearch.value = false
    isOpen.value = false
  }
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

// Close search on escape (mobile only now)
const handleSearchKeydown = (e) => {
  if (e.key === 'Escape') {
    showSearch.value = false
  }
}

// Check if we're on a show detail page
const isShowPage = computed(() => route.path.startsWith('/shows/'))
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full py-3 px-4 sm:px-6 lg:px-8 text-white"
    :class="isShowPage ? 'bg-eigengrau-900/50 backdrop-blur-sm' : 'bg-eigengrau-900'"
  >
    <div class="w-full mx-auto max-w-7xl">
      <!-- Desktop Layout -->
      <div class="hidden md:flex items-center justify-between">
        <!-- Logo (Left) -->
        <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0 group">
          <img :src="tvIcon" alt="TV Explorer App" class="h-5 w-auto opacity-90 group-hover:opacity-100 transition-opacity"/>
          <span class="text-base font-semibold tracking-tight text-text-primary">Banana Stand</span>
        </NuxtLink>

        <!-- Center: Nav Links + Search -->
        <div class="flex items-center gap-10">
          <!-- Nav Links -->
          <ul class="flex items-center gap-7 text-[13px] font-medium tracking-wide">
            <li>
              <NuxtLink
                to="/"
                class="relative py-1.5 transition-colors duration-200 group"
                :class="$route.path === '/' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'"
              >
                Home
                <span
                  class="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent-500"
                  :class="$route.path === '/'
                    ? 'block'
                    : 'hidden group-hover:block'"
                ></span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/explorer"
                class="relative py-1.5 transition-colors duration-200 group"
                :class="$route.path === '/explorer' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'"
              >
                Explorer
                <span
                  class="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent-500"
                  :class="$route.path === '/explorer'
                    ? 'block'
                    : 'hidden group-hover:block'"
                ></span>
              </NuxtLink>
            </li>
            <!-- <li>
              <NuxtLink
                to="/about"
                class="relative py-1.5 group"
                :class="$route.path === '/about'
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-primary'"
              >
                About
                <span
                  class="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent-500"
                  :class="$route.path === '/about'
                    ? 'block'
                    : 'hidden group-hover:block'"
                ></span>
              </NuxtLink>
            </li> -->
          </ul>

          <!-- Always-Visible Search Bar -->
          <form @submit.prevent="handleSearchSubmit" class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search shows..."
              class="w-48 lg:w-56 bg-eigengrau-850/60 border border-eigengrau-700/50 text-text-primary placeholder:text-text-subtle rounded-lg pl-9 pr-4 py-1.5 text-sm transition-colors duration-200 focus:bg-eigengrau-850 focus:border-accent-500/50 focus:outline-none"
            />
          </form>
        </div>

        <!-- Once implemented login page change -->
        <NuxtLink
          to="/"
          class="shrink-0 px-3.5 py-1 text-[13px] font-medium tracking-wide bg-accent-500 hover:bg-accent-400 text-white rounded transition-colors duration-200"
        >
          Login
        </NuxtLink>
      </div>

      <!-- Mobile Layout -->
      <div class="flex md:hidden items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img :src="tvIcon" alt="TV Explorer App" class="pb-0.5 h-5 w-auto"/>
          <span class="text-sm font-semibold tracking-tight">Banana Stand</span>
        </NuxtLink>

        <!-- Mobile Controls -->
        <div class="flex items-center gap-0.5">
          <!-- Search Toggle -->
          <button
            type="button"
            class="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors duration-200"
            @click="toggleSearch"
            aria-label="Toggle search"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Hamburger -->
          <button
            type="button"
            class="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors duration-200"
            @click="toggleNav"
            aria-label="Toggle menu"
          >
            <svg v-if="!isOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search (Expandable) -->
      <div
        v-show="showSearch"
        class="mt-3 md:hidden"
      >
        <form @submit.prevent="handleSearchSubmit" class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref="searchInput"
            v-model="searchQuery"
            @keydown="handleSearchKeydown"
            type="text"
            placeholder="Search shows..."
            class="w-full bg-surface border border-border text-text-primary placeholder:text-text-subtle rounded-lg pl-10 pr-4 py-2.5 text-sm transition-colors duration-200 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none"
          />
        </form>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="isOpen"
        class="absolute left-0 right-0 top-full bg-eigengrau-900 px-4 sm:px-6 pb-3 md:hidden shadow-lg"
      >
        <ul class="flex flex-col gap-1 py-2">
          <li>
            <NuxtLink
              to="/"
              :class="[
                'block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/'
                  ? 'bg-surface-elevated text-text-primary'
                  : 'text-text-muted hover:bg-surface hover:text-text-primary'
              ]"
              @click="toggleNav"
            >Home</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/explorer"
              :class="[
                'block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/explorer'
                  ? 'bg-surface-elevated text-text-primary'
                  : 'text-text-muted hover:bg-surface hover:text-text-primary'
              ]"
              @click="toggleNav"
            >Explorer</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about"
              :class="[
                'block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/about'
                  ? 'bg-surface-elevated text-text-primary'
                  : 'text-text-muted hover:bg-surface hover:text-text-primary'
              ]"
              @click="toggleNav"
            >About</NuxtLink>
          </li>
        </ul>

        <!-- Login CTA in Mobile -->
        <div class="mt-2 pt-2 border-t border-border-subtle">
          <NuxtLink
            to="/login"
            class="block w-full py-2.5 px-4 bg-accent-500 hover:bg-accent-400 rounded-lg text-sm font-medium text-center text-white transition-colors duration-200"
            @click="toggleNav"
          >Login</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style></style>
