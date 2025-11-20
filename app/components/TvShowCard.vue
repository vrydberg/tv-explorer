<script setup>

const props = defineProps(['show', 'extraInfo'])

const rating = ref(props.show.rating)

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
    <div class="w-full">
        <div class="aspect-2/3">
            <img 
                    class="w-full h-full object-cover rounded-md cursor-pointer hover:border-3 hover:border-indigo-600"
                    :src="`https://image.tmdb.org/t/p/w500/${show.poster}`"
                    draggable="false"
                >
            
        </div>

        <div v-if="extraInfo" 
            class="flex flex-col mt-2 gap-1 items-start">
            <h3 class="w-full truncate font-medium text-sm">{{ show.title }}</h3>
            
            <div class="w-full flex gap-2">
                <div class="flex gap-1">

                    <RatingStar
                        v-for="(star, index) in stars"
                        :key=index
                        :type=star
                        class="h-3 w-3 text-indigo-600"
                        >
                    </RatingStar>
                </div>

                <p class="leading-none text-sm">{{ show.rating.toFixed(1) }}</p>

            </div>
            
        </div>
    </div>
</template>

<style></style>