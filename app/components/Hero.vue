<script setup></script>

<template>

    <section v-if="1" class="w-full relative z-10">
            
        <div class="flex justify-center items-centers aspect-4/3 bg-[url('https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg')] sm:aspect-16/9 md:aspect-26/9 lg:aspect-36/9 bg-center bg-cover">
            <div class="absolute inset-0 bg-eigengrau-900/40"></div>
            <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent sm:h-40 lg:h-48"></div>

            <div
                class="relative flex flex-col mx-auto items-center text-center justify-center py-6 px-12">

                    <h1 class="w-full font-serif font-semibold tracking-tight text-4xl text-shadow-lg text-pretty text-text-primary sm:text-4xl md:text-5xl lg:text-6xl lg:max-w-4xl">
                        Discover your next favorite show
                    </h1>

                    <p class="hidden mt-4 w-full font-normal text-base text-shadow-lg text-pretty text-text-secondary md:block md:max-w-md lg:mt-5 lg:text-lg lg:max-w-lg">
                        Deep dive into ratings, insights, and discover what to watch next.
                    </p>

                    <div class="mt-6 flex items-center justify-center gap-4 sm:mt-8 md:gap-6">
                        <a href="#" class="relative inline-flex items-center gap-2 rounded-sm bg-accent-500 px-3 py-1.5 text-sm font-medium text-text-primary transition-all hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:px-4 sm:py-2">
                            <span>Explore</span>
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        <a href="#" class="text-sm text-shadow-lg px-3 py-2.5 font-medium text-text-primary transition-colors hover:text-text-secondary">
                            Learn more
                        </a>
                    </div>
            </div>
        </div>
    </section>

</template>
<style></style>