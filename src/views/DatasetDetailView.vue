<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
// @ts-ignore
import markdownItKatex from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

const route = useRoute()
const router = useRouter()
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }
        return ''; // use external default escaping
    }
})

md.use(markdownItKatex)

const content = ref('')
const loading = ref(true)
const error = ref('')

const datasetMetadataById: Record<
    string,
    { name: string; license: string; size: string; tags: string[]; lastUpdated: string; url: string }
> = {
    'code-corpus-v1': {
        name: 'Example Dataset A',
        license: 'MIT',
        size: '500GB',
        tags: ['Example', 'Text', 'Code'],
        lastUpdated: '1 week ago',
        url: '#'
    },
    'global-weather-2024': {
        name: 'Example Dataset B',
        license: 'MIT',
        size: '2TB',
        tags: ['Example', 'Vision', 'Time Series'],
        lastUpdated: '2 weeks ago',
        url: '#'
    },
    'code-corpus-v1-2': {
        name: 'Example Dataset C',
        license: 'MIT',
        size: '500GB',
        tags: ['Example', 'Q&A', 'Multilingual'],
        lastUpdated: '1 month ago',
        url: '#'
    },
    'global-weather-2024-2': {
        name: 'Example Dataset D',
        license: 'MIT',
        size: '2TB',
        tags: ['Example', 'Summarization', 'English'],
        lastUpdated: '2 months ago',
        url: '#'
    },
}

// Mock metadata based on ID
const metadata = computed(() => {
    const id = route.params.id as string
    const mapped = datasetMetadataById[id]
    if (mapped) return mapped
    return {
        name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        license: 'MIT',
        size: '—',
        tags: ['Example'],
        lastUpdated: 'Recently',
        url: '#'
    }
})

// Load markdown files from src/content
const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' })

const loadContent = async () => {
    loading.value = true
    error.value = ''
    const id = route.params.id as string
    const path = `../content/${id}.md`

    if (path in modules) {
        try {
            const mod = await modules[path]()
            content.value = md.render(mod as string)
        } catch (e) {
            error.value = 'Failed to load dataset details.'
            console.error(e)
        }
    } else {
        error.value = 'Dataset details not found.'
    }
    loading.value = false
}

onMounted(() => {
    loadContent()
})

watch(() => route.params.id, () => {
    loadContent()
})
</script>

<template>
    <div class="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
        <!-- Ambient Background -->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-[120px] -z-10 pointer-events-none">
        </div>

        <div class="max-w-4xl mx-auto px-6">
            <!-- Navigation -->
            <button @click="router.back()"
                class="mb-12 flex items-center text-zinc-500 hover:text-white transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-2 group-hover:-translate-x-1 transition-transform">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Datasets
            </button>

            <!-- Header Section -->
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mb-6">
                    <span>Dataset</span>
                    <span class="w-1 h-1 rounded-full bg-zinc-600"></span>
                    <span>{{ metadata.size }}</span>
                </div>

                <h1
                    class="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    {{ metadata.name }}
                </h1>

                <div class="flex flex-wrap justify-center gap-2 mb-8">
                    <span v-for="tag in metadata.tags" :key="tag"
                        class="px-3 py-1 rounded-full text-sm bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {{ tag }}
                    </span>
                </div>

                <div class="flex justify-center gap-4">
                    <a :href="metadata.url" target="_blank"
                        class="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
                        <span>Download Dataset</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Divider -->
            <div class="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-16"></div>

            <!-- Content -->
            <div v-if="loading" class="flex justify-center py-20">
                <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
            </div>

            <div v-else-if="error" class="text-center py-20">
                <p class="text-red-400 mb-4">{{ error }}</p>
            </div>

            <article v-else class="prose prose-invert prose-lg max-w-none">
                <div v-html="content"></div>
            </article>
        </div>
    </div>
</template>

<style>
/* Add some basic styling for the markdown content if tailwind typography isn't enough or installed */
.prose h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: white;
}

.prose h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: white;
    border-bottom-width: 1px;
    border-color: rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
}

.prose h3 {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: white;
}

.prose p {
    margin-bottom: 1.5rem;
    color: #d4d4d8;
    line-height: 1.625;
}

.prose ul {
    list-style-type: disc;
    padding-left: 1.625rem;
    margin-bottom: 1.5rem;
    color: #d4d4d8;
}

.prose ol {
    list-style-type: decimal;
    padding-left: 1.625rem;
    margin-bottom: 1.5rem;
    color: #d4d4d8;
}

.prose li {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.prose li > ul,
.prose li > ol {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.prose code {
    background-color: #27272a;
    padding-left: 0.375rem;
    padding-right: 0.375rem;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    border-radius: 0.25rem;
    color: #4ade80;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.prose pre {
    background-color: #18181b;
    padding: 1.5rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    margin-bottom: 2rem;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.05);
}

.prose pre code {
    background-color: transparent;
    padding: 0;
    color: #d4d4d8;
}

.prose blockquote {
    border-left-width: 4px;
    border-color: #4ade80;
    padding-left: 1.5rem;
    font-style: italic;
    color: #a1a1aa;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.prose blockquote p:last-child {
    margin-bottom: 0;
}

.prose img {
    border-radius: 0.5rem;
    max-width: 100%;
    height: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.prose table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    margin-bottom: 2rem;
}

.prose th {
    border-bottom-width: 1px;
    border-color: rgba(255, 255, 255, 0.1);
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: 700;
    color: white;
}

.prose td {
    border-bottom-width: 1px;
    border-color: rgba(255, 255, 255, 0.05);
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #a1a1aa;
}

.prose a {
    color: #4ade80;
}

.prose a:hover {
    text-decoration: underline;
}

.prose strong {
    color: white;
    font-weight: 600;
}

.prose hr {
    border-color: rgba(255, 255, 255, 0.1);
    margin-top: 3rem;
    margin-bottom: 3rem;
    border-top-width: 1px;
}
</style>
