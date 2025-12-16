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

const models = [
    {
        id: 'nebula-7b',
        name: 'Example Model A',
        description: '示例内容：用于展示模型列表卡片与详情页排版。',
        tags: ['Example', 'NLP', 'Transformer'],
        url: '#',
        task: 'Text Generation',
        library: 'PyTorch',
        language: 'English'
    },
    {
        id: 'vision-x',
        name: 'Example Model B',
        description: '示例内容：用于展示标签、筛选与跳转行为。',
        tags: ['Example', 'CV', 'Image'],
        url: '#',
        task: 'Object Detection',
        library: 'TensorFlow',
        language: 'Multilingual'
    },
    {
        id: 'audio-flow',
        name: 'Example Model C',
        description: '示例内容：用于展示不同任务/库/语言字段。',
        tags: ['Example', 'Audio', 'TTS'],
        url: '#',
        task: 'Speech Synthesis',
        library: 'JAX',
        language: 'English'
    },
    {
        id: 'nebula-7b-2',
        name: 'Example Model D',
        description: '示例内容：用于展示重复/多版本条目场景。',
        tags: ['Example', 'NLP', 'Reasoning'],
        url: '#',
        task: 'Text Generation',
        library: 'Safetensors',
        language: 'Chinese'
    },
    {
        id: 'vision-x-2',
        name: 'Example Model E',
        description: '示例内容：用于展示筛选条件组合。',
        tags: ['Example', 'CV', 'Classification'],
        url: '#',
        task: 'Image Classification',
        library: 'PyTorch',
        language: 'English'
    },
    {
        id: 'audio-flow-2',
        name: 'Example Model F',
        description: '示例内容：用于展示详情页 Markdown 渲染。',
        tags: ['Example', 'Audio', 'Generative'],
        url: '#',
        task: 'Speech Synthesis',
        library: 'PyTorch',
        language: 'Multilingual'
    }
]

const filteredModels = computed(() => {
    if (!activeFilter.value) return models
    return models.filter(model => 
        model.task === activeFilter.value ||
        model.library === activeFilter.value ||
        model.language === activeFilter.value ||
        model.tags.includes(activeFilter.value)
    )
})

const categories = [
    {
        title: 'Tasks',
        items: [
            { label: 'Text Generation', count: 2 },
            { label: 'Image Classification', count: 1 },
            { label: 'Object Detection', count: 1 },
            { label: 'Speech Synthesis', count: 2 }
        ]
    },
    {
        title: 'Libraries',
        items: [
            { label: 'PyTorch', count: 3 },
            { label: 'TensorFlow', count: 1 },
            { label: 'JAX', count: 1 },
            { label: 'Safetensors', count: 1 }
        ]
    },
    {
        title: 'Languages',
        items: [
            { label: 'English', count: 3 },
            { label: 'Chinese', count: 1 },
            { label: 'Multilingual', count: 2 }
        ]
    }
]
</script>

<template>
    <div class="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <div class="flex items-end justify-between mb-12">
            <h2 class="text-3xl font-bold text-white">Models</h2>
            <div class="h-px flex-1 bg-zinc-800 ml-8"></div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main Content: Model List -->
            <div class="flex-1">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <router-link v-for="model in filteredModels" :key="model.id"
                        :to="{ name: 'model-detail', params: { id: model.id } }"
                        class="group p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 block">
                        <div class="mb-4 flex flex-wrap gap-2">
                            <span v-for="tag in model.tags" :key="tag"
                                class="text-xs px-2 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                                {{ tag }}
                            </span>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">{{
                            model.name }}
                        </h3>
                        <p class="text-zinc-400 text-sm leading-relaxed">{{ model.description }}</p>
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
