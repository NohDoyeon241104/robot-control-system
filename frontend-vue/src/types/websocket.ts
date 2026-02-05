import type { Position, RobotStatus } from './robot'

// WebSocket 메시지 타입
export type WebSocketMessageType = 
  | 'ROBOT_STATUS_UPDATE'
  | 'POSITION_UPDATE'
  | 'LIDAR_DATA'
  | 'CAMERA_FRAME'
  | 'IMU_DATA'
  | 'LOG_ENTRY'
  | 'NEW_NOTIFICATION'

// 기본 WebSocket 메시지
export interface WebSocketMessage<T = any> {
  type: WebSocketMessageType
  timestamp: string
  data: T
}

// 로봇 상태 업데이트
export interface RobotStatusUpdate {
  robotId: string
  status: RobotStatus
  position: Position
  battery: number
  speed: number
}

// 위치 업데이트
export interface PositionUpdate {
  robotId: string
  x: number
  y: number
  z: number
  orientation: {
    yaw: number
    pitch: number
    roll: number
  }
}
