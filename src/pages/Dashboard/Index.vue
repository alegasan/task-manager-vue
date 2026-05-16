<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
    <Sidebar>
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Welcome to TaskHub" description="Your personal task management dashboard" />
        
                <div class="grid gap-6">
                    <div class="bg-dark-surface border border-dark-border rounded-lg p-6 shadow-lg">
                        <p class="text-dark-text">Get started by creating your first task!</p>
                    </div>
                </div>
            </div>
        </main>
    </Sidebar>
</template>