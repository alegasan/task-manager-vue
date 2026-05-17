<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['date-selected'])

const currentDate = ref(new Date())

const monthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const daysInMonth = computed(() => {
  return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).getDay()
})

const calendarDays = computed(() => {
  const days = []
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push(null)
  }
  
  // Days of month
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push(i)
  }
  
  return days
})

const getTasksForDate = (day) => {
  if (!day) return []
  
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const dayStr = String(day).padStart(2, '0')
  const dateString = `${year}-${month}-${dayStr}`
  
  return props.tasks.filter(task => {
    const taskDate = task.due_date?.split('T')[0]
    return taskDate === dateString
  })
}

const getStatusDots = (day) => {
  const tasksForDay = getTasksForDate(day)
  if (tasksForDay.length === 0) return []
  
  const statuses = {
    pending: 0,
    in_progress: 0,
    done: 0
  }
  
  tasksForDay.forEach(task => {
    statuses[task.status]++
  })
  
  return statuses
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

const selectDate = (day) => {
  if (day) {
    const tasksForDay = getTasksForDate(day)
    if (tasksForDay.length > 0) {
      emit('date-selected', { day, tasks: tasksForDay })
    }
  }
}

const isToday = (day) => {
  if (!day) return false
  const today = new Date()
  return (
    day === today.getDate() &&
    currentDate.value.getMonth() === today.getMonth() &&
    currentDate.value.getFullYear() === today.getFullYear()
  )
}
</script>

<template>
  <div class="bg-dark-surface border border-dark-border rounded-lg p-6 shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-dark-text">{{ monthYear }}</h2>
      <div class="flex items-center gap-2">
        <button
          @click="previousMonth"
          class="p-2 rounded-lg hover:bg-dark-bg text-dark-textSecondary hover:text-dark-text transition-colors">
          <ChevronLeft class="h-5 w-5" />
        </button>
        <button
          @click="nextMonth"
          class="p-2 rounded-lg hover:bg-dark-bg text-dark-textSecondary hover:text-dark-text transition-colors">
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center gap-6 mb-4 text-sm">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
        <span class="text-dark-textSecondary">Pending</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-blue-400"></div>
        <span class="text-dark-textSecondary">In Progress</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-green-400"></div>
        <span class="text-dark-textSecondary">Done</span>
      </div>
    </div>

    <!-- Weekdays -->
    <div class="grid grid-cols-7 gap-2 mb-2">
      <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-xs font-semibold text-dark-textSecondary py-2">
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        @click="selectDate(day)"
        :class="[
          'relative p-3 rounded-lg border min-h-20 flex flex-col justify-between',
          day ? 'bg-dark-bg border-dark-border/50 cursor-pointer hover:border-blue-500/50 transition-colors' : 'bg-transparent border-transparent',
          isToday(day) ? 'ring-2 ring-blue-500' : ''
        ]">
        <!-- Day Number -->
        <span v-if="day" class="text-sm font-medium text-dark-text">{{ day }}</span>

        <!-- Status Dots -->
        <div v-if="day" class="flex flex-wrap gap-1 mt-auto">
          <template v-if="getStatusDots(day).pending > 0">
            <div
              v-for="i in Math.min(getStatusDots(day).pending, 3)"
              :key="`pending-${i}`"
              class="w-1.5 h-1.5 rounded-full bg-yellow-400"
              :title="`${getStatusDots(day).pending} pending`">
            </div>
          </template>
          <template v-if="getStatusDots(day).in_progress > 0">
            <div
              v-for="i in Math.min(getStatusDots(day).in_progress, 3)"
              :key="`in_progress-${i}`"
              class="w-1.5 h-1.5 rounded-full bg-blue-400"
              :title="`${getStatusDots(day).in_progress} in progress`">
            </div>
          </template>
          <template v-if="getStatusDots(day).done > 0">
            <div
              v-for="i in Math.min(getStatusDots(day).done, 3)"
              :key="`done-${i}`"
              class="w-1.5 h-1.5 rounded-full bg-green-400"
              :title="`${getStatusDots(day).done} done`">
            </div>
          </template>

          <!-- Overflow indicator -->
          <span
            v-if="getTasksForDate(day).length > 3"
            class="text-xs text-dark-textSecondary font-medium">
            +{{ getTasksForDate(day).length - 3 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
