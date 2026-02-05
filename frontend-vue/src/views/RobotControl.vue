<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRobotStore } from '@/stores/robotStore'

const robotStore = useRobotStore()
const selectedRobotId = ref<string | null>(null)
const speed = ref(0.5)

function selectRobot(robotId: string) {
  selectedRobotId.value = robotId
  const robot = robotStore.robots.find(r => r.robotId === robotId)
  if (robot) {
    robotStore.selectRobot(robot)
  }
}

onMounted(() => {
  robotStore.fetchRobots()
})
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">
          <v-icon>mdi-robot</v-icon>
          로봇 제어
        </h1>
      </v-col>
    </v-row>
    
    <v-row>
      <!-- 로봇 목록 -->
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>로봇 목록</v-card-title>
          <v-list>
            <v-list-item
              v-for="robot in robotStore.robots"
              :key="robot.robotId"
              :active="selectedRobotId === robot.robotId"
              @click="selectRobot(robot.robotId)"
            >
              <template #prepend>
                <v-icon
                  :color="
                    robot.status === 'ACTIVE' ? 'success' :
                    robot.status === 'IDLE' ? 'warning' :
                    robot.status === 'ERROR' ? 'error' : 'default'
                  "
                >
                  mdi-circle
                </v-icon>
              </template>
              <v-list-item-title>{{ robot.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ robot.robotId }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      
      <!-- 제어 패널 -->
      <v-col cols="12" md="9">
        <v-card v-if="robotStore.selectedRobot">
          <v-card-title>
            {{ robotStore.selectedRobot.name }} 제어판
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="text-subtitle-1">
                  상태: {{ robotStore.selectedRobot.status }} | 
                  배터리: {{ robotStore.selectedRobot.battery }}% | 
                  속도: {{ robotStore.selectedRobot.speed }} m/s
                </div>
              </v-col>
            </v-row>
            
            <!-- 방향키 제어 -->
            <v-row class="mt-4">
              <v-col cols="12" class="text-center">
                <h3>이동 제어</h3>
                <div class="directional-control mt-4">
                  <v-btn icon size="large" class="up-btn">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <div class="middle-row">
                    <v-btn icon size="large">
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn icon size="large" color="error">
                      <v-icon>mdi-stop</v-icon>
                    </v-btn>
                    <v-btn icon size="large">
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                  <v-btn icon size="large" class="down-btn">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            
            <!-- 속도 슬라이더 -->
            <v-row class="mt-4">
              <v-col cols="12">
                <v-slider
                  v-model="speed"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  label="속도"
                  thumb-label
                  :thumb-size="24"
                />
              </v-col>
            </v-row>
            
            <!-- 액션 버튼 -->
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn color="error" size="large" class="mr-2">
                  긴급 정지
                </v-btn>
                <v-btn color="primary" size="large">
                  홈으로
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        
        <v-card v-else>
          <v-card-text class="text-center">
            <v-icon size="64" color="grey">mdi-robot-off</v-icon>
            <p class="mt-4">로봇을 선택하세요</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.directional-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.middle-row {
  display: flex;
  gap: 8px;
}

.up-btn, .down-btn {
  align-self: center;
}
</style>
