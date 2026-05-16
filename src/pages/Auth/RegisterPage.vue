<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { themeClasses } from '@/lib/theme'
import { Button } from '@/components/ui/button'

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
    <div :class="themeClasses.darkContainer">
        <div :class="themeClasses.authCard">
            <h2 :class="themeClasses.authTitle">Register</h2>

            <div v-if="errors.general" class="bg-red-900 bg-opacity-30 text-red-300 px-4 py-3 rounded mb-4 border border-red-700">
                {{ errors.general[0] }}
            </div>

            <div :class="themeClasses.formGroup">
                <label :class="themeClasses.label">Name</label>
                <input
                    v-model="form.name"
                    type="text"
                    placeholder="Enter your name"
                    :class="themeClasses.inputField"
                />
                <span v-if="errors.name" :class="themeClasses.errorMessage">
                    {{ errors.name[0] }}
                </span>
            </div>

            <div :class="themeClasses.formGroup">
                <label :class="themeClasses.label">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                    :class="themeClasses.inputField"
                />
                <span v-if="errors.email" :class="themeClasses.errorMessage">
                    {{ errors.email[0] }}
                </span>
            </div>

            <div :class="themeClasses.formGroup">
                <label :class="themeClasses.label">Password</label>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                    :class="themeClasses.inputField"
                />
                <span v-if="errors.password" :class="themeClasses.errorMessage">
                    {{ errors.password[0] }}
                </span>
            </div>

            <div :class="themeClasses.formGroup">
                <label :class="themeClasses.label">Confirm Password</label>
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm your password"
                    :class="themeClasses.inputField"
                />
                <span v-if="errors.password_confirmation" :class="themeClasses.errorMessage">
                    {{ errors.password_confirmation[0] }}
                </span>
            </div>

            <Button
                @click="handleRegister"
                :disabled="loading"
                :class="themeClasses.submitButton"
            >
                {{ loading ? 'Registering...' : 'Register' }}
            </Button>

            <p class="text-center mt-6 text-sm">
                <span :class="themeClasses.dividerText">Already have an account?</span>
                <RouterLink to="/login" :class="themeClasses.linkText">Login here</RouterLink>
            </p>
        </div>
    </div>
</template>

