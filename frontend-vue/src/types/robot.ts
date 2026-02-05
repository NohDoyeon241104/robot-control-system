// 로봇 상태 Enum
export type RobotStatus = 'ACTIVE' | 'IDLE' | 'ERROR' | 'INACTIVE'

// 로봇 위치
export interface Position {
  x: number
  y: number
  z: number
  timestamp?: string
}

// 로봇 방향
export interface Orientation {
  yaw: number
  pitch: number
  roll: number
}

// ROS2 설정
export interface ROS2Config {
  nodeName: string
  namespace: string
  topicPrefix: string
  domainId: number
  qosProfile: string
}

// 센서 정보 (간략)
export interface SensorInfo {
  sensorId: string
  type: string
  topic: string
  status: string
}

// 로봇 정보
export interface Robot {
  robotId: string
  name: string
  model: string
  manufacturer: string
  status: RobotStatus
  position: Position
  battery: number
  speed: number
  lastCommunication: string
  ros2Config: ROS2Config
  sensors: SensorInfo[]
  createdAt: string
  updatedAt: string
}

// 로봇 생성 요청
export interface RobotCreateRequest {
  robotId: string
  name: string
  model: string
  manufacturer?: string
  ros2Config: {
    nodeName: string
    namespace: string
    topicPrefix: string
    domainId?: number
    qosProfile?: string
  }
  sensors: {
    type: string
    topic: string
  }[]
}

// 로봇 수정 요청
export interface RobotUpdateRequest {
  name?: string
  status?: RobotStatus
  ros2Config?: Partial<ROS2Config>
}

// 이동 명령
export interface MoveCommand {
  direction: 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT' | 'STOP'
  speed: number
  duration?: number
}

// 목표 위치 명령
export interface GoToCommand {
  targetX: number
  targetY: number
  targetZ: number
  speed: number
}

// 로봇 상태 요약
export interface RobotStatusSummary {
  robotId: string
  name: string
  status: RobotStatus
  position: Position
  battery: number
  lastCommunication: string
}

// 대시보드 요약
export interface DashboardSummary {
  totalRobots: number
  activeRobots: number
  idleRobots: number
  errorRobots: number
  inactiveRobots: number
  totalSensors: number
  activeSensors: number
  unreadNotifications: number
  systemUptime: number
  averageResponseTime: number
}
