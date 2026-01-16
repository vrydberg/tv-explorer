<script setup>
definePageMeta({
  layout: 'default',
})

// FAQ data
const faqItems = ref([
  {
    question: 'How does TV Explorer gather show data?',
    answer: 'We source all show information, ratings, and metadata from The Movie Database (TMDB) API, ensuring comprehensive and up-to-date coverage of television content worldwide.',
    open: false
  },
  {
    question: 'Can I save shows to watch later?',
    answer: 'Yes. Create a personalized watchlist by adding shows you want to track. Your favorites and watchlist are stored locally for quick access.',
    open: false
  },
  {
    question: 'What makes the rating visualizations unique?',
    answer: 'Our D3.js-powered charts display episode-by-episode rating trends, letting you spot quality shifts across seasons and identify standout episodes at a glance.',
    open: false
  },
  {
    question: 'Is TV Explorer free to use?',
    answer: 'Completely free. We built this as a passion project for TV enthusiasts who want deeper insights into the shows they love.',
    open: false
  }
])

const toggleFaq = (index) => {
  faqItems.value[index].open = !faqItems.value[index].open
}

// Features data
const features = [
  {
    title: 'Advanced Discovery',
    description: 'Filter by genre, rating, year, network, and more to find exactly what you\'re looking for.'
  },
  {
    title: 'Episode Insights',
    description: 'Visual breakdowns of episode ratings reveal quality patterns across entire series.'
  },
  {
    title: 'Personal Collections',
    description: 'Build and manage your watchlist with favorites tracking and progress states.'
  },
  {
    title: 'Trending Analysis',
    description: 'Stay current with real-time trending data and popularity metrics.'
  }
]

// Technology stack
const technologies = [
  { name: 'Nuxt', role: 'Framework' },
  { name: 'Vue 3', role: 'UI Layer' },
  { name: 'D3.js', role: 'Charts' },
  { name: 'Tailwind', role: 'Styling' },
  { name: 'Upstash', role: 'Caching' },
  { name: 'TMDB', role: 'Data' }
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">

    <!-- Main content -->
    <div class="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-16">

      <!-- Hero Section -->
      <header class="mb-12">
        <span class="mb-4 inline-block font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          About
        </span>
        <h1 class="font-serif text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text3xl lg:text-4xl" style="letter-spacing: -0.01em;">
          Explore television with depth and clarity
        </h1>
        <!-- <p class="mt-6 max-w-2xl font-body text-xl leading-relaxed text-text-secondary sm:text-lg">
          Built for viewers who want more than basic recommendations. Analyze shows, track what matters, and make informed viewing choices.
        </p> -->

        <p class="mt-6 max-w-2xl font-body text-xl leading-relaxed text-text-secondary sm:text-lg">
          TV Explorer was built as a personal project for exploring and tracking television series using structured data and metrics. Many discovery platforms emphasize films, while television series often receive less analytical attention. This application explores ways to present shows and viewing data more clearly, allowing you to make informed decisions about your next bingewatch.
        </p>

        
      </header>

      <!-- Features Section -->
      <!-- <section class="mb-12">
        <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
          <span class="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Features
          </span>
          <span class="font-mono text-xs text-text-subtle">
            04
          </span>
        </div>

        <div class="grid gap-8 sm:gap-10 md:grid-cols-2">
          <article
            v-for="(feature, index) in features"
            :key="index"
            class="group"
          >
            <span class="mb-2 block font-mono text-sm text-text-subtle">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="mb-2 text-lg font-medium text-text-primary transition-colors duration-200 group-hover:text-accent-400">
              {{ feature.title }}
            </h3>
            <p class="font-body text-sm leading-relaxed text-text-muted">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </section> -->

      <!-- Technology Section -->
      <section class="mb-12">
        <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
          <span class="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Technology
          </span>
          <span class="font-mono text-xs text-text-subtle">
            06
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          <div
            v-for="tech in technologies"
            :key="tech.name"
            class="group rounded border border-border px-4 py-3 transition-colors duration-200 hover:border-border-hover"
          >
            <span class="block text-sm font-medium text-text-primary">{{ tech.name }}</span>
            <span class="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-text-subtle">
              {{ tech.role }}
            </span>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="mb-12">
        <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
          <span class="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            FAQ
          </span>
          <span class="font-mono text-xs text-text-subtle">
            04
          </span>
        </div>

        <div class="divide-y divide-border-subtle">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="py-5"
          >
            <button
              @click="toggleFaq(index)"
              class="flex w-full items-start justify-between gap-4 text-left"
            >
              <div class="flex gap-4">
                <span class="font-mono text-sm text-text-subtle">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <span class="text-base font-medium text-text-primary">
                  {{ item.question }}
                </span>
              </div>
              <svg
                class="mt-1 h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200"
                :class="{ 'rotate-180': item.open }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="item.open"
              class="mt-3 pl-10 pr-8"
            >
              <p class="font-body text-sm leading-relaxed text-text-tertiary">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Attribution -->
      <footer class="border-t border-border-subtle pt-8">
        <p class="font-mono text-xs leading-relaxed text-text-subtle">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
          All show data, images, and metadata are provided by
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-tertiary underline underline-offset-2 transition-colors duration-200 hover:text-accent-400"
          >
            The Movie Database
          </a>.
        </p>
      </footer>

    </div>
  </div>
</template>

<style></style>
