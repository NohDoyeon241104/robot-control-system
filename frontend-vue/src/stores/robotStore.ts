import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Robot } from '@/types/robot';
import apiClient from '@/api';

export const useRobotStore = defineStore('robot', () => {
  const robots = ref<Robot[]>([]);
  const loading = ref(false);

  async function fetchRobots() {
    loading.value = true;
    try {
      const response = await apiClient.get<Robot[]>('/robots');
      robots.value = response.data;
    } catch (error) {
      console.error('로봇 목록을 불러오지 못했습니다.', error);
    } finally {
      loading.value = false;
    }
  }

  return { robots, loading, fetchRobots };
});