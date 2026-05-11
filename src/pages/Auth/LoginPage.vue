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
    <div class="container">
        <div class="card">
            <h2>Login</h2>

            <div class="field">
                <label>Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your email"
                />
                <span v-if="errors.email" class="error">
                    {{ errors.email[0] }}
                </span>
            </div>

            <div class="field">
                <label>Password</label>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your password"
                />
                <span v-if="errors.password" class="error">
                    {{ errors.password[0] }}
                </span>
            </div>

            <button @click="handleLogin" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>

            <p>No account? 
                <RouterLink to="/register">Register here</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5;
}
.card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h2 {
    margin-bottom: 1.5rem;
    text-align: center;
}
.field {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
label {
    font-weight: 600;
    font-size: 0.9rem;
}
input {
    padding: 0.6rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
}
button {
    width: 100%;
    padding: 0.75rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.5rem;
}
button:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
}
.error {
    color: red;
    font-size: 0.8rem;
}
p {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
}
a {
    color: #4f46e5;
}
</style>