import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Auth/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Auth/RegisterPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/pages/Task/TaskPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/index',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/CreateTask',
    name: 'CreateTask',
    component: () => import('@/pages/Task/CreateTask.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }

  if (to.meta.guestOnly && auth.isLoggedIn) {
    return '/tasks'
  }
})

export default router