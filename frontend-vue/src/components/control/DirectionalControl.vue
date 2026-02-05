<script setup lang="ts">
import apiClient from '@/api';

// 로봇 ID를 부모로부터 전달받음
const props = defineProps<{
  robotId: string
}>();

// 명령 전송 함수
const sendCommand = async (direction: string) => {
  try {
    await apiClient.post(`/robots/${props.robotId}/command`, {
      type: 'MOVE',
      direction: direction, // 'FORWARD', 'BACKWARD', 'LEFT', 'RIGHT'
      speed: 1.0
    });
    console.log(`${direction} 명령 전송 성공`);
  } catch (error) {
    console.error('명령 전송 실패:', error);
  }
};
</script>

<template>
  <div class="control-pad">
    <div class="row"><button @click="sendCommand('FORWARD')">▲</button></div>
    <div class="row">
      <button @click="sendCommand('LEFT')">◀</button>
      <button @click="sendCommand('STOP')" class="stop">■</button>
      <button @click="sendCommand('RIGHT')">▶</button>
    </div>
    <div class="row"><button @click="sendCommand('BACKWARD')">▼</button></div>
  </div>
</template>

<style scoped>
.control-pad { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.row { display: flex; gap: 10px; }
button { width: 60px; height: 60px; font-size: 20px; cursor: pointer; border-radius: 8px; border: 1px solid #ccc; }
button:active { background-color: #e0e0e0; }
.stop { background-color: #ffcccc; color: red; font-weight: bold; }
</style>