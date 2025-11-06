<script setup>

import { ref } from 'vue';

const isOpen = ref(false)
const toggleNav = () => {
    isOpen.value = !isOpen.value
}
    
// }
</script>




<template>
    <nav class="bg-steel-900 relative text-steel-100 w-full py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14">
        <div 
            class="w-full mx-auto flex justify-between items-center flex-wrap max-w-6xl">
            
            <a href="" class="flex items-center gap-3">
                <img src="/src/components/icons/tv.png" alt="TV Explorer App" class="pb-1 h-8 w-auto"/>
                <span class="text-lg self-center font-semibold text-steel-100">Banana Stand</span>
            </a>
            
            <button 
                type="button"
                class="inline-flex items-center mouse-pointer cursor-pointer p-1 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
                @click="toggleNav"
            >
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <!-- add hidden below -->

            <div 
                :class="
                    ['absolute bg-steel-900 top-full left-0 right-0 z-50 px-6 pb-6 md:px-0 md:pb-0  w-full md:block md:static md:w-auto',
                    isOpen ? 'block' : 'hidden'
                    ]   
                " >
                <ul class="text-sm font-medium flex flex-col p-4 md:p-0 gap-1 border border-steel-100 rounded-sm 
                           md:flex-row md:gap-8 md:mt-0 md:border-0">
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/' ? 'bg-violet-500 md:text-violet-500' : 'text-steel-100 hover:bg-steel-600 md:hover:bg-transparent md:hover:text-violet-500'
                            ]"
                            aria-current="page">Home
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/explorer' ? 'bg-sky md:text-sky' : 'text-steel-100 hover:bg-steel-600 md:hover:bg-transparent md:hover:text-sky'
                            ]"
                            aria-current="page">Explorer
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/favorites' ? 'bg-sky md:text-sky' : 'text-steel-100 hover:bg-steel-600 md:hover:bg-transparent md:hover:text-sky'
                            ]"
                            aria-current="page">Favorites
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            :class="[
                                'block py-2 px-3 rounded-sm md:bg-transparent md:p-0',
                                $route.path === '/about' ? 'bg-sky md:text-sky' : 'text-steel-100 hover:bg-steel-600 md:hover:bg-transparent md:hover:text-sky'
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