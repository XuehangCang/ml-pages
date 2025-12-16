<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <div class="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black font-sans">
        <NavBar />
        <RouterView />
        <!-- Footer -->
        <footer class="py-12 border-t border-white/5 bg-black">
            <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="text-zinc-600 text-sm">
                    &copy; 2025 ML Pages. All rights reserved.
                </div>
                <div class="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
                    <RouterLink to="/brand" class="hover:text-zinc-300 transition-colors">Brand</RouterLink>
                    <RouterLink to="/legal/terms" class="hover:text-zinc-300 transition-colors">User Terms</RouterLink>
                    <RouterLink to="/legal/privacy" class="hover:text-zinc-300 transition-colors">Privacy Policy
                    </RouterLink>
                    <RouterLink to="/legal/usage" class="hover:text-zinc-300 transition-colors">Usage Policy
                    </RouterLink>
                </div>
            </div>
        </footer>
    </div>
</template>

<style>
/* Custom scrollbar for a cleaner look */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #000;
}

::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
