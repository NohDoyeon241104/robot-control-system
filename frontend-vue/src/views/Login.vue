<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = '사용자명과 비밀번호를 입력하세요.'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login({
      username: username.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.message || '로그인에 실패했습니다.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-card>
    <v-card-title class="text-center">
      <v-icon size="64" color="primary">mdi-robot</v-icon>
      <div class="text-h5 mt-2">Robot Control System</div>
    </v-card-title>
    
    <v-card-text>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="사용자명"
          prepend-icon="mdi-account"
          variant="outlined"
          :disabled="loading"
        />
        
        <v-text-field
          v-model="password"
          label="비밀번호"
          prepend-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          variant="outlined"
          :disabled="loading"
          @click:append="showPassword = !showPassword"
        />
        
        <v-alert v-if="error" type="error" class="mb-4">
          {{ error }}
        </v-alert>
        
        <v-btn
          type="submit"
          color="primary"
          block
          :loading="loading"
          size="large"
        >
          로그인
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
