import apiClient from './index'
import type { ApiResponse, DashboardSummary, RobotStatusSummary } from '@/types'

export const dashboardApi = {
  // 대시보드 요약 정보
  getSummary: () =>
    apiClient.get<ApiResponse<DashboardSummary>>('/dashboard/summary'),
  
  // 로봇 상태 요약
  getRobotStatus: () =>
    apiClient.get<ApiResponse<RobotStatusSummary[]>>('/dashboard/robot-status')
}
