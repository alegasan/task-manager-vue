import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
    },

    actions: {
        async register(form) {
            const response = await api.post('/register', form)
            this.token = response.data.token
            this.user  = response.data.user
            localStorage.setItem('token', this.token)
        },

        async login(form) {
            const response = await api.post('/login', form)
            this.token = response.data.token
            this.user  = response.data.user
            localStorage.setItem('token', this.token)
        },

        async logout() {
            await api.post('/logout')
            this.token = null
            this.user  = null
            localStorage.removeItem('token')
        },

        async fetchUser() {
            const response = await api.get('/me')
            this.user = response.data
        },
    },
})