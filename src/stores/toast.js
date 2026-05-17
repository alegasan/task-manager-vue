import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let toastId = 0

  const addToast = (type, title, description, duration = 5000) => {
    const id = ++toastId
    toasts.value.push({ id, type, title, description })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const success = (title, description) => addToast('success', title, description)
  const error = (title, description) => addToast('error', title, description)
  const warning = (title, description) => addToast('warning', title, description)
  const info = (title, description) => addToast('info', title, description)

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
})
