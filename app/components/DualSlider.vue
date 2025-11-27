<script setup>

import { computed } from 'vue';

const minVal = defineModel('minVal', {type: Number, default: 0})
const maxVal = defineModel('maxVal', {type: Number, default: 360})

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 360 },
  step: {type: Number, default: 10}
});

const TRACK_H = 6
const THUMB_HW = 12

const cssVars = computed(() => ({
  '--track-h': `${TRACK_H}px`,
  '--thumb-hw': `${THUMB_HW}px`,
  '--fill-min-percent': `${fillPercent.value.min}%`,
  '--fill-max-percent': `${fillPercent.value.max}%`
}))

const fillPercent = computed(() => {
  const minPercent = ((minVal.value - props.min) / (props.max - props.min)) * 100;
  const maxPercent = ((maxVal.value - props.min) / (props.max - props.min)) * 100;

  return { min: minPercent, max: maxPercent }
});

const onInputMin = () => {
  const gap = 20;
  if (minVal.value > maxVal.value - gap) {
    minVal.value = maxVal.value - gap;
  }
};

const onInputMax = () => {
  const gap = 20; 
  if (maxVal.value < minVal.value + gap) {
    maxVal.value = minVal.value + gap;
  }
};

</script>

<template>
  <div class="relative w-full" :style="[cssVars, { height: 'var(--track-h)' }]">
    <div class="absolute top-0 bottom-0 w-full rounded-md m-auto dual-slider-track" :style="cssVars"></div>
      <input 
        v-model.number="minVal"
        type="range" 
        :min="min" :max="max" 
        :step="step"
        :style="cssVars"
        class="dual-slider dual-slider-thumb"
        @input="onInputMin"        
      />
      <input 
        v-model.number="maxVal"   
        type="range" 
        :min="min" :max="max" 
        :step="step"
        @input="onInputMax"
        class="dual-slider dual-slider-thumb"
        :style="cssVars"
      />
  </div>
</template>

<style scoped>



.dual-slider::-webkit-slider-runnable-track {
  -webkit-appearance: none;
}

.dual-slider::-moz-range-track {
  -moz-appearance: none;
}

.dual-slider::-ms-track {
  appearance: none;
}

.dual-slider-track {
  height: var(--track-h);
  background: linear-gradient(to right, #d3d3d3 var(--fill-min-percent), #4F46E5 var(--fill-min-percent), #4F46E5 var(--fill-max-percent), #d3d3d3 var(--fill-max-percent))
}

.dual-slider {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
  z-index: 2;
}

.dual-slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  height: var(--thumb-hw);
  width: var(--thumb-hw);
  cursor: pointer;
  background-color: oklch(51.1% 0.262 276.966);
  border-radius: 50%;
}

.dual-slider-thumb::-moz-range-thumb {
  appearance: none;
  -webkit-appearance: none;
  pointer-events: auto;
  height: var(--thumb-hw);
  width: var(--thumb-hw);
  cursor: pointer;
  background-color: oklch(51.1% 0.262 276.966);
  border-radius: 50%;  
}

.dual-slider-thumb:active::-webkit-slider-thumb {
  background-color: #ffffff;
  border: 2px solid oklch(51.1% 0.262 276.966);
}

</style>