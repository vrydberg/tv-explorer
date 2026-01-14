<script setup>

const props = defineProps(['label', 'value'])
const selectedVals = defineModel({ type: Array, default: [] })

</script>

<template>

  <div class="mb-2 flex gap-2">
    <div class="flex h-5 shrink-0 items-center">
      <div class="group grid size-4 grid-cols-1">
        <input
          v-model="selectedVals"
          class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-accent-500 checked:bg-accent-500 indeterminate:border-accent-500 indeterminate:bg-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" 
          type="checkbox"
          :value="value"
        />
        <svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25">
          <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-checked:opacity-100" />
          <path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-0 group-has-indeterminate:opacity-100" />
        </svg>
      </div>
    </div>
    <label class="text-sm lg:text-xs text-balance truncate text-gray-400">{{ label }}</label>
  </div>
</template>

<style></style>