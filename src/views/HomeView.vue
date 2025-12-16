<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <!-- Gradient Background Elements -->
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none">
        </div>

        <h1
            class="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent custom-gradient-text">
            ML Pages
        </h1>
        <p class="text-2xl md:text-4xl font-light text-zinc-400 mb-10">
            A minimal static homepage template for ML engineers
        </p>

        <div class="flex gap-4">
            <RouterLink to="/models"
                class="px-6 py-3 bg-green-400 text-black rounded-full font-medium shadow-lg hover:bg-green-500 transition-colors">
                Explore Models
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.custom-gradient-text {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>