<script setup>

const rating = ref(0)

const stars = computed(() => {
  const displayedRating = rating.value
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

</script>

<template>
  <div class="flex flex-col gap-4">
    
    <div class="flex items-center justify-between">
      <label class="text-sm font-medium" for="ratings">Rating</label>
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
    
    <div class="flex gap-4 items-center">
      <p class="flex text-xs font-medium gap-2">>= <span>{{ rating }}</span></p>
      <input 
          v-model="rating"
          class="flex-1 w-full accent-indigo-600 slider-thumb"  type="range" id="ratings" name="ratings" min="0" max="10" step="1" list="rating-markers"
      />
    </div>
  </div>
</template>

<style></style>