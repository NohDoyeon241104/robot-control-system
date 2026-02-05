<script setup lang="ts">
import type { Robot } from '@/types/robot';
import { computed } from 'vue';

const props = defineProps<{
  robot: Robot
}>();

const statusColor = computed(() => {
  switch (props.robot.status) {
    case 'RUNNING': return 'green';
    case 'ERROR': return 'red';
    default: return 'grey';
  }
});
</script>

<template>
  <div class="robot-card" :style="{ borderColor: statusColor }">
    <h3>{{ robot.name }} <small>({{ robot.model }})</small></h3>
    <p>상태: <span :class="robot.status">{{ robot.status }}</span></p>
    <div class="battery-bar">
      배터리: {{ robot.battery }}%
    </div>
  </div>
</template>

<style scoped>
.robot-card { border: 2px solid; padding: 15px; border-radius: 8px; margin: 10px; }
.RUNNING { color: green; font-weight: bold; }
.ERROR { color: red; font-weight: bold; }
</style>