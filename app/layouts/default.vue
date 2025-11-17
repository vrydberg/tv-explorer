<script setup lang="ts">
import Footer from '~/components/Footer.vue';
import Navbar from '~/components/Navbar.vue';

</script>

<template>
	<div class="relative min-h-screen flex flex-col">
		<Navbar />
			<main class="flex flex-1 flex-col">
				<slot />
			</main>
		<Footer />
	</div>
	
</template>

<style></style>