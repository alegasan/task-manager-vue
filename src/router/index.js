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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.guestOnly && auth.isLoggedIn) {
    return next('/tasks')
  }

  next()
})

export default router