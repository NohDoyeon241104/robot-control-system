<script setup lang="ts">
import DirectionalControl from '@/components/control/DirectionalControl.vue';
</script>

<template>
  <div class="dashboard">
    <h2>메인 대시보드</h2>
    <div class="control-section">
      <h3>로봇 수동 제어</h3>
      <DirectionalControl robotId="robot-001" />
    </div>
  </div>
</template>

<style scoped>
.dashboard { padding: 20px; border: 1px solid #eee; }
.control-section { margin-top: 30px; }
</style>