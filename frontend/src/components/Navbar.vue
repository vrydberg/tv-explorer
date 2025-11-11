<script setup>

import { ref } from 'vue';

const isOpen = ref(false)
const toggleNav = () => {
    isOpen.value = !isOpen.value
}

</script>


<template>
    <nav class="relative z-50 text-white w-full py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14">
        <div 
            class="w-full mx-auto flex justify-between items-center flex-wrap max-w-6xl">
            
            <a href="" class="flex items-center gap-3">
                <img src="/src/components/icons/tv.png" alt="TV Explorer App" class="pb-1 h-8 w-auto"/>
                <span class="text-lg self-center font-semibold">Banana Stand</span>
            </a>
            
            <button 
                type="button"
                class="inline-flex items-center mouse-pointer cursor-pointer p-1 justify-center text-sm text-eigengrau-700 rounded-lg md:hidden hover:bg-eigengrau-200 focus:outline-none focus:ring-2 focus:ring-eigengrau-200"
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
                    ['absolute bg-eigengrau-900 top-full left-0 right-0 z-50 px-6 pb-6 sm:px-8 md:px-0 md:pb-0  w-full md:block md:static md:w-auto',
                    isOpen ? 'block' : 'hidden'
                    ]   
                " >
                <ul class="text-sm font-medium flex flex-col p-4 md:p-0 gap-1 border-1 border-eigengrau-800 rounded-sm 
                           md:flex-row md:gap-8 md:mt-0 md:border-0">
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/' ? 'bg-indigo-600 md:text-indigo-600' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-600'
                            ]"
                            aria-current="page">Home
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/explorer' ? 'bg-indigo-600 md:text-indigo-600' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-600'
                            ]"
                            aria-current="page">Explorer
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/favorites' ? 'bg-indigo-600 md:text-indigo-600' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-600'
                            ]"
                            aria-current="page">Favorites
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/about' ? 'bg-indigo-600 md:text-indigo-600' : 'text-white hover:bg-eigengrau-700 md:hover:bg-transparent md:hover:text-indigo-600'
                            ]"
                            aria-current="page">About
                        </a>
                    </li>                    
                </ul>
            </div>            
        </div>
    </nav>
</template>

<style></style>