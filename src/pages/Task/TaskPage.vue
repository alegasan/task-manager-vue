<script setup>
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Alerts from '@/components/Alerts.vue'

const router = useRouter()
const auth = useAuthStore()
const toastStore = useToastStore()
</script>

<template>
    <Sidebar>
        <Alerts :alerts="toastStore.toasts" :position="'bottom'" @remove="toastStore.removeToast" />
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Your Tasks" description="Organize and manage your daily tasks efficiently" />
        
                <div class="grid gap-6">
                    <div class="bg-dark-surface border border-dark-border rounded-lg p-6 shadow-lg">
                        <div class="flex items-center justify-between gap-4 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center border border-dark-border/60 bg-white/5">
                                    <Plus class="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-dark-text">Get Started</h3>
                                    <p class="text-sm text-dark-textSecondary">Create your first task and stay organized!</p>
                                </div>
                            </div>

                            <RouterLink
                                to="/CreateTask"
                                class="inline-flex items-center gap-2 rounded-full border border-dark-border/60 bg-transparent px-4 py-2 text-sm font-normal text-dark-textSecondary shadow-none hover:border-dark-border hover:bg-white/5 hover:text-dark-text cursor-pointer"
                            >
                                <Plus class="h-4 w-4" />
                                Create Task
                            </RouterLink>                        </div>
                    </div>
                </div>
            </div>
        </main>
    </Sidebar>
</template>