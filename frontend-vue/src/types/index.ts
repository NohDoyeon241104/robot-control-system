// API 공통 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  timestamp: string
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  size: number
}

// 공통 에러 타입
export interface ApiError {
  success: false
  errorCode: string
  message: string
  timestamp: string
}

// Export all types
export * from './robot'
export * from './sensor'
export * from './user'
export * from './websocket'
export * from './common'
