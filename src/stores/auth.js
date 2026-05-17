import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
    },

    actions: {
        async register(form) {
            const response = await api.post('/register', form)
            this.token = response.data.token
            this.user = response.data.user
            localStorage.setItem('token', this.token)
            localStorage.setItem('user', JSON.stringify(this.user))
        },

        async login(form) {
            const response = await api.post('/login', form)
            this.token = response.data.token
            this.user = response.data.user
            localStorage.setItem('token', this.token)
            localStorage.setItem('user', JSON.stringify(this.user))
        },

        async logout() {
            await api.post('/logout')
            this.token = null
            this.user = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },

        async fetchUser() {
            const response = await api.get('/me')
            localStorage.setItem('user', JSON.stringify(this.user))
            this.user = response.data
        },
    },
})