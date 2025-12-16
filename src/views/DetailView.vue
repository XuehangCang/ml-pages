<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
            } catch (__) {}
        }
        return ''; // use external default escaping
    }
})

md.use(markdownItKatex)

const content = ref('')
const loading = ref(true)
const error = ref('')

// Load markdown files from src/content
// using ?raw to get the string content
const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' })

const loadContent = async () => {
    loading.value = true
    error.value = ''
    const id = route.params.id as string

    // Construct the path key for the glob object
    const path = `../content/${id}.md`

    if (path in modules) {
        try {
            const mod = await modules[path]()
            content.value = md.render(mod as string)
        } catch (e) {
            error.value = 'Failed to load document.'
            console.error(e)
        }
    } else {
        error.value = 'Document not found.'
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
    <div class="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-white">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
        </div>

        <div v-else-if="error" class="text-center py-20">
            <h2 class="text-2xl font-bold text-red-400 mb-4">Error</h2>
            <p class="text-zinc-400">{{ error }}</p>
            <button @click="router.back()"
                class="mt-8 px-6 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                Go Back
            </button>
        </div>

        <div v-else>
            <button @click="router.back()"
                class="mb-8 flex items-center text-zinc-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back
            </button>

            <article class="prose prose-invert prose-sm md:prose-lg max-w-none">
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
</style>
