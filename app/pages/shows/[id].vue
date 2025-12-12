<script setup>

definePageMeta({
    layout: 'default',
})

const route = useRoute()
const id = route.params.id
const { data: showData, error } = await useFetch(`/api/tmdb/shows/${id}`);


</script>

<template>
  <div class="relative w-full max-w-7xl mx-auto">
    
    <div class="w-full mx-auto absolute inset-0 z-[-10]">
      <div 
        class="aspect-21/9 w-full bg-center bg-cover"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${showData.backdrop})` }"
      >
          
            <div class="w-full h-full bg-[linear-gradient(90deg,#14181c_0%,rgba(20,24,28,0.986)_0.97%,rgba(20,24,28,0.945)_2.08%,rgba(20,24,28,0.883)_3.3%,rgba(20,24,28,0.803)_4.6%,rgba(20,24,28,0.711)_5.97%,rgba(20,24,28,0.61)_7.37%,rgba(20,24,28,0.504)_8.77%,rgba(20,24,28,0.398)_10.16%,rgba(20,24,28,0.296)_11.5%,rgba(20,24,28,0.203)_12.78%,rgba(20,24,28,0.122)_13.96%,rgba(20,24,28,0.059)_15.02%,rgba(20,24,28,0.016)_15.93%,rgba(20,24,28,0)_16.67%,rgba(20,24,28,0)_83.33%,rgba(20,24,28,0.016)_84.07%,rgba(20,24,28,0.059)_84.98%,rgba(20,24,28,0.122)_86.04%,rgba(20,24,28,0.203)_87.22%,rgba(20,24,28,0.296)_88.5%,rgba(20,24,28,0.398)_89.84%,rgba(20,24,28,0.504)_91.23%,rgba(20,24,28,0.61)_92.64%,rgba(20,24,28,0.711)_94.03%,rgba(20,24,28,0.803)_95.4%,rgba(20,24,28,0.883)_96.7%,rgba(20,24,28,0.945)_97.92%,rgba(20,24,28,0.986)_99.03%,#14181c_100%),linear-gradient(0deg,#14181c_0%,#14181c_21.48%,rgba(20,24,28,0.986)_23.64%,rgba(20,24,28,0.945)_26.1%,rgba(20,24,28,0.883)_28.81%,rgba(20,24,28,0.803)_31.71%,rgba(20,24,28,0.711)_34.74%,rgba(20,24,28,0.61)_37.85%,rgba(20,24,28,0.504)_40.97%,rgba(20,24,28,0.398)_44.06%,rgba(20,24,28,0.296)_47.05%,rgba(20,24,28,0.203)_49.88%,rgba(20,24,28,0.122)_52.5%,rgba(20,24,28,0.059)_54.85%,rgba(20,24,28,0.016)_56.88%,rgba(20,24,28,0)_58.52%)]">
            </div>
      </div>
    </div>
    
    <TvShowDetail
      class="mt-90"
      :show="showData"
    >
    </TvShowDetail>
      

    <!-- <div class="mt-12 w-full h-64 bg-amber-500"></div> -->
    <!-- <RatingChart /> -->
  </div>  
</template>

<style></style>