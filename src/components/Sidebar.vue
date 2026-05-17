<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LayoutList, Home, Settings, X, Menu, LogOut } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const isOpen = ref(false)

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/index' },
  { icon: LayoutList, label: 'Tasks', path: '/tasks' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

const navigateTo = (path) => {
  router.push(path)
  if (window.innerWidth < 768) {
    isOpen.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-dark-bg">

    <aside 
      :class="[
        'fixed md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40',
        'w-64 bg-dark-surface border-r border-dark-border',
        'flex flex-col h-screen self-start md:sticky md:top-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
 
      <div class="p-6 border-b border-dark-border">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-blue-accent">TaskHub</h1>
          <button
            @click="toggleSidebar"
            class="md:hidden text-dark-text hover:text-blue-accent transition-colors"
          >
            <X :size="24" />
          </button>
        </div>
        <p class="text-dark-textSecondary text-sm mt-2">Manage your tasks efficiently</p>
      </div>


      <nav class="flex-1 p-4 space-y-2">
        <div
          v-for="item in menuItems"
          :key="item.path"
          @click="navigateTo(item.path)"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-300',
            'text-dark-text hover:text-blue-accent hover:bg-gray-800',
            router.currentRoute.value.path === item.path
              ? 'bg-blue-accent bg-opacity-20 border-l-4 border-blue-accent text-blue-accent'
              : ''
          ]"
        >
          <component :is="item.icon" :size="20" class="mr-3 flex-shrink-0" />
          <span class="font-medium">{{ item.label }}</span>
        </div>
      </nav>


      <div class="border-t border-dark-border p-4 space-y-3">
        <div class="px-4 py-3 bg-gray-800 rounded-lg">
          <p class="text-dark-text font-semibold text-sm truncate">{{ auth.user?.name || 'User' }}</p>
          <p class="text-dark-textSecondary text-xs truncate">{{ auth.user?.email || 'user@example.com' }}</p>
        </div>
        <button
          @click="handleLogout"
          class="w-full px-4 py-3 bg-blue-accent hover:bg-blue-accentDark text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut :size="18" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

   
    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
    ></div>

  
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
      <button
        @click="toggleSidebar"
        class="md:hidden p-4 text-dark-text hover:text-blue-accent transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu :size="24" />
      </button>      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
