<script setup>

import { useRoute } from 'vue-router'
import { computed } from 'vue'


const route = useRoute()
const id = computed(() => route.params.id)

    // TV Show ID
    // Fetch data based on TV Show ID
    // Include backdrop, title, description, other relevant info
    // Ratings imported from imdb data api? data visualization


// Need to validate whether the ID is valid or not. Or need to set restrictions for random show id if user manually tries.

</script>

<template>
    <TvShowHeader />

</template>
<style></style>