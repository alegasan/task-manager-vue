<script setup>
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  day: {
    type: Number,
    default: null
  },
  month: {
    type: String,
    default: ''
  },
  tasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    done: 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

const getStatusLabel = (status) => {
  return (status || 'pending').replace('_', ' ').charAt(0).toUpperCase() + (status || 'pending').replace('_', ' ').slice(1)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div @click="close" class="absolute inset-0 bg-black/90"></div>

    <!-- Modal -->
    <div class="relative bg-slate-900 border-2 border-blue-500 rounded-lg p-8 shadow-2xl max-w-lg w-full mx-4 max-h-96 overflow-y-auto z-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 pb-4 border-b-2 border-blue-500">
        <h2 class="text-2xl font-bold text-white">
          Tasks for {{ month }} {{ day }}
        </h2>
        <button
          @click="close"
          class="p-2 rounded-lg hover:bg-blue-500/20 text-white hover:text-blue-300 transition-colors">
          <X class="h-6 w-6" />
        </button>
      </div>

      <!-- Tasks List -->
      <div class="space-y-4">
        <div v-if="tasks.length === 0" class="text-center py-8">
          <p class="text-gray-300 text-lg">No tasks for this date</p>
        </div>

        <div v-for="task in tasks" :key="task.id" class="p-4 bg-slate-800 rounded-lg border-2 border-gray-700 hover:border-blue-400 transition-colors">
          <div class="flex items-start justify-between gap-3 mb-2">
            <h3 class="font-bold text-white text-lg">{{ task.title }}</h3>
            <span :class="`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(task.status)}`">
              {{ getStatusLabel(task.status) }}
            </span>
          </div>
          <p v-if="task.description" class="text-base text-gray-200 line-clamp-2">
            {{ task.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
