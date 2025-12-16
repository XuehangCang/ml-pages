<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 class="text-9xl font-bold text-white mb-4 tracking-tighter">404</h1>
        <div class="h-1 w-24 bg-green-500 mb-8"></div>
        <h2 class="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p class="text-zinc-400 max-w-md mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <RouterLink 
            to="/" 
            class="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors"
        >
            Return Home
        </RouterLink>
    </div>
</template>
