import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 전역 네비게이션 가드 로그인을 위해서 잠시 주석 260205
router.beforeEach(authGuard)

export default router
