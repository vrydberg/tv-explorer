<script setup>

// import backdrop from '@/assets/posters/bug.jpg'


// const backdrop = ref('')
const backdrop = ref('/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg')

// '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg'

</script>

<template>

    <!--  Below is ultrawide but doesnt really work tbh -->
    <section class="relative w-full z-10">
            
        <div class="flex justify-center items-centers aspect-[4/3] bg-[url('https://image.tmdb.org/t/p/original/jvTeRgjFsp66xj8SWxhr7O2J4ud.jpg')] sm:aspect-[16/9] md:aspect-[26/9] lg:aspect-[36/9] bg-center bg-cover">
        <!-- <div class="flex justify-center items-centers  aspect-[4/3] bg-[url('https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg')] sm:aspect-[16/9] md:aspect[21/9] lg:aspect-[32/9] bg-center bg-cover"> -->
            <!-- /56v2KjBlU4XaOv9rVYEQypROD7P.jpg -->
            <!-- <div class="absolute inset-0 [background-image:linear-gradient(90deg,#14181d_0,rgba(20,24,29,0.985565)_0.97%,rgba(20,24,29,0.945131)_2.07833%,rgba(20,24,29,0.883007)_3.29667%,rgba(20,24,29,0.803499)_4.60167%,rgba(20,24,29,0.710915)_5.96667%,rgba(20,24,29,0.609563)_7.365%,rgba(20,24,29,0.50375)_8.77167%,rgba(20,24,29,0.397784)_10.16%,rgba(20,24,29,0.295973)_11.505%,rgba(20,24,29,0.202624)_12.78%,rgba(20,24,29,0.122044)_13.95833%,rgba(20,24,29,0.0585423)_15.01667%,rgba(20,24,29,0.0164249)_15.92833%,rgba(20,24,29,0)_16.66667%,rgba(20,24,29,0)_83.33333%,rgba(20,24,29,0.0164249)_84.07167%,rgba(20,24,29,0.0585423)_84.98333%,rgba(20,24,29,0.122044)_86.04167%,rgba(20,24,29,0.202624)_87.22%,rgba(20,24,29,0.295973)_88.495%,rgba(20,24,29,0.397784)_89.84%,rgba(20,24,29,0.50375)_91.22833%,rgba(20,24,29,0.609563)_92.635%,rgba(20,24,29,0.710915)_94.03333%,rgba(20,24,29,0.803499)_95.39833%,rgba(20,24,29,0.883007)_96.70333%,rgba(20,24,29,0.945131)_97.92167%,rgba(20,24,29,0.985565)_99.03%,#14181d),linear-gradient(0deg,#14181d_0,#14181d_8%,rgba(20,24,29,0.985565)_10%,rgba(20,24,29,0.945131)_12.5%,rgba(20,24,29,0.883007)_15%,rgba(20,24,29,0.803499)_17.5%,rgba(20,24,29,0.710915)_20%,rgba(20,24,29,0.609563)_23%,rgba(20,24,29,0.50375)_26%,rgba(20,24,29,0.397784)_29%,rgba(20,24,29,0.295973)_32%,rgba(20,24,29,0.202624)_35%,rgba(20,24,29,0.122044)_38%,rgba(20,24,29,0.0585423)_41%,rgba(20,24,29,0.0164249)_44%,rgba(20,24,29,0)_47%)]"></div> -->
            
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
                        <a href="#" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:px-4">Get started</a>
                        <a href="#" class="text-sm text-shadow-lg px-3 py-2 font-medium text-white rounded-md underline underline-offset-3 lg:px-4">Learn more <span aria-hidden="true">→</span></a>
                    </div>
            </div>
        </div>
    </section>
    
</template>

<style></style>