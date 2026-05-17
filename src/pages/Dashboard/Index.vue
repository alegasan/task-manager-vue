<script setup>
import { onMounted, computed } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue'
import Button from '@/components/ui/button/Button.vue';
import { Clock, Play, Check } from 'lucide-vue-next'
import CardInfo from '@/components/cardInfo.vue';
import { useTaskStore } from '@/stores/tasks';

const taskStore = useTaskStore();

onMounted(async () => {
    await taskStore.fetchTasks();
});

const pendingCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.status === 'pending').length : 0
);

const inProgressCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.status === 'in_progress').length : 0
);

const completedCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.status === 'completed').length : 0
);

</script>

<template>
    <Sidebar>
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Welcome to TaskHub" description="Your personal task management dashboard" />
            </div>

            <section class="mt-6 max-w-6xl">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        class="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border border-dark-border/60 bg-white/5">
                                <Clock class="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-dark-text">Pending</h4>
                                <p class="text-2xl font-semibold text-dark-text">{{ pendingCount }}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm"
                            class="rounded-full border border-dark-border/60 bg-transparent px-3 py-1 text-xs font-normal text-dark-textSecondary shadow-none hover:border-dark-border hover:bg-white/5 hover:text-dark-text">
                            View
                        </Button>
                    </div>

                    <div
                        class="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border border-dark-border/60 bg-white/5">
                                <Play class="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-dark-text">In Progress</h4>
                                <p class="text-2xl font-semibold text-dark-text">{{ inProgressCount }}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm"
                            class="rounded-full border border-dark-border/60 bg-transparent px-3 py-1 text-xs font-normal text-dark-textSecondary shadow-none hover:border-dark-border hover:bg-white/5 hover:text-dark-text">
                            View
                        </Button>
                    </div>

                    <div
                        class="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border border-dark-border/60 bg-white/5">
                                <Check class="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-dark-text">Done</h4>
                                <p class="text-2xl font-semibold text-dark-text">{{ completedCount }}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm"
                            class="rounded-full border border-dark-border/60 bg-transparent px-3 py-1 text-xs font-normal text-dark-textSecondary shadow-none hover:border-dark-border hover:bg-white/5 hover:text-dark-text">
                            View
                        </Button>
                    </div>
                </div>
            </section>

            <section class="mt-8 max-w-6xl">
                <h2 class="text-xl font-semibold text-dark-text mb-4">Your Tasks</h2>
                <div class="grid gap-6">
                    <div v-if="taskStore.loading" class="text-center py-8">
                        <p class="text-dark-textSecondary">Loading tasks...</p>
                    </div>
                    <div v-else-if="taskStore.tasks.length === 0" class="text-center py-8">
                        <p class="text-dark-textSecondary">No tasks yet. Create one to get started!</p>
                    </div>
                    <CardInfo v-for="task in taskStore.tasks" :key="task.id">
                        <template #title>{{ task.title }}</template>
                        <template #description>{{ task.description }}</template>
                        <template #action>
                            <Button
                                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                                View Details
                            </Button>
                        </template>
                    </CardInfo>
                </div>
            </section>
        </main>
    </Sidebar>
</template>