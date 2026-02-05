import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useRobotStore } from './robotStore'

export const useWebSocketStore = defineStore('websocket', () => {
  const client = ref<Client | null>(null)
  const connected = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  
  function connect() {
    const socket = new SockJS(import.meta.env.VITE_WS_URL)
    
    client.value = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      
      onConnect: () => {
        console.log('WebSocket connected')
        connected.value = true
        reconnectAttempts.value = 0
        subscribeToTopics()
      },
      
      onDisconnect: () => {
        console.log('WebSocket disconnected')
        connected.value = false
      },
      
      onStompError: (frame) => {
        console.error('STOMP error:', frame)
        handleReconnect()
      }
    })
    
    client.value.activate()
  }
  
  function subscribeToTopics() {
    if (!client.value) return
    
    const robotStore = useRobotStore()
    
    // 로봇 상태 업데이트 구독
    client.value.subscribe('/topic/robots/status', (message) => {
      const data = JSON.parse(message.body)
      robotStore.updateRobotStatus(data.data)
    })
    
    // 로그 스트리밍 구독
    client.value.subscribe('/topic/logs', (message) => {
      const data = JSON.parse(message.body)
      // logStore.addLog(data.data)
      console.log('Log received:', data)
    })
    
    // 알림 구독
    client.value.subscribe('/topic/notifications', (message) => {
      const data = JSON.parse(message.body)
      // notificationStore.addNotification(data.data)
      console.log('Notification received:', data)
    })
  }
  
  function subscribeToRobot(robotId: string) {
    if (!client.value) return
    
    // 특정 로봇 위치 업데이트
    client.value.subscribe(`/topic/robots/${robotId}/position`, (message) => {
      const data = JSON.parse(message.body)
      console.log('Position update:', data)
    })
    
    // 센서 데이터 구독
    client.value.subscribe(`/topic/robots/${robotId}/sensors/lidar`, (message) => {
      const data = JSON.parse(message.body)
      console.log('LiDAR data:', data)
    })
    
    client.value.subscribe(`/topic/robots/${robotId}/sensors/camera`, (message) => {
      const data = JSON.parse(message.body)
      console.log('Camera data:', data)
    })
  }
  
  function sendCommand(robotId: string, command: any) {
    if (!client.value || !connected.value) {
      console.error('WebSocket not connected')
      return
    }
    
    client.value.publish({
      destination: `/app/robots/${robotId}/control`,
      body: JSON.stringify(command)
    })
  }
  
  function handleReconnect() {
    if (reconnectAttempts.value < maxReconnectAttempts) {
      reconnectAttempts.value++
      console.log(`Reconnect attempt ${reconnectAttempts.value}`)
      setTimeout(() => connect(), 5000)
    }
  }
  
  function disconnect() {
    if (client.value) {
      client.value.deactivate()
      client.value = null
      connected.value = false
    }
  }
  
  return {
    connected,
    connect,
    disconnect,
    subscribeToRobot,
    sendCommand
  }
})
