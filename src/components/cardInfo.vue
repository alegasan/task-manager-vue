<script setup>
</script>

<template>
    <div class="bg-dark-surface border border-dark-border rounded-lg p-6 shadow-lg flex items-center justify-between">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-accent rounded-full flex items-center justify-center">
                <slot name="icon"></slot>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-dark-text"><slot name="title"></slot></h3>
                <p class="text-sm text-dark-textSecondary"><slot name="description"></slot></p>
            </div>
        </div>

        <div>
            <slot name="action"></slot>
        </div>
    </div>
</template>