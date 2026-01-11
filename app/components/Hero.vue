<script setup></script>

<template>

    <section v-if="1" class="w-full relative z-10">
            
        <!-- <div class="flex justify-center items-centers aspect-[4/3] bg-[url('https://image.tmdb.org/t/p/original/jvTeRgjFsp66xj8SWxhr7O2J4ud.jpg')] sm:aspect-[16/9] md:aspect-[26/9] lg:aspect-[36/9] bg-center bg-cover"> -->
        <div class="flex justify-center items-centers aspect-4/3 bg-[url('https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg')] sm:aspect-16/9 md:aspect-26/9 lg:aspect-36/9 bg-center bg-cover">
            <div class="absolute inset-0 bg-eigengrau-900/40"></div>
            <div
                xclass="flex flex-col mx-auto items-center text-center justify-center py-6 px-6 sm:max-w-6xl sm:py-10 md:py-12 lg:py-16"

                class="relative flex flex-col mx-auto items-center text-center justify-center py-6 px-12">

                
                    <h1
                        class="w-full font-bold tracking-tight text-3xl text-shadow-lg text-pretty text-white sm:text-4xl lg:text-5xl lg:max-w-5xl">
                        Discover your next favorite TV show
                    </h1>
                    <p
                        class="hidden mt-4 w-full font-medium text-lg text-shadow-lg text-pretty lg:text-xl text-white md:block md:max-w-lg  lg:max-w-xl">
                        Get a deep dive into ratings and insights of shows you love and are curious about.
                    </p>

                    <div class="mt-4 flex items-center justify-center gap-3 md:gap-6">
                        <a href="#" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 lg:px-4">Get started</a>
                        <a href="#" class="text-sm text-shadow-lg px-3 py-2 font-medium text-white rounded-md underline underline-offset-3 lg:px-4">Learn more <span aria-hidden="true">→</span></a>
                    </div>
            </div>
        </div>
    </section>

</template>

<style></style>