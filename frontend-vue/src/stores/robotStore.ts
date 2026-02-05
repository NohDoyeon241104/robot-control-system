import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Robot, RobotStatus, RobotCreateRequest, RobotUpdateRequest, RobotStatusUpdate } from '@/types'
import { robotApi } from '@/api/robotApi'

export const useRobotStore = defineStore('robot', () => {
  // State
  const robots = ref<Robot[]>([])
  const selectedRobot = ref<Robot | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Computed
  const activeRobots = computed(() => 
    robots.value.filter(r => r.status === 'ACTIVE')
  )
  
  const robotCount = computed(() => ({
    total: robots.value.length,
    active: robots.value.filter(r => r.status === 'ACTIVE').length,
    idle: robots.value.filter(r => r.status === 'IDLE').length,
    error: robots.value.filter(r => r.status === 'ERROR').length,
    inactive: robots.value.filter(r => r.status === 'INACTIVE').length
  }))
  
  // Actions
  async function fetchRobots(params?: {
    status?: RobotStatus
    search?: string
    page?: number
    size?: number
  }) {
    loading.value = true
    error.value = null
    try {
      const response = await robotApi.getAllRobots(params)
      if (response.data.success && response.data.data) {
        robots.value = response.data.data.content
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  async function fetchRobotById(robotId: string) {
    loading.value = true
    try {
      const response = await robotApi.getRobotById(robotId)
      if (response.data.success && response.data.data) {
        selectedRobot.value = response.data.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  async function createRobot(robotData: RobotCreateRequest) {
    loading.value = true
    try {
      const response = await robotApi.createRobot(robotData)
      if (response.data.success && response.data.data) {
        robots.value.push(response.data.data)
        return response.data.data
      }
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function updateRobot(robotId: string, robotData: RobotUpdateRequest) {
    loading.value = true
    try {
      const response = await robotApi.updateRobot(robotId, robotData)
      if (response.data.success && response.data.data) {
        const index = robots.value.findIndex(r => r.robotId === robotId)
        if (index !== -1) {
          robots.value[index] = response.data.data
        }
      }
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  async function deleteRobot(robotId: string) {
    loading.value = true
    try {
      await robotApi.deleteRobot(robotId)
      robots.value = robots.value.filter(r => r.robotId !== robotId)
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  function selectRobot(robot: Robot) {
    selectedRobot.value = robot
  }
  
  function clearSelection() {
    selectedRobot.value = null
  }
  
  // WebSocket에서 호출
  function updateRobotStatus(updates: RobotStatusUpdate[]) {
    updates.forEach(update => {
      const robot = robots.value.find(r => r.robotId === update.robotId)
      if (robot) {
        robot.status = update.status
        robot.position = update.position
        robot.battery = update.battery
        robot.speed = update.speed
      }
    })
  }
  
  return {
    // State
    robots,
    selectedRobot,
    loading,
    error,
    // Computed
    activeRobots,
    robotCount,
    // Actions
    fetchRobots,
    fetchRobotById,
    createRobot,
    updateRobot,
    deleteRobot,
    selectRobot,
    clearSelection,
    updateRobotStatus
  }
})
