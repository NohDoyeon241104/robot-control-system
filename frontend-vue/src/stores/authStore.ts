import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginRequest } from '@/types'
import { authApi } from '@/api/authApi'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Computed
  const isAuthenticated = computed(() => !!token.value)
  
  // Actions
  async function login(credentials: LoginRequest) {
    loading.value = true
    error.value = null
    try {
      const response = await authApi.login(credentials)
      if (response.data.success && response.data.data) {
        const { token: authToken, refreshToken, ...userData } = response.data.data
        
        // 토큰 저장
        token.value = authToken
        localStorage.setItem('token', authToken)
        localStorage.setItem('refreshToken', refreshToken)
        
        // 사용자 정보 저장
        user.value = userData as User
        
        return true
      }
      return false
    } catch (err: any) {
      error.value = err.response?.data?.message || '로그인에 실패했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function logout() {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // 로컬 상태 초기화
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }
  
  function checkAuth() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      // TODO: 토큰 유효성 검증 API 호출
    }
  }
  
  return {
    // State
    user,
    token,
    loading,
    error,
    // Computed
    isAuthenticated,
    // Actions
    login,
    logout,
    checkAuth
  }
})
