<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';
import { useTaskStore } from '@/stores/tasks';
import { useToastStore } from '@/stores/toast';
import Alerts from '@/components/Alerts.vue';
import { Select } from '@/components/ui/select';

const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();
const toastStore = useToastStore();

const taskId = route.params.id;
const form = ref({
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
    priority: 'medium',
});

const errors = ref({});
const loading = ref(false);
const pageLoading = ref(true);

const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];

onMounted(async () => {
    try {
        const task = taskStore.tasks.find(t => t.id == taskId);
        if (task) {
            form.value = {
                title: task.title,
                description: task.description,
                due_date: task.due_date,
                status: task.status,
                priority: task.priority || 'medium',
            };
        }
    } catch (error) {
        toastStore.error('Error', 'Failed to load task');
    } finally {
        pageLoading.value = false;
    }
});

const handleBack = () => {
    router.back();
};

async function handleUpdateTask() {
    loading.value = true;
    errors.value = {};

    try {
        await taskStore.updateTask(taskId, form.value);
        loading.value = false;
        toastStore.success('Success', 'Task updated successfully!');
        setTimeout(() => {
            router.push('/tasks');
        }, 500);
    } catch (error) {
        loading.value = false;
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors;
            toastStore.error('Validation Error', 'Please check the form fields');
        } else {
            errors.value = { general: [error.response?.data?.message || 'Failed to update task'] };
            toastStore.error('Error', error.response?.data?.message || 'Failed to update task');
        }
    }
}

const resetForm = () => {
    const task = taskStore.tasks.find(t => t.id == taskId);
    if (task) {
        form.value = {
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            priority: task.priority || 'medium',
            status: task.status,
        };
    }
};
</script>


<template>
    <Sidebar>
        <Alerts :alerts="toastStore.toasts" :position="'bottom'" @remove="toastStore.removeToast" />
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Edit Task" description="Modify your task details" />
            </div>
            <div class="mt-6">
                <Button variant="ghost" type="button" @click="handleBack"
                    class="inline-flex items-center gap-1.5 rounded-full p-2 text-sm font-medium text-dark-textSecondary hover:bg-dark-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background cursor-pointer">
                    <ArrowLeft class="h-4 w-4" />
                    Back
                </Button>
            </div>

            <section>
                <div v-if="pageLoading" class="flex items-center justify-center py-12 mt-6">
                    <div class="flex flex-col items-center gap-4">
                        <div class="h-8 w-8 rounded-full border-4 border-dark-border border-t-blue-500 animate-spin"></div>
                        <p class="text-dark-textSecondary">Loading task...</p>
                    </div>
                </div>
                <form v-else @submit.prevent="handleUpdateTask">
                    <div class="bg-dark-surface border border-dark-border rounded-lg p-6 shadow-lg mt-6">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-dark-text mb-1">Title</label>
                            <input v-model="form.title" type="text" name="title" placeholder="Enter task title"
                                class="w-full rounded-md border border-dark-border bg-dark-surface px-3 py-2 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                required />
                            <InputError :error="errors.title ? errors.title[0] : ''" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-dark-text mb-1">Description</label>
                            <textarea v-model="form.description" name="description" placeholder="Enter task description"
                                class="w-full rounded-md border border-dark-border bg-dark-surface px-3 py-2 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                required></textarea>
                            <InputError :error="errors.description ? errors.description[0] : ''" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-dark-text mb-1">Due Date</label>
                            <input v-model="form.due_date" type="date" name="due_date"
                                class="w-full rounded-md border border-dark-border bg-dark-surface px-3 py-2 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                required />
                            <InputError :error="errors.due_date ? errors.due_date[0] : ''" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-dark-text mb-1">Status</label>
                            <Select
                                v-model="form.status"
                                :options="statusOptions"
                                @change="form.status = $event"
                            />
                            <InputError :error="errors.status ? errors.status[0] : ''" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-dark-text mb-1">Priority</label>
                            <Select
                                v-model="form.priority"
                                :options="priorityOptions"
                                @change="form.priority = $event"
                            />
                            <InputError :error="errors.priority ? errors.priority[0] : ''" />
                        </div>

                        <div class="flex justify-end gap-4">
                            <Button type="submit"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md text-sm font-medium shadow-md ring-1 ring-blue-400/30 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                                :disabled="loading">
                                {{ loading ? 'Updating...' : 'Update Task' }}
                            </Button>
                            <Button type="button" variant="ghost"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 rounded-md text-sm font-medium shadow-sm ring-1 ring-gray-700/30 cursor-pointer"
                                @click="resetForm">
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </Sidebar>
</template>