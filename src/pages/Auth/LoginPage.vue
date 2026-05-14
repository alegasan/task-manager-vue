<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth   = useAuthStore()

const form = ref({
    email:    '',
    password: '',
})

const errors  = ref({})
const loading = ref(false)

async function handleLogin() {
    loading.value = true
    errors.value  = {}

    try {
        await auth.login(form.value)
        router.push('/tasks')
    } catch (error) {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors
        } else if (error.response?.status === 401) {
            errors.value = { email: ['Invalid credentials'] }
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg w-full max-w-md shadow-md">
            <h2 class="text-center mb-6 text-2xl font-bold">Login</h2>

            <div class="mb-4 flex flex-col gap-1">
                <label class="font-semibold text-sm">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                    class="px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
                <span v-if="errors.email" class="text-red-600 text-xs">
                    {{ errors.email[0] }}
                </span>
            </div>

            <div class="mb-4 flex flex-col gap-1">
                <label class="font-semibold text-sm">Password</label>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                    class="px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
                <span v-if="errors.password" class="text-red-600 text-xs">
                    {{ errors.password[0] }}
                </span>
            </div>

            <button
                @click="handleLogin"
                :disabled="loading"
                class="w-full py-3 bg-indigo-600 text-white border-none rounded-md text-base cursor-pointer mt-1 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors duration-300"
            >
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>

            <p class="text-center mt-4 text-sm">
                No account? 
                <RouterLink to="/register" class="text-indigo-600 hover:text-indigo-800 font-semibold">Register here</RouterLink>
            </p>
        </div>
    </div>
</template>