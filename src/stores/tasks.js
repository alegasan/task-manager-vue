import { defineStore } from 'pinia'
import api from '@/services/api'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        loading: false,
    }),

    actions: {
        async createTask(taskData) {
            const response = await api.post('/tasks', taskData)
            this.tasks.push(response.data)
            return response.data
        },
        async fetchTasks() {
            this.loading = true
            try {
                const response = await api.get('/tasks')
                this.tasks = Array.isArray(response.data) ? response.data : (response.data?.data || [])
            } finally {
                this.loading = false
            }
        },

        async updateTask(id, taskData) {
            const response = await api.put(`/tasks/${id}`, taskData)
            const index = this.tasks.findIndex(task => task.id === id)
            if (index !== -1) {
                this.tasks[index] = response.data
            }
            return response.data
        },

        async deleteTask(id) {
            await api.delete(`/tasks/${id}`)
            this.tasks = this.tasks.filter(task => task.id !== id)
        },
    },
})
