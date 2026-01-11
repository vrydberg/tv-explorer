<script setup>

import { ref } from 'vue';
import tvIcon from '~/assets/images/icons/tv.png';

const route = useRoute()

const isOpen = ref(false)
const toggleNav = () => {
    isOpen.value = !isOpen.value
}

</script>

<template>    
  <!-- <nav class="relative bg-eigengrau-900 z-50 text-white w-full py-3 px-4 sm:px-6 lg:px-8"> -->
  <nav
    class="relative z-50 text-white w-full py-3 px-4 sm:px-6 lg:px-8"
    :class="route.path.startsWith('/shows/')  ? 'md:bg-transparent bg-eigengrau-900' : 'bg-eigengrau-900'"    
  >
    <div 
      class="w-full mx-auto flex justify-between items-center flex-wrap max-w-7xl">
      
      <NuxtLink
        to="/"
        class="flex items-center gap-3">
        <img :src="tvIcon" alt="TV Explorer App" class="pb-1 h-7 w-auto"/>
        <span class="text-lg self-center font-semibold">Banana Stand</span>
      </NuxtLink>
        
        
      <button 
        type="button"
        class="inline-flex items-center mouse-pointer cursor-pointer p-1 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-controls="navbar-default"
        aria-expanded="false"
        @click="toggleNav"
      >
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>

      <div 
        :class="
          ['absolute top-full left-0 right-0 z-50 md:px-0 md:pb-0  w-full md:block md:static md:w-auto bg-eigengrau-900 md:bg-transparent',
          isOpen ? 'block' : 'hidden'
          ]   
        " >
        <ul class="text-sm md:text-base font-base md:font-medium tracking-wide flex flex-col p-4 md:p-0 gap-1 border-0 border-eigengrau-800 rounded-sm 
                    md:flex-row md:gap-8 md:mt-0 md:border-0">
          <li>
            <NuxtLink
              to="/"
              :class="[
                  'block py-2 px-3 md:bg-transparent md:p-0',
                  $route.path === '/' ? 'bg-indigo-500 md:text-indigo-500 border-b border-b-indigo-500' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-500'
              ]"
              aria-current="page"
              @click="toggleNav"
              >Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/explorer"
              :class="[
                  'block py-2 px-3  md:bg-transparent md:p-0',
                  $route.path === '/explorer' ? 'bg-indigo-500 md:text-indigo-500 border-b border-b-indigo-500' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-500'
              ]"
              aria-current="page"
              @click="toggleNav"
              >Explorer
            </NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink
              to="/favorites"
              :class="[
                  'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                  $route.path === '/favorites' ? 'bg-indigo-500 md:text-indigo-500 border-b border-b-indigo-500' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-500'
              ]"
              aria-current="page">Favorites
            </NuxtLink>
          </li> -->
          <!-- <li>
            <NuxtLink
              to="/about"
              :class="[
                  'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                  $route.path === '/about' ? 'bg-indigo-500 md:text-indigo-500 border-b border-b-indigo-500' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-500'
              ]"
              aria-current="page">About
            </NuxtLink>
          </li>                     -->
        </ul>
      </div>            
    </div>
  </nav>
</template>

<style></style>