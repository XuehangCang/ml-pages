<script setup lang="ts">
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
    <!-- Profile Header -->
    <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div class="relative group shrink-0">
        <div class="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
        <img 
          src="/logo.jpg" 
          alt="ML Pages" 
          class="relative w-40 h-40 rounded-full object-cover border-2 border-black bg-zinc-800"
        >
      </div>
      
      <div class="text-center md:text-left">
        <h1 class="text-4xl font-bold text-white mb-2">ML Pages</h1>
        <h2 class="text-xl text-green-400 font-mono mb-4">Minimal static homepage template</h2>
        <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-zinc-400">
          <a href="mailto:hello@example.com" class="flex items-center gap-2 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            hello@example.com
          </a>
          <a href="https://github.com/" target="_blank" class="flex items-center gap-2 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 1.5-3 1.5-3-1.5-3.5-1.5-3.5-3 .28-1.15.28-2.35 0-3.5A6 6 0 0 0 21 5c-3 0-6 2-6 5.5 0 1 .2 2.5 1 3.5a4.8 4.8 0 0 0-1 3.5v4"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Bio Section -->
    <section class="mb-16">
      <h3 class="text-2xl font-bold text-white mb-6">About Me</h3>
      <div class="prose prose-invert prose-lg text-zinc-400">
        <p class="mb-4">
          ML Pages is a minimal, static personal-site template designed for machine learning engineers.
          Use it to showcase <strong>models</strong>, <strong>datasets</strong>, and <strong>research notes</strong> with clean pages and readable Markdown.
        </p>
      </div>
    </section>

  </div>
</template>
