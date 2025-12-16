<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, watch } from 'vue'

const isMenuOpen = ref(false)

// Prevent scrolling when menu is open
watch(isMenuOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <nav class="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-black/50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink to="/" class="text-xl font-bold tracking-tighter text-white z-50 relative" @click="isMenuOpen = false">ML Pages</RouterLink>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
        <RouterLink to="/models" class="hover:text-white transition-colors" active-class="text-white">Models</RouterLink>
        <RouterLink to="/datasets" class="hover:text-white transition-colors" active-class="text-white">Datasets</RouterLink>
        <RouterLink to="/research" class="hover:text-white transition-colors" active-class="text-white">Research</RouterLink>
        <RouterLink to="/about" class="hover:text-white transition-colors" active-class="text-white">About</RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white z-50 relative p-2">
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMenuOpen" class="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-start pt-32 gap-8 md:hidden overflow-y-auto">
            <RouterLink to="/models" class="text-2xl font-bold text-zinc-400 hover:text-white transition-colors" active-class="text-white" @click="isMenuOpen = false">Models</RouterLink>
            <RouterLink to="/datasets" class="text-2xl font-bold text-zinc-400 hover:text-white transition-colors" active-class="text-white" @click="isMenuOpen = false">Datasets</RouterLink>
            <RouterLink to="/research" class="text-2xl font-bold text-zinc-400 hover:text-white transition-colors" active-class="text-white" @click="isMenuOpen = false">Research</RouterLink>
            <RouterLink to="/brand" class="text-2xl font-bold text-zinc-400 hover:text-white transition-colors" active-class="text-white" @click="isMenuOpen = false">Brand</RouterLink>
            <RouterLink to="/about" class="text-2xl font-bold text-zinc-400 hover:text-white transition-colors" active-class="text-white" @click="isMenuOpen = false">About</RouterLink>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>
