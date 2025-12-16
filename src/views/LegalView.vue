<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const type = computed(() => route.params.type as string)

const titles: Record<string, string> = {
    terms: 'User Terms',
    privacy: 'Privacy Policy',
    usage: 'Usage Policy'
}

const content: Record<string, string> = {
    terms: `
## 1. Introduction
Welcome to ML Pages. By accessing this website, you agree to be bound by these Terms of Service.

## 2. Intellectual Property
Unless otherwise stated, the content published on this site is provided as template/example material for ML Pages. Any third-party content remains the property of its respective owners.

## 3. Acceptable Use
As a user of our site, you agree to use our site legally, not to use our site for illegal purposes, and not to:
- Harass or mistreat other users of our site;
- Violate the rights of other users of our site;
- Violate the intellectual property rights of the site owners or any third party to the site;
- Hack into the account of another user of the site;
- Act in any way that could be considered fraudulent; or
- Post any material that may be deemed inappropriate or offensive.

## 4. Limitation of Liability
ML Pages is provided "as is" without warranties of any kind. We are not liable for any losses or damages arising from your use of the site.
    `,
    privacy: `
## 1. Data Collection
We may collect limited data necessary to improve your experience. This may include:
- Usage data (pages visited, time spent)
- Device information (browser type, operating system)

## 2. Use of Data
The data we collect is used to:
- Analyze website performance
- Improve site content and navigation
- Ensure site security

## 3. Third-Party Services
We may use third-party services for analytics or content delivery. These parties have access to your data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

## 4. Cookies
We use cookies to store information about your preferences and history. You can choose to disable cookies through your individual browser options.
    `,
    usage: `
## 1. API Usage
If this site provides any links to models, datasets, or APIs:
- You may not use the API for any illegal purpose.
- You must respect rate limits.
- You are responsible for complying with the license and attribution requirements of the linked resources.

## 2. Model Outputs
Any outputs or examples shown on this site are for demonstration purposes only. We do not guarantee accuracy or reliability.

## 3. Research Assets
Datasets and code referenced on this site may have different licenses. Please check individual repositories or documents for specific licensing terms.
    `
}

const currentTitle = computed(() => titles[type.value] || 'Legal')
const currentContent = computed(() => content[type.value] || 'Content not found.')

import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({ html: true })
const renderedContent = computed(() => md.render(currentContent.value))
</script>

<template>
    <div class="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
        <h1 class="text-4xl font-bold text-white mb-12">{{ currentTitle }}</h1>
        <div class="prose prose-invert prose-sm md:prose-lg max-w-none">
            <div v-html="renderedContent"></div>
        </div>
    </div>
</template>

<style>
.prose h2 {
    color: white;
    font-weight: 700;
    margin-top: 2em;
    margin-bottom: 1em;
    font-size: 1.5em;
}

.prose p {
    color: #a1a1aa;
    margin-bottom: 1em;
    line-height: 1.75;
}

.prose ul {
    list-style-type: disc;
    padding-left: 1.5em;
    color: #a1a1aa;
    margin-bottom: 1em;
}

.prose li {
    margin-bottom: 0.5em;
}
</style>