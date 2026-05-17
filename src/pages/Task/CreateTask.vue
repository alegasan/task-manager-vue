<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import InputError from '@/components/InputError.vue'
import { useTaskStore } from '@/stores/tasks'
import { useToastStore } from '@/stores/toast'

const router = useRouter()
const taskStore = useTaskStore()
const toastStore = useToastStore()

const form = ref({
    title: '',
    description: '',
    due_date: '',
})

const errors = ref({})
const loading = ref(false)

async function handleCreateTask() {
    loading.value = true
    errors.value = {}

    try {
        await taskStore.createTask(form.value)
        loading.value = false
        toastStore.success('Success', 'Task created successfully!')
        setTimeout(() => {
            router.push('/tasks')
        }, 500)
    } catch (error) {
        loading.value = false
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors
            toastStore.error('Validation Error', 'Please check the form fields')
        } else {
            errors.value = { general: [error.response?.data?.message || 'Failed to create task'] }
            toastStore.error('Error', error.response?.data?.message || 'Failed to create task')
        }
    }
}
const resetForm = () => {
    form.value = {
        title: '',
        description: '',
        due_date: '',
    }
}
</script>

<template>
    <Sidebar>
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Create New Task" description="Fill in the details to create a new task" />
            </div>
            <div class="mt-6">
                <Button variant="ghost" type="button" @click="router.back()"
                    class="inline-flex items-center gap-1.5 rounded-full p-2 text-sm font-medium text-dark-textSecondary hover:bg-dark-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background cursor-pointer">
                    <ArrowLeft class="h-4 w-4" />
                    Back
                </Button>
            </div>

            <section>
                <form @submit.prevent="handleCreateTask">
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
                        <div class="flex justify-end gap-4">
                            <Button type="submit"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md text-sm font-medium shadow-md ring-1 ring-blue-400/30 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                                :disabled="loading">
                                {{ loading ? 'Creating...' : 'Create Task' }}
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