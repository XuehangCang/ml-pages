<script setup lang="ts">
const colors = [
    { name: 'Void Black', hex: '#000000', class: 'bg-black border border-white/10' },
    { name: 'Starlight White', hex: '#FFFFFF', class: 'bg-white' },
    { name: 'Terminal Green', hex: '#4ade80', class: 'bg-green-400' },
    { name: 'Zinc 900', hex: '#18181b', class: 'bg-zinc-900' },
]
</script>

<template>
  <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
    <div class="flex items-end justify-between mb-12">
      <h2 class="text-3xl font-bold text-white">Brand Guidelines</h2>
      <div class="h-px flex-1 bg-zinc-800 ml-8"></div>
    </div>

    <div class="space-y-20">
        <!-- Logo Section -->
        <section>
            <h3 class="text-xl font-bold text-white mb-6">Logomark</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-8 md:p-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center">
                    <span class="text-2xl md:text-3xl font-bold tracking-tighter text-white">ML Pages</span>
                </div>
                <div class="p-8 md:p-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center">
                    <span class="text-2xl md:text-3xl font-bold tracking-tighter text-black">ML Pages</span>
                </div>
            </div>
        </section>

        <!-- Color Palette -->
        <section>
            <h3 class="text-xl font-bold text-white mb-6">Color Palette</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="color in colors" :key="color.name" class="space-y-3">
                    <div :class="[color.class, 'w-full aspect-square rounded-2xl shadow-lg']"></div>
                    <div>
                        <div class="font-medium text-white">{{ color.name }}</div>
                        <div class="text-sm text-zinc-500 font-mono">{{ color.hex }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Typography -->
        <section>
            <h3 class="text-xl font-bold text-white mb-6">Typography</h3>
            <div class="p-8 rounded-2xl bg-zinc-900 border border-white/5 space-y-8">
                <div class="border-b border-white/5 pb-8">
                    <div class="text-sm text-zinc-500 mb-2 font-mono">Primary Font</div>
                    <div class="text-4xl md:text-6xl font-bold text-white">Inter</div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div class="text-sm text-zinc-500 mb-4 font-mono">Weights</div>
                        <div class="space-y-4">
                            <div class="text-3xl font-light text-white">Light 300</div>
                            <div class="text-3xl font-normal text-white">Regular 400</div>
                            <div class="text-3xl font-medium text-white">Medium 500</div>
                            <div class="text-3xl font-bold text-white">Bold 700</div>
                        </div>
                    </div>
                    <div>
                        <div class="text-sm text-zinc-500 mb-4 font-mono">Usage</div>
                        <p class="text-xl leading-relaxed text-zinc-300">
                            The quick brown fox jumps over the lazy dog. 
                            <span class="text-green-400">Minimal pages, maximum clarity.</span>
                            Ship your work with ML Pages.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </div>
</template>
