// 로그 레벨
export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

// 시스템 로그
export interface SystemLog {
  logId: string
  timestamp: string
  level: LogLevel
  source: string
  message: string
  metadata?: Record<string, any>
}

// 알림 타입
export type NotificationType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR'

// 알림 심각도
export type NotificationSeverity = 'LOW' | 'MEDIUM' | 'HIGH'

// 알림
export interface Notification {
  notificationId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  severity: NotificationSeverity
  timestamp: string
}

// 시스템 설정
export interface SystemSettings {
  language: string
  theme: 'light' | 'dark' | 'auto'
  timezone: string
  dateFormat: string
  autoRefresh: boolean
  refreshInterval: number
  ros2Bridge: {
    type: string
    url: string
    connectionStatus: string
    domainId: number
    qosProfile: string
  }
  apiSettings: {
    baseUrl: string
    websocketUrl: string
    connectionStatus: string
  }
}
