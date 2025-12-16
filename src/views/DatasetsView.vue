<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref('')

const toggleFilter = (label: string) => {
    if (activeFilter.value === label) {
        activeFilter.value = ''
    } else {
        activeFilter.value = label
    }
}

const datasets = [
    {
        id: 'code-corpus-v1',
        name: 'Example Dataset A',
        size: '500GB',
        description: '示例内容：用于展示数据集卡片、尺寸徽标与详情页。',
        url: '#',
        task: 'Text Classification',
        sizeCategory: 'n>1M',
        language: 'English'
    },
    {
        id: 'global-weather-2024',
        name: 'Example Dataset B',
        size: '2TB',
        description: '示例内容：用于展示筛选项（任务/规模/语言）。',
        url: '#',
        task: 'Token Classification',
        sizeCategory: 'n>1M',
        language: 'Chinese'
    },
    {
        id: 'code-corpus-v1-2',
        name: 'Example Dataset C',
        size: '500GB',
        description: '示例内容：用于展示不同条目与相同尺寸的组合。',
        url: '#',
        task: 'Question Answering',
        sizeCategory: '100K<n<1M',
        language: 'French'
    },
    {
        id: 'global-weather-2024-2',
        name: 'Example Dataset D',
        size: '2TB',
        description: '示例内容：用于展示列表与详情路由的联动。',
        url: '#',
        task: 'Summarization',
        sizeCategory: '10K<n<100K',
        language: 'English'
    }
]

const filteredDatasets = computed(() => {
    if (!activeFilter.value) return datasets
    return datasets.filter(dataset => 
        dataset.task === activeFilter.value ||
        dataset.sizeCategory === activeFilter.value ||
        dataset.language === activeFilter.value
    )
})

const categories = [
    {
        title: 'Task Categories',
        items: [
            { label: 'Text Classification', count: 1 },
            { label: 'Token Classification', count: 1 },
            { label: 'Question Answering', count: 1 },
            { label: 'Summarization', count: 1 }
        ]
    },
    {
        title: 'Size Categories',
        items: [
            { label: '1K<n<10K', count: 0 },
            { label: '10K<n<100K', count: 1 },
            { label: '100K<n<1M', count: 1 },
            { label: 'n>1M', count: 2 }
        ]
    },
    {
        title: 'Languages',
        items: [
            { label: 'English', count: 2 },
            { label: 'Chinese', count: 1 },
            { label: 'French', count: 1 }
        ]
    }
]
</script>

<template>
    <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <div class="flex items-end justify-between mb-12">
            <h2 class="text-3xl font-bold text-white">Datasets</h2>
            <div class="h-px flex-1 bg-zinc-800 ml-8"></div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main Content: Dataset List -->
            <div class="flex-1">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <router-link v-for="dataset in filteredDatasets" :key="dataset.id"
                        :to="{ name: 'dataset-detail', params: { id: dataset.id } }"
                        class="group p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 block">
                        <div class="mb-4">
                            <span
                                class="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
                                {{ dataset.size }}
                            </span>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">{{
                            dataset.name }}</h3>
                        <p class="text-zinc-400 text-sm leading-relaxed">{{ dataset.description }}</p>
                    </router-link>
                </div>
            </div>

            <!-- Sidebar: Categories -->
            <aside class="w-full lg:w-64 shrink-0 space-y-8">
                <div v-for="category in categories" :key="category.title"
                    class="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                    <h3 class="font-bold text-white mb-4 flex items-center gap-2">
                        {{ category.title }}
                    </h3>
                    <div class="space-y-2">
                        <div v-for="item in category.items" :key="item.label"
                            @click="toggleFilter(item.label)"
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
