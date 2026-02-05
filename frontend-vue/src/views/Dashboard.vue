<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRobotStore } from '@/stores/robotStore'
import { useWebSocketStore } from '@/stores/websocketStore'

const robotStore = useRobotStore()
const wsStore = useWebSocketStore()
const loading = ref(true)

const summary = computed(() => ({
  activeRobots: robotStore.robotCount.active,
  totalRobots: robotStore.robotCount.total,
  activePercentage: Math.round(
    (robotStore.robotCount.active / robotStore.robotCount.total) * 100
  ) || 0
}))

async function fetchData() {
  loading.value = true
  try {
    await robotStore.fetchRobots()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()
  wsStore.connect()
})
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">
          <v-icon>mdi-view-dashboard</v-icon>
          대시보드
        </h1>
      </v-col>
    </v-row>
    
    <!-- 요약 카드 -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>활성 로봇</v-card-title>
          <v-card-text>
            <div class="text-h3">
              {{ summary.activeRobots }} / {{ summary.totalRobots }}
            </div>
            <v-progress-linear
              :model-value="summary.activePercentage"
              color="success"
              height="10"
              class="mt-2"
            />
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>총 센서 수</v-card-title>
          <v-card-text>
            <div class="text-h3">12</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>알림</v-card-title>
          <v-card-text>
            <div class="text-h3">2</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- 로봇 상태 테이블 -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>실시간 로봇 상태</v-card-title>
          <v-card-text>
            <v-data-table
              :items="robotStore.robots"
              :headers="[
                { title: '로봇 ID', value: 'robotId' },
                { title: '이름', value: 'name' },
                { title: '상태', value: 'status' },
                { title: '배터리', value: 'battery' },
                { title: '위치 (x, y)', value: 'position' }
              ]"
              :loading="loading"
            >
              <template #item.status="{ item }">
                <v-chip
                  :color="
                    item.status === 'ACTIVE' ? 'success' :
                    item.status === 'IDLE' ? 'warning' :
                    item.status === 'ERROR' ? 'error' : 'default'
                  "
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>
              
              <template #item.battery="{ item }">
                <v-progress-linear
                  :model-value="item.battery"
                  :color="
                    item.battery > 50 ? 'success' :
                    item.battery > 20 ? 'warning' : 'error'
                  "
                  height="20"
                >
                  <template #default>
                    <strong>{{ item.battery }}%</strong>
                  </template>
                </v-progress-linear>
              </template>
              
              <template #item.position="{ item }">
                ({{ item.position.x.toFixed(1) }}, {{ item.position.y.toFixed(1) }})
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>
