<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const activeFilter = ref('')

const toggleFilter = (label: string) => {
    if (activeFilter.value === label) {
        activeFilter.value = ''
    } else {
        activeFilter.value = label
    }
}

const papers = [
    {
        id: 'building-high-quality-cot-datasets',
        title: 'Example Research Note: Writing Clear Model & Dataset Pages',
        conference: 'ML Pages',
        year: '2025',
        description: '示例内容：用于展示 Research 列表、标签与 Markdown 详情页渲染效果。',
        url: '#',
        tags: ['Example', 'Documentation', 'MLOps'],
        area: 'Example Area'
    },
]

const filteredPapers = computed(() => {
    if (!activeFilter.value) return papers
    return papers.filter(paper =>
        paper.area === activeFilter.value ||
        paper.year === activeFilter.value
    )
})

const areas = [
    {
        title: 'Research Areas',
        items: [
            { label: 'Example Area', count: 1 },
            { label: 'Placeholder', count: 0 },
        ]
    },
    {
        title: 'Years',
        items: [
            { label: '2025', count: 1 },
        ]
    }
]
</script>

<template>
    <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <div class="flex items-end justify-between mb-12">
            <h2 class="text-3xl font-bold text-white">Research</h2>
            <div class="h-px flex-1 bg-zinc-800 ml-8"></div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main Content: Papers List -->
            <div class="flex-1 space-y-6">
                <component v-for="paper in filteredPapers" :key="paper.title" :is="paper.id ? RouterLink : 'a'"
                    :to="paper.id ? `/research/${paper.id}` : undefined" :href="paper.id ? undefined : paper.url"
                    :target="paper.id ? undefined : '_blank'"
                    class="group block p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex gap-2">
                            <span
                                class="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">{{
                                    paper.conference }}</span>
                            <span class="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">{{
                                paper.year }}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="text-zinc-600 group-hover:text-white transition-colors">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors">{{
                        paper.title }}</h3>
                    <p class="text-zinc-400 text-sm leading-relaxed mb-4">{{ paper.description }}</p>
                    <div class="flex gap-2">
                        <span v-for="tag in paper.tags" :key="tag"
                            class="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">#{{ tag }}</span>
                    </div>
                </component>
            </div>

            <!-- Sidebar: Areas -->
            <aside class="w-full lg:w-64 shrink-0 space-y-8">
                <div v-for="area in areas" :key="area.title"
                    class="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <h3 class="font-bold text-white mb-4 flex items-center gap-2">
                        {{ area.title }}
                    </h3>
                    <div class="space-y-2">
                        <div v-for="item in area.items" :key="item.label" @click="toggleFilter(item.label)"
                            class="flex items-center justify-between text-sm cursor-pointer group transition-colors"
                            :class="activeFilter === item.label ? 'text-white' : 'text-zinc-400 hover:text-white'">
                            <span class="group-hover:underline decoration-zinc-600 underline-offset-4">{{ item.label
                            }}</span>
                            <span
                                class="text-xs bg-white/5 px-1.5 py-0.5 rounded text-zinc-500 group-hover:text-zinc-300">{{
                                    item.count }}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>
