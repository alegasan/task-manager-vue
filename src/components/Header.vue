<script setup>

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },

})
</script>

<template>
    <header class="mb-6">
        <h1 class="text-3xl font-bold text-dark-text mb-1">{{ title }}</h1>
        <p v-if="description" class="text-dark-textSecondary">{{ description }}</p>
    </header>
</template>