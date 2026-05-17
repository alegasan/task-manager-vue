<script setup>
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-vue-next'

defineProps({
  alerts: {
    type: Array,
    required: false,
    default: () => [],
  },
  position: {
    type: String,
    required: false,
    default: 'top', // 'top' or 'bottom'
  },
})

defineEmits(['remove'])

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}
</script>

<template>
  <div
    v-if="alerts.length > 0"
    :class="[
      'space-y-4',
      position === 'bottom' && 'fixed bottom-6 right-6 z-50 w-full max-w-md',
    ]"  >
    <div v-for="alert in alerts" :key="alert.id" class="relative">
      <Alert :variant="alert.type === 'error' ? 'destructive' : 'default'" class="bg-black/80 border border-white/20 backdrop-blur">
        <component
          :is="iconMap[alert.type]"
          :class="[
            'h-4 w-4',
            {
              'text-green-600': alert.type === 'success',
              'text-red-600': alert.type === 'error',
              'text-yellow-600': alert.type === 'warning',
              'text-blue-600': alert.type === 'info',
            },
          ]"
        />
        <AlertTitle class="text-white">{{ alert.title }}</AlertTitle>
        <AlertDescription class="text-gray-300">{{ alert.description }}</AlertDescription>
        <button
          @click="$emit('remove', alert.id)"
          class="absolute right-4 top-4 text-white/60 hover:text-white"
        >
          ×
        </button>
      </Alert>
    </div>
  </div>
</template>
