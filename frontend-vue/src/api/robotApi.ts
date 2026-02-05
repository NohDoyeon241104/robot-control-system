import apiClient from './index'
import type { 
  ApiResponse, 
  Robot, 
  RobotCreateRequest, 
  RobotUpdateRequest,
  PaginatedResponse,
  MoveCommand,
  GoToCommand 
} from '@/types'

export const robotApi = {
  // 로봇 목록 조회
  getAllRobots: (params?: any) =>
    apiClient.get<ApiResponse<PaginatedResponse<Robot>>>('/robots', { params }),
  
  // 로봇 상세 조회
  getRobotById: (robotId: string) =>
    apiClient.get<ApiResponse<Robot>>(`/robots/${robotId}`),
  
  // 로봇 생성
  createRobot: (data: RobotCreateRequest) =>
    apiClient.post<ApiResponse<Robot>>('/robots', data),
  
  // 로봇 수정
  updateRobot: (robotId: string, data: RobotUpdateRequest) =>
    apiClient.put<ApiResponse<Robot>>(`/robots/${robotId}`, data),
  
  // 로봇 삭제
  deleteRobot: (robotId: string) =>
    apiClient.delete<ApiResponse<void>>(`/robots/${robotId}`),
  
  // 로봇 이동 명령
  moveRobot: (robotId: string, command: MoveCommand) =>
    apiClient.post(`/robots/${robotId}/control/move`, command),
  
  // 목표 위치로 이동
  navigateToGoal: (robotId: string, goal: GoToCommand) =>
    apiClient.post(`/robots/${robotId}/control/goto`, goal),
  
  // 긴급 정지
  emergencyStop: (robotId: string) =>
    apiClient.post(`/robots/${robotId}/control/emergency-stop`)
}
