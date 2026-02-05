<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="120" color="grey">mdi-alert-circle-outline</v-icon>
        <h1 class="text-h3 mt-4">404</h1>
        <p class="text-h6 mt-2">페이지를 찾을 수 없습니다</p>
        <v-btn color="primary" class="mt-4" @click="router.push('/dashboard')">
          대시보드로 돌아가기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
