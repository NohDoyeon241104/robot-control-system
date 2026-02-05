<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits(['toggleDrawer', 'logout'])
const authStore = useAuthStore()
</script>

<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="emit('toggleDrawer')" />
    
    <v-toolbar-title>
      <v-icon>mdi-robot</v-icon>
      Robot Control System
    </v-toolbar-title>
    
    <v-spacer />
    
    <v-btn icon>
      <v-badge content="3" color="error">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
    
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item>
          <v-list-item-title>{{ authStore.user?.username || 'User' }}</v-list-item-title>
          <v-list-item-subtitle>{{ authStore.user?.role }}</v-list-item-subtitle>
        </v-list-item>
        <v-divider />
        <v-list-item @click="emit('logout')">
          <v-list-item-title>
            <v-icon left>mdi-logout</v-icon>
            로그아웃
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
</style>
