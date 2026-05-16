<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

const router = useRouter()
const auth = useAuthStore()
</script>

<template>
    <Sidebar>
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Your Tasks" description="Organize and manage your daily tasks efficiently" />
        
                <div class="grid gap-6">
                    <div class="bg-dark-surface border border-dark-border rounded-lg p-6 shadow-lg">
                        <p class="text-dark-text">No tasks yet. Start by creating your first task!</p>
                    </div>
                </div>
            </div>
        </main>
    </Sidebar>
</template>