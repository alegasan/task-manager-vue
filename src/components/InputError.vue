<script setup>
const props = defineProps({
    error: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <div v-if="error" class="text-sm text-red-500 mt-1">
        {{ error }}
    </div>
</template> 
