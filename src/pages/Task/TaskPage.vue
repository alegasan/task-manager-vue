<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
const router = useRouter()
const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
    <div class="flex justify-end p-4">
        <Button 
            @click="handleLogout" 
            variant="outline"
            class="cursor-pointer"
        >
            Logout
        </Button>
    </div>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Tasks</h1>
    </div>

    <div>

    </div>
</template>