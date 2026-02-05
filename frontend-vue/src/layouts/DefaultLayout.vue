<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'

const router = useRouter()
const authStore = useAuthStore()
const drawer = ref(true)

const menuItems = [
  { title: '대시보드', icon: 'mdi-view-dashboard', to: '/dashboard' },
  { title: '로봇 제어', icon: 'mdi-robot', to: '/control' },
  { title: '맵 뷰', icon: 'mdi-map', to: '/map' },
  { title: '장비 관리', icon: 'mdi-cog', to: '/equipment' },
  { title: '모니터링', icon: 'mdi-chart-line', to: '/monitoring' },
  { title: '설정', icon: 'mdi-settings', to: '/settings' }
]

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <!-- 헤더 -->
    <AppHeader @toggle-drawer="drawer = !drawer" @logout="handleLogout" />
    
    <!-- 사이드바 -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list density="compact">
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>
    
    <!-- 메인 콘텐츠 -->
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
