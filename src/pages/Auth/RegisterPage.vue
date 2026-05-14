<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const errors = ref({})
const loading = ref(false)

async function handleRegister() {
    loading.value = true
    errors.value = {}

    try {
        await auth.register(form.value)
        router.push('/tasks')
    } catch (error) {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errors.value = { general: [error.response?.data?.message || 'Registration failed'] }
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-center mb-6 text-2xl font-bold text-gray-800">Register</h2>

            <div v-if="errors.general" class="bg-red-100 text-red-800 px-3 py-3 rounded mb-4">
                {{ errors.general[0] }}
            </div>

            <div class="mb-4">
                <label class="block mb-2 font-semibold text-gray-800">Name</label>
                <input
                    v-model="form.name"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full px-3 py-2 border border-gray-300 rounded text-base transition-colors duration-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <span v-if="errors.name" class="block text-red-700 text-sm mt-1">
                    {{ errors.name[0] }}
                </span>
            </div>

            <div class="mb-4">
                <label class="block mb-2 font-semibold text-gray-800">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                    class="w-full px-3 py-2 border border-gray-300 rounded text-base transition-colors duration-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <span v-if="errors.email" class="block text-red-700 text-sm mt-1">
                    {{ errors.email[0] }}
                </span>
            </div>

            <div class="mb-4">
                <label class="block mb-2 font-semibold text-gray-800">Password</label>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                    class="w-full px-3 py-2 border border-gray-300 rounded text-base transition-colors duration-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <span v-if="errors.password" class="block text-red-700 text-sm mt-1">
                    {{ errors.password[0] }}
                </span>
            </div>

            <div class="mb-4">
                <label class="block mb-2 font-semibold text-gray-800">Confirm Password</label>
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm your password"
                    class="w-full px-3 py-2 border border-gray-300 rounded text-base transition-colors duration-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <span v-if="errors.password_confirmation" class="block text-red-700 text-sm mt-1">
                    {{ errors.password_confirmation[0] }}
                </span>
            </div>

            <button
                @click="handleRegister"
                :disabled="loading"
                class="w-full py-3 bg-blue-600 text-white border-none rounded text-base font-semibold cursor-pointer transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
            >
                {{ loading ? 'Registering...' : 'Register' }}
            </button>

            <p class="text-center mt-6 text-gray-600">
                Already have an account?
                <RouterLink to="/login" class="text-blue-600 hover:text-blue-800 font-semibold">Login here</RouterLink>
            </p>
        </div>
    </div>
</template>


