<script setup>

const model = defineModel({type: Number, default: 0})

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 10 },
  step: {type: Number, default: 1},
});

const SLIDER_H = 6
const THUMB_HW = 12

const fillPercent = computed(() => {
  const percent = ((model.value - props.min) / (props.max - props.min)) * 100;
  return percent
});

const cssVars = computed(() => ({
  '--slider-h': `${SLIDER_H}px`,
  '--thumb-hw': `${THUMB_HW}px`,
  '--fill-percent': `${fillPercent.value}%`,
}))

</script>

<template>
  <div class="w-full">
    <input 
        v-model.number="model"
        class="block w-full rounded-md slider slider-track slider-thumb"
        :style="cssVars"
        type="range"
        :min="min"
        :max="max"
        :step="step"
    />
  </div>
</template>



<style>

.slider-track::-webkit-slider-runnable-track {
  -webkit-appearance: none; 
}

.slider-track::-moz-range-track {
  -moz-appearance: none;
}

.slider-track::-ms-track {
  appearance: none;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  height: var(--slider-h) ;
  /* background: linear-gradient(to right, #4F46E5 var(--fill-percent), #d3d3d3 var(--fill-percent)) */
  background: linear-gradient(to right, #615fff var(--fill-percent), #d3d3d3 var(--fill-percent))
}

.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  height: var(--thumb-hw);
  width: var(--thumb-hw);
  cursor: pointer;
  /* background-color: oklch(51.1% 0.262 276.966); */
  background-color: oklch(58.5% 0.233 277.117);
  border-radius: 50%;
}

.slider-thumb::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: auto;
  height: var(--thumb-hw);
  width: var(--thumb-hw);
  cursor: pointer;
  /* background-color: oklch(51.1% 0.262 276.966); */
  background-color: oklch(58.5% 0.233 277.117);
  border-radius: 50%;
}

.slider-thumb:active::-webkit-slider-thumb {
  background-color: #ffffff;
  /* border: 2px solid oklch(51.1% 0.262 276.966); */
  border: 2px solid oklch(58.5% 0.233 277.117);
  
}

</style>

