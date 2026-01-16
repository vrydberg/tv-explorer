<script setup>

const props = defineProps({ mode: { type: String, required: true } })

const email = ref('')
const password = ref('')

const content = computed(() => {
  const isLogin = props.mode === 'login'
  return {
    heading: isLogin ? 'Login' : 'Get started',
    subheading: isLogin
      ? 'Sign in to access your watchlist and favorites'
      : 'Register to start tracking and creating collections',
    link: isLogin ? "Don't have an account?" : 'Already have an account?',
    linkAction: isLogin ? 'Register' : 'Login',
  }
})

</script>

<template>
  <div class="relative z-10 w-full max-w-sm">
    
    <div class="mb-8 text-center">
      <span class="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
        Account
      </span>
      <h1 class="font-serif text-3xl font-semibold tracking-tight text-text-primary">
        {{ content.heading }}
      </h1>
      <p class="mt-2 text-sm text-text-muted">
        {{ content.subheading }}
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent class="space-y-5">
      <!-- Email field -->
      <div>
        <label for="email" class="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          disabled
          placeholder="you@example.com"
          class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-subtle transition-colors duration-200 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label for="password" class="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          disabled
          placeholder="Enter your password"
          class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-subtle transition-colors duration-200 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        disabled
        class="group relative w-full overflow-hidden rounded-lg bg-surface-elevated px-4 py-3 text-sm font-medium text-text-muted transition-colors duration-200 disabled:cursor-not-allowed"
      >
        <span class="relative z-10">Coming Soon</span>
      </button>

      <!-- Divider -->
      <div class="relative py-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-border-subtle"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-background px-4 font-mono text-xs text-text-subtle">or</span>
        </div>
      </div>

      <!-- Register link -->
      <p class="text-center text-sm text-text-muted">
        {{ content.link }}
        <span class="text-text-tertiary cursor-not-allowed">{{ content.linkAction }}</span>
      </p>
    </form>

    <!-- Footer note -->
    <p class="mt-8 text-center font-mono text-xs text-text-subtle">
      Authentication features are in development
    </p>
  </div>

</template>
