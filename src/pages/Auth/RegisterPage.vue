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
    <div class="container">
        <div class="card">
            <h2>Register</h2>

            <div v-if="errors.general" class="error-message">
                {{ errors.general[0] }}
            </div>

            <div class="field">
                <label>Name</label>
                <input
                    v-model="form.name"
                    type="text"
                    placeholder="Enter your name"
                />
                <span v-if="errors.name" class="error">
                    {{ errors.name[0] }}
                </span>
            </div>

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

            <div class="field">
                <label>Confirm Password</label>
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm your password"
                />
                <span v-if="errors.password_confirmation" class="error">
                    {{ errors.password_confirmation[0] }}
                </span>
            </div>

            <button @click="handleRegister" :disabled="loading">
                {{ loading ? 'Registering...' : 'Register' }}
            </button>

            <p>Already have an account?
                <RouterLink to="/login">Login here</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
}

.error-message {
    background-color: #fee;
    color: #c33;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
}

.field {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error {
    display: block;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

p {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
}

a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
}

a:hover {
    text-decoration: underline;
}
</style>
