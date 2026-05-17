<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import { Plus, Search, Trash2, Edit2, Calendar, ChevronLeft, ChevronRight, Eye } from 'lucide-vue-next'
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
const selectedPriority = ref('')
const confirmDialog = ref(null)
const taskToDelete = ref(null)
const currentPage = ref(1)
let searchTimeout = null
const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
]

const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
]

onMounted(() => {
    loadTasks()
})

// Debounced live search
watch(searchQuery, (newQuery) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        taskStore.setSearch(newQuery)
        currentPage.value = 1
        await taskStore.fetchTasks(1)
    }, 300)
})

const loadTasks = async () => {
    try {
        await taskStore.fetchTasks()
    } catch (error) {
        toastStore.error('Error', 'Failed to load tasks')
    }
}

const handleFilterStatus = async (status) => {
    selectedStatus.value = status
    taskStore.setStatus(status)
    currentPage.value = 1
    await taskStore.fetchTasks(1)
}

const handleFilterPriority = async (priority) => {
    selectedPriority.value = priority
    taskStore.setPriority(priority)
    currentPage.value = 1
    await taskStore.fetchTasks(1)
}

const handlePageChange = async (page) => {
    currentPage.value = page
    await taskStore.fetchTasks(page)
}

const totalPages = computed(() => {
    return taskStore.pagination?.last_page || 1
})

const canGoPrevious = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

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
        done: 'bg-green-500/20 text-green-400 border-green-500/30',
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

const getPriorityColor = (priority) => {
    const colors = {
        high: 'bg-red-500/20 text-red-400 border-red-500/30',
        medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        low: 'bg-green-500/20 text-green-400 border-green-500/30',
    }
    return colors[priority] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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
               
                    <div class="md:col-span-6">
                        <div class="relative">
                            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-textSecondary" />
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search tasks by title or description..."
                                class="w-full pl-10 pr-4 py-2.5 bg-dark-surface border border-dark-border rounded-lg text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>

               
                    <div class="md:col-span-3">
                        <Select
                            :model-value="selectedStatus"
                            :options="statusOptions"
                            @change="handleFilterStatus" />
                    </div>

                    <div class="md:col-span-3">
                        <Select
                            :model-value="selectedPriority"
                            :options="priorityOptions"
                            @change="handleFilterPriority" />
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

        
                <div v-else class="grid gap-4 mb-8">
                    <div v-for="task in taskStore.tasks" :key="task.id"
                        @click="router.push(`/ShowTask/${task.id}`)"
                        class="bg-dark-surface border border-dark-border rounded-lg p-5 cursor-pointer group">
                        <div class="flex items-start justify-between gap-4 mb-3">
                            <div class="flex-1 min-w-0">
                                <h3 class="text-lg font-semibold text-dark-text mb-1 truncate group-hover:text-blue-400 transition-colors">{{ task.title }}</h3>
                                <p class="text-sm text-dark-textSecondary truncate">{{ task.description?.substring(0, 60) || 'No description' }}{{ task.description?.length > 60 ? '...' : '' }}</p>
                            </div>
                            <div class="flex gap-2">
                                <span :class="`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`">
                                    {{ (task.priority || 'medium').charAt(0).toUpperCase() + (task.priority || 'medium').slice(1) }}
                                </span>
                                <span :class="`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`">
                                    {{ (task.status || 'pending').replace('_', ' ') }}
                                </span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-dark-border/30">
                            <div class="flex items-center gap-2 text-sm text-dark-textSecondary">
                                <Calendar class="h-4 w-4" />
                                <span>{{ formatDate(task.due_date) }}</span>
                            </div>
                            <div class="flex items-center gap-2" @click.stop>
                                <button
                                    @click="router.push(`/ShowTask/${task.id}`)"
                                    class="p-2 rounded-lg hover:bg-blue-500/10 text-dark-textSecondary hover:text-blue-400 transition-colors">
                                    <Eye class="h-4 w-4" />
                                </button>
                                <button
                                    v-if="task.status !== 'done'"
                                    @click="router.push(`/EditTask/${task.id}`)"
                                    class="p-2 rounded-lg hover:bg-white/5 text-dark-textSecondary hover:text-dark-text transition-colors">
                                    <Edit2 class="h-4 w-4" />
                                </button>
                                <button
                                    v-if="task.status !== 'done'"
                                    @click="handleDeleteTask(task.id)"
                                    class="p-2 rounded-lg hover:bg-red-500/10 text-dark-textSecondary hover:text-red-400 transition-colors">
                                    <Trash2 class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

              
                <div v-if="taskStore.tasks.length > 0 && totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
                    <button
                        @click="handlePageChange(currentPage - 1)"
                        :disabled="!canGoPrevious"
                        class="p-2 rounded-lg border border-dark-border hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-dark-border transition-colors">
                        <ChevronLeft class="h-4 w-4 text-dark-textSecondary" />
                    </button>

                    <div class="flex items-center gap-1">
                        <button
                            v-for="page in totalPages"
                            :key="page"
                            @click="handlePageChange(page)"
                            :class="[
                                'min-w-10 h-10 rounded-lg border transition-colors font-medium text-sm',
                                currentPage === page
                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                    : 'border-dark-border text-dark-textSecondary hover:border-blue-500/50 hover:text-dark-text'
                            ]">
                            {{ page }}
                        </button>
                    </div>

                    <button
                        @click="handlePageChange(currentPage + 1)"
                        :disabled="!canGoNext"
                        class="p-2 rounded-lg border border-dark-border hover:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-dark-border transition-colors">
                        <ChevronRight class="h-4 w-4 text-dark-textSecondary" />
                    </button>
                </div>
            </div>
        </main>
    </Sidebar>
</template>