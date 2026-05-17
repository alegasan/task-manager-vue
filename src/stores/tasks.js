import { defineStore } from 'pinia'
import api from '@/services/api'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        loading: false,
        pagination: null,
        filters: {
            search: '',
            status: '',
            sortBy: 'created_at',
            sortOrder: 'desc',
            perPage: 5,
        },
    }),

    actions: {
        async createTask(taskData) {
            const response = await api.post('/tasks', taskData)
            return response.data
        },
        async fetchTasks(page = 1) {
            this.loading = true
            try {
                const params = {
                    page,
                    per_page: this.filters.perPage,
                    sort_by: this.filters.sortBy,
                    sort_order: this.filters.sortOrder,
                }

                if (this.filters.search) {
                    params.search = this.filters.search
                }
                if (this.filters.status) {
                    params.status = this.filters.status
                }

                const response = await api.get('/tasks', { params })
                this.tasks = Array.isArray(response.data) ? response.data : (response.data?.data || [])
                if (response.data?.meta) {
                    this.pagination = response.data.meta
                }
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

        setSearch(search) {
            this.filters.search = search
        },

        setStatus(status) {
            this.filters.status = status
        },

        setSortBy(field, direction) {
            this.filters.sortBy = field
            this.filters.sortOrder = direction
        },
    },
})
