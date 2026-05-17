<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue'
import { Clock, Play, Check, Flame, AlertCircle, ChevronDown } from 'lucide-vue-next'
import Calendar from '@/components/Calendar.vue';
import CalendarModal from '@/components/CalendarModal.vue';
import { useTaskStore } from '@/stores/tasks';

const router = useRouter();
const taskStore = useTaskStore();

const selectedDateData = ref(null);
const showCalendarModal = ref(false);

onMounted(async () => {
    await taskStore.fetchTasks();
});

const pendingCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.status === 'pending').length : 0
);

const inProgressCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.status === 'in_progress').length : 0
);

const doneCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.status === 'done').length : 0
);

const highPriorityCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.priority === 'high').length : 0
);

const mediumPriorityCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.priority === 'medium').length : 0
);

const lowPriorityCount = computed(() =>
    Array.isArray(taskStore.tasks) ? taskStore.tasks.filter(t => t.priority === 'low').length : 0
);

const handleViewDetails = (taskId) => {
    router.push(`/ShowTask/${taskId}`);
};

const handleDateSelected = (data) => {
    selectedDateData.value = data;
    showCalendarModal.value = true;
};

const closeCalendarModal = () => {
    showCalendarModal.value = false;
    selectedDateData.value = null;
};

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
                                <p class="text-2xl font-semibold text-dark-text">{{ doneCount }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mt-6 max-w-6xl">
                <h3 class="text-lg font-semibold text-dark-text mb-4">Tasks by Priority</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        class="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border border-red-500/30 bg-red-500/10">
                                <Flame class="h-5 w-5 text-red-400" />
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-dark-text">High Priority</h4>
                                <p class="text-2xl font-semibold text-dark-text">{{ highPriorityCount }}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border border-yellow-500/30 bg-yellow-500/10">
                                <AlertCircle class="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-dark-text">Medium Priority</h4>
                                <p class="text-2xl font-semibold text-dark-text">{{ mediumPriorityCount }}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-full flex items-center justify-center border border-green-500/30 bg-green-500/10">
                                <ChevronDown class="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-dark-text">Low Priority</h4>
                                <p class="text-2xl font-semibold text-dark-text">{{ lowPriorityCount }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mt-8 max-w-6xl">
                <h2 class="text-xl font-semibold text-dark-text mb-4">Task Calendar</h2>
                <Calendar 
                    :tasks="taskStore.tasks"
                    @date-selected="handleDateSelected" />
            </section>

            <section class="mt-8 max-w-6xl">
                <div class="grid gap-6">
                    <div v-if="taskStore.loading" class="text-center py-8">
                        <p class="text-dark-textSecondary">Loading tasks...</p>
                    </div>
                    <div v-else-if="taskStore.tasks.length === 0" class="text-center py-8">
                        <p class="text-dark-textSecondary">No tasks yet. Create one to get started!</p>
                    </div>
                </div>
            </section>
        </main>
        <CalendarModal
            :is-open="showCalendarModal"
            :day="selectedDateData?.day"
            :month="new Date().toLocaleDateString('en-US', { month: 'long' })"
            :tasks="selectedDateData?.tasks || []"
            @close="closeCalendarModal" />
    </Sidebar>
</template>