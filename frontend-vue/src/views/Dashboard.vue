<!-- <script setup lang="ts">
import { onMounted } from 'vue';
import { useRobotStore } from '@/stores/robotStore';
import RobotCard from '@/components/robot/RobotCard.vue';

const robotStore = useRobotStore();

onMounted(() => {
  robotStore.fetchRobots(); // 페이지 진입 시 데이터 로드
});
</script>

<template>
  <div class="dashboard">
    <h1>로봇 제어 시스템 대시보드</h1>
    
    <div v-if="robotStore.loading">데이터 불러오는 중...</div>
    
    <div v-else class="robot-grid">
      <RobotCard 
        v-for="robot in robotStore.robots" 
        :key="robot.id" 
        :robot="robot" 
      />
    </div>
  </div>
</template>

<style scoped>
.robot-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
</style> -->

<script setup lang="ts">
import DirectionalControl from '@/components/control/DirectionalControl.vue';
import { useWebSocket } from '@/composables/useWebSocket';

// 로봇 ID (실제로는 스토어에서 가져온 값을 쓰게 됩니다)
const targetRobotId = 'robot-001';

// WebSocket 연결 (서버 주소는 환경 변수에서 가져옴)
const { data: realTimeData, isConnected } = useWebSocket(import.meta.env.VITE_WS_URL);
</script>

<template>
  <div class="dashboard">
    <h2>실시간 로봇 제어</h2>
    
    <div class="status">
      연결 상태: <span :class="{ connected: isConnected }">{{ isConnected ? '연결됨' : '연결 안됨' }}</span>
      <p v-if="realTimeData">로봇 현재 위치: X: {{ realTimeData.x }}, Y: {{ realTimeData.y }}</p>
    </div>

    <hr />
    
    <DirectionalControl :robotId="targetRobotId" />
  </div>
</template>

<style scoped>
.connected { color: green; font-weight: bold; }
</style>