<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { Plus, Search, Trash2, Edit2, Calendar } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useTaskStore } from '@/stores/tasks'
import { Select } from '@/components/ui/select'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Alerts from '@/components/Alerts.vue'

const router = useRouter()
const auth = useAuthStore()
const toastStore = useToastStore()
const taskStore = useTaskStore()

const searchQuery = ref('')
const selectedStatus = ref('')
const confirmDialog = ref(null)
const taskToDelete = ref(null)
const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
]

onMounted(() => {
    loadTasks()
})

const loadTasks = async () => {
    try {
        await taskStore.fetchTasks()
    } catch (error) {
        toastStore.addToast({
            message: 'Failed to load tasks',
            type: 'error',
        })
    }
}

const handleSearch = async () => {
    taskStore.setSearch(searchQuery.value)
    await taskStore.fetchTasks(1)
}

const handleFilterStatus = async (status) => {
    selectedStatus.value = status
    taskStore.setStatus(status)
    await taskStore.fetchTasks(1)
}

const handleDeleteTask = async (id) => {
    taskToDelete.value = id
    confirmDialog.value?.openDialog()
}

const handleConfirmDelete = async () => {
    if (!taskToDelete.value) return
    
    try {
        await taskStore.deleteTask(taskToDelete.value)
        toastStore.success('Success', 'Task deleted successfully!')
        confirmDialog.value?.closeDialog()
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete task'
        toastStore.error('Error', errorMessage)
        console.error('Delete error details:', error.response?.data)
    }
}

const getStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        completed: 'bg-green-500/20 text-green-400 border-green-500/30',
        cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

const formatDate = (date) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
</script>

<template>
    <Sidebar>
        <Alerts :alerts="toastStore.toasts" :position="'bottom'" @remove="toastStore.removeToast" />
        <ConfirmDialog
            ref="confirmDialog"
            title="Delete Task"
            description="Are you sure you want to delete this task? This action cannot be undone."
            @confirm="handleConfirmDelete" />
        <main class="p-6 md:p-8">
            <div class="max-w-6xl">
                <Header title="Your Tasks" description="Organize and manage your daily tasks efficiently" />

              
                <div class="grid gap-4 mb-6 md:grid-cols-12">
               
                    <div class="md:col-span-8">
                        <div class="relative">
                            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-textSecondary" />
                            <input
                                v-model="searchQuery"
                                @keyup.enter="handleSearch"
                                type="text"
                                placeholder="Search tasks by title or description..."
                                class="w-full pl-10 pr-4 py-2.5 bg-dark-surface border border-dark-border rounded-lg text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>

               
                    <div class="md:col-span-4">
                        <Select
                            :model-value="selectedStatus"
                            :options="statusOptions"
                            @change="handleFilterStatus" />
                    </div>
                </div>

              
                <div class="mb-6">
                    <RouterLink to="/CreateTask"
                        class="inline-flex items-center gap-2 rounded-lg border border-blue-500/50 bg-blue-500/10 px-4 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/20 hover:border-blue-500 transition-colors">
                        <Plus class="h-4 w-4" />
                        Create New Task
                    </RouterLink>
                </div>

              
                <div v-if="taskStore.loading" class="flex items-center justify-center py-12">
                    <div class="flex flex-col items-center gap-4">
                        <div class="h-8 w-8 rounded-full border-4 border-dark-border border-t-blue-500 animate-spin"></div>
                        <p class="text-dark-textSecondary">Loading tasks...</p>
                    </div>
                </div>

                <div v-else-if="taskStore.tasks.length === 0" class="bg-dark-surface border border-dark-border rounded-lg p-8 text-center">
                    <div class="flex flex-col items-center gap-4">
                        <div class="h-12 w-12 rounded-full bg-white/5 border border-dark-border/60 flex items-center justify-center">
                            <Plus class="h-6 w-6 text-dark-textSecondary" />
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-dark-text mb-2">No tasks found</h3>
                            <p class="text-dark-textSecondary mb-4">{{ searchQuery || selectedStatus ? 'Try adjusting your search or filters' : 'Create your first task to get started' }}</p>
                        </div>
                    </div>
                </div>

        
                <div v-else class="grid gap-4">
                    <div v-for="task in taskStore.tasks" :key="task.id"
                        class="bg-dark-surface border border-dark-border rounded-lg p-5 hover:border-dark-border/80 transition-colors">
                        <div class="flex items-start justify-between gap-4 mb-3">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-dark-text mb-1">{{ task.title }}</h3>
                                <p class="text-sm text-dark-textSecondary line-clamp-2">{{ task.description || 'No description' }}</p>
                            </div>
                            <span :class="`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`">
                                {{ (task.status || 'pending').replace('_', ' ') }}
                            </span>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-dark-border/30">
                            <div class="flex items-center gap-2 text-sm text-dark-textSecondary">
                                <Calendar class="h-4 w-4" />
                                <span>{{ formatDate(task.due_date) }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <button
                                    @click="router.push(`/EditTask/${task.id}`)"
                                    class="p-2 rounded-lg hover:bg-white/5 text-dark-textSecondary hover:text-dark-text transition-colors">
                                    <Edit2 class="h-4 w-4" />
                                </button>
                                <button
                                    @click="handleDeleteTask(task.id)"
                                    class="p-2 rounded-lg hover:bg-red-500/10 text-dark-textSecondary hover:text-red-400 transition-colors">
                                    <Trash2 class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </Sidebar>
</template>