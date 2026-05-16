<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { themeClasses } from '@/lib/theme'
import { Button } from '@/components/ui/button'

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
    <div :class="themeClasses.darkContainer">
        <div :class="themeClasses.authCard">
            <h2 :class="themeClasses.authTitle">Login</h2>

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

            <Button
                @click="handleLogin"
                :disabled="loading"
                :class="themeClasses.submitButton"
            >
                {{ loading ? 'Logging in...' : 'Login' }}
            </Button>

            <p class="text-center mt-4 text-sm">
                <span :class="themeClasses.dividerText">No account?</span>
                <RouterLink to="/register" :class="themeClasses.linkText">Register here</RouterLink>
            </p>
        </div>
    </div>
</template>