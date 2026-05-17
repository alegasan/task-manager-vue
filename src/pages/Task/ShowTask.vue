<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Calendar, Badge } from 'lucide-vue-next'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { Button } from '@/components/ui/button'
import { useTaskStore } from '@/stores/tasks'
import { useToastStore } from '@/stores/toast'
import Alerts from '@/components/Alerts.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()
const toastStore = useToastStore()

const taskId = route.params.id
const task = ref(null)
const loading = ref(true)
const confirmDialog = ref(null)

onMounted(async () => {
  try {
    if (taskStore.tasks.length === 0) {
      await taskStore.fetchTasks()
    }
    
    const foundTask = taskStore.tasks.find(t => t.id == taskId)
    if (foundTask) {
      task.value = foundTask
    } else {
      toastStore.error('Error', 'Task not found')
    }
  } catch (error) {
    toastStore.error('Error', 'Failed to load task')
  } finally {
    loading.value = false
  }
})

const handleBack = () => {
  router.back()
}

const handleEdit = () => {
  router.push(`/EditTask/${taskId}`)
}

const handleDelete = () => {
  confirmDialog.value?.openDialog()
}

const handleConfirmDelete = async () => {
  try {
    await taskStore.deleteTask(taskId)
    toastStore.success('Success', 'Task deleted successfully!')
    confirmDialog.value?.closeDialog()
    setTimeout(() => {
      router.push('/tasks')
    }, 500)
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

const formatDate = (date) => {
  if (!date) return 'No due date'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusLabel = (status) => {
  return (status || 'pending').replace('_', ' ').charAt(0).toUpperCase() + (status || 'pending').replace('_', ' ').slice(1)
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
      <div class="max-w-full">
        <Header title="Task Details" description="View complete task information" />
      </div>

      <div class="mt-6">
        <Button
          variant="ghost"
          type="button"
          @click="handleBack"
          class="inline-flex items-center gap-1.5 rounded-full p-2 text-sm font-medium text-dark-textSecondary hover:bg-dark-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background cursor-pointer"
        >
          <ArrowLeft class="h-4 w-4" />
          Back
        </Button>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-12 mt-6">
        <div class="flex flex-col items-center gap-4">
          <div class="h-8 w-8 rounded-full border-4 border-dark-border border-t-blue-500 animate-spin"></div>
          <p class="text-dark-textSecondary">Loading task...</p>
        </div>
      </div>

      <div v-else-if="!task" class="mt-6 bg-dark-surface border border-dark-border rounded-lg p-8 text-center">
        <div class="flex flex-col items-center gap-4">
          <div class="h-12 w-12 rounded-full bg-white/5 border border-dark-border/60 flex items-center justify-center">
            <Badge class="h-6 w-6 text-dark-textSecondary" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-dark-text mb-2">Task not found</h3>
            <p class="text-dark-textSecondary">The task you're looking for doesn't exist</p>
          </div>
        </div>
      </div>

      <div v-else class="mt-6 max-w-full">
        <div class="bg-dark-surface border border-dark-border rounded-lg p-8 shadow-lg">
          <!-- Task Header -->
          <div class="mb-8">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-dark-text mb-2">{{ task.title }}</h1>
                <span :class="`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`">
                  {{ getStatusLabel(task.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Task Details -->
          <div class="space-y-6 mb-8">
            <!-- Description -->
            <div>
              <h2 class="text-lg font-semibold text-dark-text mb-3">Description</h2>
              <div class="p-4 bg-dark-bg rounded-lg border border-dark-border/50">
                <p class="text-dark-textSecondary leading-relaxed whitespace-pre-wrap break-words">
                  {{ task.description || 'No description provided' }}
                </p>
              </div>
            </div>

            <!-- Due Date -->
            <div class="flex items-center gap-4 p-4 bg-dark-bg rounded-lg border border-dark-border/50">
              <Calendar class="h-5 w-5 text-blue-400" />
              <div>
                <p class="text-sm text-dark-textSecondary">Due Date</p>
                <p class="text-lg font-semibold text-dark-text">{{ formatDate(task.due_date) }}</p>
              </div>
            </div>

            <!-- Status Info -->
            <div class="p-4 bg-dark-bg rounded-lg border border-dark-border/50">
              <p class="text-sm text-dark-textSecondary mb-2">Status</p>
              <div class="flex items-center gap-2">
                <div
                  class="h-3 w-3 rounded-full"
                  :class="{
                    'bg-yellow-400': task.status === 'pending',
                    'bg-blue-400': task.status === 'in_progress',
                    'bg-green-400': task.status === 'done',
                  }"
                ></div>
                <p class="font-semibold text-dark-text">{{ getStatusLabel(task.status) }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 pt-6 border-t border-dark-border/30">
            <Button
              @click="handleEdit"
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md text-sm font-medium shadow-md ring-1 ring-blue-400/30 cursor-pointer"
            >
              Edit Task
            </Button>
            <Button
              type="button"
              @click="handleDelete"
              class="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md text-sm font-medium border border-red-500/30 cursor-pointer"
            >
              Delete Task
            </Button>
          </div>
        </div>
      </div>
    </main>
  </Sidebar>
</template>
