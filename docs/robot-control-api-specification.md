# 로봇 제어 시스템 - API 명세 및 구현 가이드

## 목차
1. [REST API 명세](#1-rest-api-명세)
2. [WebSocket 메시지 프로토콜](#2-websocket-메시지-프로토콜)
3. [데이터베이스 스키마](#3-데이터베이스-스키마)
4. [Spring Boot Controller 구현 가이드](#4-spring-boot-controller-구현-가이드)
5. [Vue 컴포넌트 상태 변수 및 구현 가이드](#5-vue-컴포넌트-상태-변수-및-구현-가이드)
6. [에러 코드 정의](#6-에러-코드-정의)

---

## 1. REST API 명세

### 1.1 인증 API

#### POST `/api/auth/login`
사용자 로그인

**Request Body**:
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "admin",
    "role": "ADMIN",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2026-02-05T14:30:00Z"
}
```

**Spring Boot Controller**:
```java
// src/main/java/com/robot/controller/AuthController.java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
        @RequestBody @Valid LoginRequest request
    ) {
        // 구현 필요
    }
}
```

---

#### POST `/api/auth/logout`
사용자 로그아웃

**Headers**: `Authorization: Bearer {token}`

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "로그아웃 성공",
  "timestamp": "2026-02-05T14:35:00Z"
}
```

---

### 1.2 로봇 관리 API

#### GET `/api/robots`
전체 로봇 목록 조회

**Query Parameters**:
- `status` (optional): `ACTIVE`, `IDLE`, `ERROR`, `INACTIVE`
- `page` (optional): 페이지 번호 (default: 0)
- `size` (optional): 페이지 크기 (default: 10)
- `search` (optional): 검색어 (이름, ID)

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "robotId": "R-001",
        "name": "Alpha-1",
        "model": "TurtleBot",
        "manufacturer": "TurtleBot Inc.",
        "status": "ACTIVE",
        "position": {
          "x": 15.2,
          "y": 8.0,
          "z": 0.0,
          "timestamp": "2026-02-05T14:30:00Z"
        },
        "battery": 87,
        "speed": 0.5,
        "lastCommunication": "2026-02-05T14:30:00Z",
        "ros2Config": {
          "nodeName": "robot_001_node",
          "namespace": "/robot_001",
          "topicPrefix": "/cmd_vel"
        },
        "sensors": [
          {
            "sensorId": "S-001",
            "type": "LIDAR",
            "topic": "/scan",
            "status": "ACTIVE"
          },
          {
            "sensorId": "S-002",
            "type": "CAMERA",
            "topic": "/image",
            "status": "ACTIVE"
          }
        ],
        "createdAt": "2026-01-15T10:00:00Z",
        "updatedAt": "2026-02-05T14:30:00Z"
      }
    ],
    "totalElements": 5,
    "totalPages": 1,
    "currentPage": 0,
    "size": 10
  },
  "timestamp": "2026-02-05T14:30:00Z"
}
```

**Spring Boot Controller**:
```java
// src/main/java/com/robot/controller/RobotController.java
@RestController
@RequestMapping("/api/robots")
public class RobotController {
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<RobotDTO>>> getAllRobots(
        @RequestParam(required = false) RobotStatus status,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search
    ) {
        // 구현 필요
    }
}
```

---

#### GET `/api/robots/{robotId}`
특정 로봇 상세 정보 조회

**Path Variable**: `robotId` (예: R-001)

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "robotId": "R-001",
    "name": "Alpha-1",
    "model": "TurtleBot",
    "manufacturer": "TurtleBot Inc.",
    "status": "ACTIVE",
    "position": {
      "x": 15.2,
      "y": 8.0,
      "z": 0.0,
      "timestamp": "2026-02-05T14:30:00Z"
    },
    "battery": 87,
    "speed": 0.5,
    "lastCommunication": "2026-02-05T14:30:00Z",
    "ros2Config": {
      "nodeName": "robot_001_node",
      "namespace": "/robot_001",
      "topicPrefix": "/cmd_vel",
      "domainId": 0,
      "qosProfile": "DEFAULT"
    },
    "sensors": [
      {
        "sensorId": "S-001",
        "type": "LIDAR",
        "topic": "/scan",
        "status": "ACTIVE",
        "lastData": {
          "range": 2.3,
          "angle": 360,
          "timestamp": "2026-02-05T14:30:00Z"
        }
      }
    ],
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-02-05T14:30:00Z"
  },
  "timestamp": "2026-02-05T14:30:00Z"
}
```

**Spring Boot Controller**:
```java
@GetMapping("/{robotId}")
public ResponseEntity<ApiResponse<RobotDTO>> getRobotById(
    @PathVariable String robotId
) {
    // 구현 필요
}
```

---

#### POST `/api/robots`
새 로봇 등록

**Request Body**:
```json
{
  "robotId": "R-006",
  "name": "Zeta-6",
  "model": "TurtleBot",
  "manufacturer": "TurtleBot Inc.",
  "ros2Config": {
    "nodeName": "robot_006_node",
    "namespace": "/robot_006",
    "topicPrefix": "/cmd_vel",
    "domainId": 0,
    "qosProfile": "DEFAULT"
  },
  "sensors": [
    {
      "type": "LIDAR",
      "topic": "/scan"
    },
    {
      "type": "CAMERA",
      "topic": "/image"
    },
    {
      "type": "IMU",
      "topic": "/imu"
    }
  ]
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "로봇이 성공적으로 등록되었습니다.",
  "data": {
    "robotId": "R-006",
    "name": "Zeta-6",
    "status": "INACTIVE",
    "createdAt": "2026-02-05T14:35:00Z"
  },
  "timestamp": "2026-02-05T14:35:00Z"
}
```

**Spring Boot Controller**:
```java
@PostMapping
public ResponseEntity<ApiResponse<RobotDTO>> createRobot(
    @RequestBody @Valid RobotCreateRequest request
) {
    // 구현 필요
    // ROS2 브리지 초기화 로직 포함
}
```

---

#### PUT `/api/robots/{robotId}`
로봇 정보 수정

**Request Body**:
```json
{
  "name": "Alpha-1-Updated",
  "status": "ACTIVE",
  "ros2Config": {
    "nodeName": "robot_001_node_updated",
    "namespace": "/robot_001",
    "topicPrefix": "/cmd_vel"
  }
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "로봇 정보가 업데이트되었습니다.",
  "data": {
    "robotId": "R-001",
    "name": "Alpha-1-Updated",
    "updatedAt": "2026-02-05T14:40:00Z"
  },
  "timestamp": "2026-02-05T14:40:00Z"
}
```

**Spring Boot Controller**:
```java
@PutMapping("/{robotId}")
public ResponseEntity<ApiResponse<RobotDTO>> updateRobot(
    @PathVariable String robotId,
    @RequestBody @Valid RobotUpdateRequest request
) {
    // 구현 필요
}
```

---

#### DELETE `/api/robots/{robotId}`
로봇 삭제

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "로봇이 삭제되었습니다.",
  "timestamp": "2026-02-05T14:45:00Z"
}
```

**Spring Boot Controller**:
```java
@DeleteMapping("/{robotId}")
public ResponseEntity<ApiResponse<Void>> deleteRobot(
    @PathVariable String robotId
) {
    // 구현 필요
    // ROS2 연결 해제 로직 포함
}
```

---

### 1.3 로봇 제어 API

#### POST `/api/robots/{robotId}/control/move`
로봇 이동 명령

**Request Body**:
```json
{
  "direction": "FORWARD",
  "speed": 0.5,
  "duration": 5
}
```

**Enums**:
- `direction`: `FORWARD`, `BACKWARD`, `LEFT`, `RIGHT`, `STOP`

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "이동 명령이 전송되었습니다.",
  "data": {
    "commandId": "CMD-12345",
    "status": "EXECUTING",
    "timestamp": "2026-02-05T14:50:00Z"
  },
  "timestamp": "2026-02-05T14:50:00Z"
}
```

**Spring Boot Controller**:
```java
@PostMapping("/{robotId}/control/move")
public ResponseEntity<ApiResponse<CommandResponse>> moveRobot(
    @PathVariable String robotId,
    @RequestBody @Valid MoveCommand command
) {
    // ROS2로 /cmd_vel 메시지 퍼블리시
}
```

---

#### POST `/api/robots/{robotId}/control/goto`
로봇 목표 위치 이동

**Request Body**:
```json
{
  "targetX": 20.0,
  "targetY": 10.0,
  "targetZ": 0.0,
  "speed": 0.5
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "목표 위치로 이동을 시작합니다.",
  "data": {
    "commandId": "CMD-12346",
    "status": "NAVIGATING",
    "estimatedTime": 120,
    "timestamp": "2026-02-05T14:55:00Z"
  },
  "timestamp": "2026-02-05T14:55:00Z"
}
```

**Spring Boot Controller**:
```java
@PostMapping("/{robotId}/control/goto")
public ResponseEntity<ApiResponse<NavigationResponse>> navigateToGoal(
    @PathVariable String robotId,
    @RequestBody @Valid GoToCommand command
) {
    // ROS2 Navigation2 Goal 전송
}
```

---

#### POST `/api/robots/{robotId}/control/emergency-stop`
긴급 정지

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "긴급 정지가 실행되었습니다.",
  "data": {
    "commandId": "CMD-12347",
    "status": "STOPPED",
    "timestamp": "2026-02-05T15:00:00Z"
  },
  "timestamp": "2026-02-05T15:00:00Z"
}
```

**Spring Boot Controller**:
```java
@PostMapping("/{robotId}/control/emergency-stop")
public ResponseEntity<ApiResponse<CommandResponse>> emergencyStop(
    @PathVariable String robotId
) {
    // 모든 이동 명령 취소 및 정지 신호 전송
}
```

---

### 1.4 센서 데이터 API

#### GET `/api/robots/{robotId}/sensors`
로봇의 모든 센서 목록 조회

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "sensorId": "S-001",
      "robotId": "R-001",
      "type": "LIDAR",
      "topic": "/scan",
      "status": "ACTIVE",
      "frequency": 10,
      "lastUpdate": "2026-02-05T15:05:00Z"
    },
    {
      "sensorId": "S-002",
      "robotId": "R-001",
      "type": "CAMERA",
      "topic": "/image",
      "status": "ACTIVE",
      "frequency": 30,
      "lastUpdate": "2026-02-05T15:05:00Z"
    }
  ],
  "timestamp": "2026-02-05T15:05:00Z"
}
```

**Spring Boot Controller**:
```java
@GetMapping("/{robotId}/sensors")
public ResponseEntity<ApiResponse<List<SensorDTO>>> getRobotSensors(
    @PathVariable String robotId
) {
    // 구현 필요
}
```

---

#### GET `/api/robots/{robotId}/sensors/{sensorId}/data`
센서의 최신 데이터 조회

**Query Parameters**:
- `limit` (optional): 최근 N개 데이터 (default: 1)

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "sensorId": "S-001",
    "type": "LIDAR",
    "readings": [
      {
        "range": 2.3,
        "angle": 360,
        "points": [
          {"distance": 2.5, "angle": 0},
          {"distance": 3.1, "angle": 1},
          {"distance": 2.8, "angle": 2}
        ],
        "timestamp": "2026-02-05T15:10:00Z"
      }
    ]
  },
  "timestamp": "2026-02-05T15:10:00Z"
}
```

**Spring Boot Controller**:
```java
@GetMapping("/{robotId}/sensors/{sensorId}/data")
public ResponseEntity<ApiResponse<SensorDataDTO>> getSensorData(
    @PathVariable String robotId,
    @PathVariable String sensorId,
    @RequestParam(defaultValue = "1") int limit
) {
    // 구현 필요
}
```

---

### 1.5 대시보드 통계 API

#### GET `/api/dashboard/summary`
대시보드 요약 정보

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "totalRobots": 5,
    "activeRobots": 3,
    "idleRobots": 1,
    "errorRobots": 1,
    "inactiveRobots": 0,
    "totalSensors": 12,
    "activeSensors": 10,
    "unreadNotifications": 2,
    "systemUptime": 86400,
    "averageResponseTime": 120
  },
  "timestamp": "2026-02-05T15:15:00Z"
}
```

**Spring Boot Controller**:
```java
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummary>> getSummary() {
        // 구현 필요
    }
}
```

---

#### GET `/api/dashboard/robot-status`
전체 로봇 상태 (간략 정보)

**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "robotId": "R-001",
      "name": "Alpha-1",
      "status": "ACTIVE",
      "position": {"x": 15.2, "y": 8.0},
      "battery": 87,
      "lastCommunication": "2026-02-05T15:14:58Z"
    },
    {
      "robotId": "R-002",
      "name": "Beta-2",
      "status": "IDLE",
      "position": {"x": 3.5, "y": 12.0},
      "battery": 45,
      "lastCommunication": "2026-02-05T15:14:55Z"
    }
  ],
  "timestamp": "2026-02-05T15:15:00Z"
}
```

**Spring Boot Controller**:
```java
@GetMapping("/robot-status")
public ResponseEntity<ApiResponse<List<RobotStatusSummary>>> getRobotStatus() {
    // 구현 필요
}
```

---

### 1.6 로그 API

#### GET `/api/logs`
시스템 로그 조회

**Query Parameters**:
- `startDate` (optional): 시작 날짜 (ISO 8601)
- `endDate` (optional): 종료 날짜 (ISO 8601)
- `level` (optional): `DEBUG`, `INFO`, `WARN`, `ERROR`
- `robotId` (optional): 특정 로봇 필터
- `page` (optional): 페이지 번호
- `size` (optional): 페이지 크기

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "logId": "LOG-12345",
        "timestamp": "2026-02-05T14:35:23Z",
        "level": "INFO",
        "source": "R-001",
        "message": "목표 위치 도달",
        "metadata": {
          "targetX": 20.0,
          "targetY": 10.0
        }
      },
      {
        "logId": "LOG-12344",
        "timestamp": "2026-02-05T14:35:20Z",
        "level": "WARN",
        "source": "R-004",
        "message": "배터리 15% 미만",
        "metadata": {
          "battery": 12
        }
      }
    ],
    "totalElements": 1234,
    "totalPages": 124,
    "currentPage": 0,
    "size": 10
  },
  "timestamp": "2026-02-05T15:20:00Z"
}
```

**Spring Boot Controller**:
```java
@RestController
@RequestMapping("/api/logs")
public class LogController {
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<SystemLog>>> getLogs(
        @RequestParam(required = false) LocalDateTime startDate,
        @RequestParam(required = false) LocalDateTime endDate,
        @RequestParam(required = false) LogLevel level,
        @RequestParam(required = false) String robotId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        // 구현 필요
    }
}
```

---

### 1.7 알림 API

#### GET `/api/notifications`
알림 목록 조회

**Query Parameters**:
- `unreadOnly` (optional): true/false
- `page`, `size`

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "notificationId": "N-001",
        "type": "WARNING",
        "title": "R-004 배터리 부족",
        "message": "R-004 로봇의 배터리가 15% 미만입니다.",
        "isRead": false,
        "timestamp": "2026-02-05T14:35:20Z"
      },
      {
        "notificationId": "N-002",
        "type": "SUCCESS",
        "title": "R-001 작업 완료",
        "message": "R-001이 목표 위치에 도달했습니다.",
        "isRead": false,
        "timestamp": "2026-02-05T14:32:00Z"
      }
    ],
    "totalElements": 15,
    "unreadCount": 2,
    "currentPage": 0
  },
  "timestamp": "2026-02-05T15:25:00Z"
}
```

**Spring Boot Controller**:
```java
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Notification>>> getNotifications(
        @RequestParam(defaultValue = "false") boolean unreadOnly,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        // 구현 필요
    }
}
```

---

#### PUT `/api/notifications/{notificationId}/read`
알림 읽음 처리

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "알림이 읽음 처리되었습니다.",
  "timestamp": "2026-02-05T15:26:00Z"
}
```

**Spring Boot Controller**:
```java
@PutMapping("/{notificationId}/read")
public ResponseEntity<ApiResponse<Void>> markAsRead(
    @PathVariable String notificationId
) {
    // 구현 필요
}
```

---

#### PUT `/api/notifications/read-all`
모든 알림 읽음 처리

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "모든 알림이 읽음 처리되었습니다.",
  "data": {
    "markedCount": 5
  },
  "timestamp": "2026-02-05T15:27:00Z"
}
```

---

### 1.8 설정 API

#### GET `/api/settings`
시스템 설정 조회

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "language": "ko",
    "theme": "dark",
    "timezone": "Asia/Seoul",
    "dateFormat": "YYYY-MM-DD",
    "autoRefresh": true,
    "refreshInterval": 5,
    "ros2Bridge": {
      "type": "PYTHON_BRIDGE",
      "url": "ws://localhost:9090",
      "connectionStatus": "CONNECTED",
      "domainId": 0,
      "qosProfile": "DEFAULT"
    },
    "apiSettings": {
      "baseUrl": "http://localhost:8080",
      "websocketUrl": "ws://localhost:8080/ws",
      "connectionStatus": "CONNECTED"
    }
  },
  "timestamp": "2026-02-05T15:30:00Z"
}
```

**Spring Boot Controller**:
```java
@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    
    @GetMapping
    public ResponseEntity<ApiResponse<SystemSettings>> getSettings() {
        // 구현 필요
    }
}
```

---

#### PUT `/api/settings`
시스템 설정 업데이트

**Request Body**:
```json
{
  "language": "en",
  "theme": "light",
  "autoRefresh": false,
  "refreshInterval": 10
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "설정이 업데이트되었습니다.",
  "timestamp": "2026-02-05T15:35:00Z"
}
```

**Spring Boot Controller**:
```java
@PutMapping
public ResponseEntity<ApiResponse<Void>> updateSettings(
    @RequestBody @Valid SystemSettings settings
) {
    // 구현 필요
}
```

---

## 2. WebSocket 메시지 프로토콜

### 2.1 연결 설정

**엔드포인트**: `ws://localhost:8080/ws`

**Spring Boot WebSocket 설정**:
```java
// src/main/java/com/robot/config/WebSocketConfig.java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS();
    }
}
```

---

### 2.2 구독 토픽

#### `/topic/robots/status`
전체 로봇 상태 업데이트 (브로드캐스트)

**메시지 포맷**:
```json
{
  "type": "ROBOT_STATUS_UPDATE",
  "timestamp": "2026-02-05T15:40:00Z",
  "data": [
    {
      "robotId": "R-001",
      "status": "ACTIVE",
      "position": {"x": 15.5, "y": 8.2, "z": 0.0},
      "battery": 86,
      "speed": 0.5
    },
    {
      "robotId": "R-002",
      "status": "IDLE",
      "position": {"x": 3.5, "y": 12.0, "z": 0.0},
      "battery": 45,
      "speed": 0.0
    }
  ]
}
```

**Spring Boot Controller**:
```java
@Controller
public class RobotWebSocketController {
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    // ROS2에서 데이터 수신 시 호출
    public void broadcastRobotStatus(List<RobotStatusUpdate> updates) {
        WebSocketMessage message = new WebSocketMessage();
        message.setType("ROBOT_STATUS_UPDATE");
        message.setTimestamp(LocalDateTime.now());
        message.setData(updates);
        
        messagingTemplate.convertAndSend("/topic/robots/status", message);
    }
}
```

---

#### `/topic/robots/{robotId}/position`
특정 로봇 위치 업데이트

**메시지 포맷**:
```json
{
  "type": "POSITION_UPDATE",
  "robotId": "R-001",
  "timestamp": "2026-02-05T15:40:05Z",
  "data": {
    "x": 15.6,
    "y": 8.3,
    "z": 0.0,
    "orientation": {
      "yaw": 45.0,
      "pitch": 0.0,
      "roll": 0.0
    }
  }
}
```

---

#### `/topic/robots/{robotId}/sensors/{sensorType}`
센서 데이터 스트리밍

**LiDAR 예시**:
```json
{
  "type": "LIDAR_DATA",
  "robotId": "R-001",
  "sensorId": "S-001",
  "timestamp": "2026-02-05T15:40:10Z",
  "data": {
    "range": 2.3,
    "angleMin": 0,
    "angleMax": 360,
    "angleIncrement": 1,
    "ranges": [2.5, 3.1, 2.8, 2.9, 3.2, ...]
  }
}
```

**Camera 예시**:
```json
{
  "type": "CAMERA_FRAME",
  "robotId": "R-001",
  "sensorId": "S-002",
  "timestamp": "2026-02-05T15:40:15Z",
  "data": {
    "format": "jpeg",
    "width": 640,
    "height": 480,
    "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."
  }
}
```

**IMU 예시**:
```json
{
  "type": "IMU_DATA",
  "robotId": "R-001",
  "sensorId": "S-003",
  "timestamp": "2026-02-05T15:40:20Z",
  "data": {
    "orientation": {
      "yaw": 45.0,
      "pitch": 2.0,
      "roll": -1.0
    },
    "acceleration": {
      "x": 0.2,
      "y": -0.1,
      "z": 9.8
    },
    "angularVelocity": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.5
    }
  }
}
```

---

#### `/topic/logs`
실시간 로그 스트리밍

**메시지 포맷**:
```json
{
  "type": "LOG_ENTRY",
  "timestamp": "2026-02-05T15:40:25Z",
  "data": {
    "logId": "LOG-12350",
    "level": "INFO",
    "source": "R-001",
    "message": "목표 위치 (20.0, 10.0) 도달 완료"
  }
}
```

**Spring Boot Controller**:
```java
public void broadcastLog(SystemLog log) {
    WebSocketMessage message = new WebSocketMessage();
    message.setType("LOG_ENTRY");
    message.setTimestamp(LocalDateTime.now());
    message.setData(log);
    
    messagingTemplate.convertAndSend("/topic/logs", message);
}
```

---

#### `/topic/notifications`
실시간 알림

**메시지 포맷**:
```json
{
  "type": "NEW_NOTIFICATION",
  "timestamp": "2026-02-05T15:40:30Z",
  "data": {
    "notificationId": "N-003",
    "type": "ERROR",
    "title": "R-004 LiDAR 통신 오류",
    "message": "R-004의 LiDAR 센서와 통신이 끊어졌습니다.",
    "severity": "HIGH"
  }
}
```

---

### 2.3 클라이언트에서 서버로 메시지 전송

#### `/app/robots/{robotId}/control`
로봇 제어 명령 전송

**메시지 포맷**:
```json
{
  "command": "MOVE",
  "parameters": {
    "direction": "FORWARD",
    "speed": 0.5,
    "duration": 5
  }
}
```

**Spring Boot Controller**:
```java
@MessageMapping("/robots/{robotId}/control")
public void handleRobotControl(
    @DestinationVariable String robotId,
    @Payload ControlCommand command
) {
    // ROS2로 명령 전송
    // 결과를 개별 사용자에게 응답
    messagingTemplate.convertAndSendToUser(
        command.getUserId(),
        "/queue/control/response",
        response
    );
}
```

---

## 3. 데이터베이스 스키마

### 3.1 ERD (Entity Relationship Diagram)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     User        │       │     Robot       │       │     Sensor      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ PK user_id      │       │ PK robot_id     │       │ PK sensor_id    │
│    username     │       │    name         │───┐   │ FK robot_id     │
│    password     │       │    model        │   │   │    type         │
│    email        │       │    manufacturer │   │   │    topic        │
│    role         │       │    status       │   │   │    status       │
│    created_at   │       │    position_x   │   │   │    frequency    │
│    updated_at   │       │    position_y   │   │   │    created_at   │
└─────────────────┘       │    position_z   │   │   │    updated_at   │
                          │    battery      │   │   └─────────────────┘
                          │    speed        │   │            │
                          │    last_comm    │   │            │
                          │    created_at   │   │            │
                          │    updated_at   │   │            │
                          └─────────────────┘   │            │
                                  │             │            │
                                  │             │            │
                          ┌───────┴─────┐       └────────────┘
                          │             │
                  ┌───────▼─────┐ ┌─────▼──────────┐
                  │ ROS2Config  │ │  SensorData    │
                  ├─────────────┤ ├────────────────┤
                  │ PK config_id│ │ PK data_id     │
                  │ FK robot_id │ │ FK sensor_id   │
                  │    node_name│ │    data_json   │
                  │    namespace│ │    timestamp   │
                  │    topic_pre│ └────────────────┘
                  │    domain_id│
                  │    qos_prof │
                  └─────────────┘

┌─────────────────┐       ┌─────────────────┐
│   SystemLog     │       │  Notification   │
├─────────────────┤       ├─────────────────┤
│ PK log_id       │       │ PK notif_id     │
│ FK robot_id     │       │    type         │
│    level        │       │    title        │
│    source       │       │    message      │
│    message      │       │    is_read      │
│    metadata     │       │    severity     │
│    timestamp    │       │    timestamp    │
└─────────────────┘       └─────────────────┘
```

---

### 3.2 테이블 정의 (Spring Boot Entity)

#### User 엔티티
```java
// src/main/java/com/robot/entity/User.java
@Entity
@Table(name = "users")
@Getter @Setter
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password; // BCrypt 해시
    
    @Column(unique = true)
    private String email;
    
    @Enumerated(EnumType.STRING)
    private UserRole role; // ADMIN, OPERATOR, VIEWER
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

---

#### Robot 엔티티
```java
// src/main/java/com/robot/entity/Robot.java
@Entity
@Table(name = "robots")
@Getter @Setter
public class Robot {
    
    @Id
    @Column(name = "robot_id")
    private String robotId; // R-001, R-002 등
    
    @Column(nullable = false)
    private String name;
    
    private String model;
    
    private String manufacturer;
    
    @Enumerated(EnumType.STRING)
    private RobotStatus status; // ACTIVE, IDLE, ERROR, INACTIVE
    
    @Column(name = "position_x")
    private Double positionX;
    
    @Column(name = "position_y")
    private Double positionY;
    
    @Column(name = "position_z")
    private Double positionZ;
    
    private Integer battery; // 0-100
    
    private Double speed;
    
    @Column(name = "last_communication")
    private LocalDateTime lastCommunication;
    
    @OneToOne(mappedBy = "robot", cascade = CascadeType.ALL)
    private ROS2Config ros2Config;
    
    @OneToMany(mappedBy = "robot", cascade = CascadeType.ALL)
    private List<Sensor> sensors = new ArrayList<>();
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

public enum RobotStatus {
    ACTIVE, IDLE, ERROR, INACTIVE
}
```

---

#### ROS2Config 엔티티
```java
// src/main/java/com/robot/entity/ROS2Config.java
@Entity
@Table(name = "ros2_configs")
@Getter @Setter
public class ROS2Config {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long configId;
    
    @OneToOne
    @JoinColumn(name = "robot_id")
    private Robot robot;
    
    @Column(name = "node_name")
    private String nodeName;
    
    private String namespace;
    
    @Column(name = "topic_prefix")
    private String topicPrefix;
    
    @Column(name = "domain_id")
    private Integer domainId = 0;
    
    @Column(name = "qos_profile")
    private String qosProfile = "DEFAULT";
}
```

---

#### Sensor 엔티티
```java
// src/main/java/com/robot/entity/Sensor.java
@Entity
@Table(name = "sensors")
@Getter @Setter
public class Sensor {
    
    @Id
    @Column(name = "sensor_id")
    private String sensorId; // S-001, S-002 등
    
    @ManyToOne
    @JoinColumn(name = "robot_id")
    private Robot robot;
    
    @Enumerated(EnumType.STRING)
    private SensorType type; // LIDAR, CAMERA, IMU, GPS
    
    private String topic; // ROS2 Topic 경로
    
    @Enumerated(EnumType.STRING)
    private SensorStatus status; // ACTIVE, INACTIVE, ERROR
    
    private Integer frequency; // Hz
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

public enum SensorType {
    LIDAR, CAMERA, IMU, GPS, ULTRASONIC
}

public enum SensorStatus {
    ACTIVE, INACTIVE, ERROR
}
```

---

#### SensorData 엔티티
```java
// src/main/java/com/robot/entity/SensorData.java
@Entity
@Table(name = "sensor_data", indexes = {
    @Index(name = "idx_sensor_timestamp", columnList = "sensor_id,timestamp")
})
@Getter @Setter
public class SensorData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dataId;
    
    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;
    
    @Column(columnDefinition = "TEXT")
    private String dataJson; // JSON 형식으로 센서 데이터 저장
    
    private LocalDateTime timestamp;
    
    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
```

---

#### SystemLog 엔티티
```java
// src/main/java/com/robot/entity/SystemLog.java
@Entity
@Table(name = "system_logs", indexes = {
    @Index(name = "idx_timestamp", columnList = "timestamp"),
    @Index(name = "idx_level", columnList = "level")
})
@Getter @Setter
public class SystemLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;
    
    @ManyToOne
    @JoinColumn(name = "robot_id")
    private Robot robot; // nullable (시스템 로그인 경우)
    
    @Enumerated(EnumType.STRING)
    private LogLevel level; // DEBUG, INFO, WARN, ERROR
    
    private String source; // 로그 소스 (R-001, SYSTEM 등)
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Column(columnDefinition = "TEXT")
    private String metadata; // JSON 형식의 추가 정보
    
    private LocalDateTime timestamp;
    
    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}

public enum LogLevel {
    DEBUG, INFO, WARN, ERROR
}
```

---

#### Notification 엔티티
```java
// src/main/java/com/robot/entity/Notification.java
@Entity
@Table(name = "notifications")
@Getter @Setter
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type; // SUCCESS, INFO, WARNING, ERROR
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Column(name = "is_read")
    private Boolean isRead = false;
    
    @Enumerated(EnumType.STRING)
    private NotificationSeverity severity; // LOW, MEDIUM, HIGH
    
    private LocalDateTime timestamp;
    
    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}

public enum NotificationType {
    SUCCESS, INFO, WARNING, ERROR
}

public enum NotificationSeverity {
    LOW, MEDIUM, HIGH
}
```

---

## 4. Spring Boot Controller 구현 가이드

### 4.1 공통 응답 래퍼 클래스

```java
// src/main/java/com/robot/dto/ApiResponse.java
@Getter @Setter
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private LocalDateTime timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setData(data);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
    
    public static <T> ApiResponse<T> success(T data, String message) {
        ApiResponse<T> response = ApiResponse.success(data);
        response.setMessage(message);
        return response;
    }
    
    public static <T> ApiResponse<T> error(String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(false);
        response.setMessage(message);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
}
```

---

### 4.2 전역 예외 처리

```java
// src/main/java/com/robot/exception/GlobalExceptionHandler.java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(
        ResourceNotFoundException ex
    ) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(ex.getMessage()));
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(
        ValidationException ex
    ) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ApiResponse.error(ex.getMessage()));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(
        Exception ex
    ) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponse.error("서버 오류가 발생했습니다."));
    }
}
```

---

### 4.3 CORS 설정

```java
// src/main/java/com/robot/config/CorsConfig.java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
```

---

### 4.4 Service 레이어 예시

```java
// src/main/java/com/robot/service/RobotService.java
@Service
@RequiredArgsConstructor
public class RobotService {
    
    private final RobotRepository robotRepository;
    private final ROS2BridgeService ros2BridgeService;
    
    public Page<RobotDTO> getAllRobots(
        RobotStatus status, 
        String search, 
        Pageable pageable
    ) {
        // Repository 쿼리 및 DTO 변환
        Page<Robot> robots;
        
        if (status != null && search != null) {
            robots = robotRepository.findByStatusAndNameContaining(
                status, search, pageable
            );
        } else if (status != null) {
            robots = robotRepository.findByStatus(status, pageable);
        } else if (search != null) {
            robots = robotRepository.findByNameContaining(search, pageable);
        } else {
            robots = robotRepository.findAll(pageable);
        }
        
        return robots.map(this::convertToDTO);
    }
    
    public RobotDTO createRobot(RobotCreateRequest request) {
        // 1. 엔티티 생성
        Robot robot = new Robot();
        robot.setRobotId(request.getRobotId());
        robot.setName(request.getName());
        robot.setModel(request.getModel());
        robot.setStatus(RobotStatus.INACTIVE);
        
        // 2. ROS2 설정 추가
        ROS2Config config = new ROS2Config();
        config.setRobot(robot);
        config.setNodeName(request.getRos2Config().getNodeName());
        config.setNamespace(request.getRos2Config().getNamespace());
        robot.setRos2Config(config);
        
        // 3. 저장
        Robot savedRobot = robotRepository.save(robot);
        
        // 4. ROS2 브리지 초기화
        ros2BridgeService.initializeRobot(savedRobot);
        
        return convertToDTO(savedRobot);
    }
    
    private RobotDTO convertToDTO(Robot robot) {
        // ModelMapper 또는 수동 변환
        RobotDTO dto = new RobotDTO();
        dto.setRobotId(robot.getRobotId());
        dto.setName(robot.getName());
        dto.setStatus(robot.getStatus());
        // ... 나머지 필드
        return dto;
    }
}
```

---

### 4.5 Repository 예시

```java
// src/main/java/com/robot/repository/RobotRepository.java
@Repository
public interface RobotRepository extends JpaRepository<Robot, String> {
    
    Page<Robot> findByStatus(RobotStatus status, Pageable pageable);
    
    Page<Robot> findByNameContaining(String name, Pageable pageable);
    
    Page<Robot> findByStatusAndNameContaining(
        RobotStatus status, 
        String name, 
        Pageable pageable
    );
    
    List<Robot> findByStatus(RobotStatus status);
    
    @Query("SELECT COUNT(r) FROM Robot r WHERE r.status = :status")
    long countByStatus(@Param("status") RobotStatus status);
}
```

---

## 5. Vue 컴포넌트 상태 변수 및 구현 가이드

### 5.1 Pinia Store 구조

#### Robot Store
```typescript
// src/stores/robotStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Robot, RobotStatus } from '@/types/robot'
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
      robots.value = response.data.content
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
      selectedRobot.value = response.data
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
      robots.value.push(response.data)
      return response.data
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
      const index = robots.value.findIndex(r => r.robotId === robotId)
      if (index !== -1) {
        robots.value[index] = response.data
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
```

---

#### WebSocket Store
```typescript
// src/stores/websocketStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useRobotStore } from './robotStore'
import { useLogStore } from './logStore'
import { useNotificationStore } from './notificationStore'

export const useWebSocketStore = defineStore('websocket', () => {
  const client = ref<Client | null>(null)
  const connected = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  
  function connect() {
    const socket = new SockJS('http://localhost:8080/ws')
    
    client.value = new Client({
      webSocketFactory: () => socket,
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
    const logStore = useLogStore()
    const notificationStore = useNotificationStore()
    
    // 로봇 상태 업데이트 구독
    client.value.subscribe('/topic/robots/status', (message) => {
      const data = JSON.parse(message.body)
      robotStore.updateRobotStatus(data.data)
    })
    
    // 로그 스트리밍 구독
    client.value.subscribe('/topic/logs', (message) => {
      const data = JSON.parse(message.body)
      logStore.addLog(data.data)
    })
    
    // 알림 구독
    client.value.subscribe('/topic/notifications', (message) => {
      const data = JSON.parse(message.body)
      notificationStore.addNotification(data.data)
    })
  }
  
  function subscribeToRobot(robotId: string) {
    if (!client.value) return
    
    // 특정 로봇 위치 업데이트
    client.value.subscribe(`/topic/robots/${robotId}/position`, (message) => {
      const data = JSON.parse(message.body)
      // 처리 로직
    })
    
    // 센서 데이터 구독
    client.value.subscribe(`/topic/robots/${robotId}/sensors/lidar`, (message) => {
      const data = JSON.parse(message.body)
      // LiDAR 데이터 처리
    })
    
    client.value.subscribe(`/topic/robots/${robotId}/sensors/camera`, (message) => {
      const data = JSON.parse(message.body)
      // Camera 데이터 처리
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
```

---

### 5.2 Vue 컴포넌트별 상태 변수

#### Dashboard.vue
```vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRobotStore } from '@/stores/robotStore'
import { useLogStore } from '@/stores/logStore'
import { useWebSocketStore } from '@/stores/websocketStore'

// Stores
const robotStore = useRobotStore()
const logStore = useLogStore()
const wsStore = useWebSocketStore()

// State
const loading = ref(true)
const refreshing = ref(false)

// Computed
const summary = computed(() => ({
  activeRobots: robotStore.robotCount.active,
  totalRobots: robotStore.robotCount.total,
  activePercentage: Math.round(
    (robotStore.robotCount.active / robotStore.robotCount.total) * 100
  ),
  totalSensors: robotStore.robots.reduce(
    (sum, robot) => sum + robot.sensors.length, 
    0
  ),
  unreadNotifications: 2 // notificationStore에서 가져오기
}))

const recentLogs = computed(() => 
  logStore.logs.slice(0, 5)
)

// Methods
async function fetchData() {
  loading.value = true
  try {
    await Promise.all([
      robotStore.fetchRobots(),
      logStore.fetchLogs({ page: 0, size: 100 })
    ])
  } finally {
    loading.value = false
  }
}

async function handleRefresh() {
  refreshing.value = true
  await fetchData()
  refreshing.value = false
}

// Lifecycle
onMounted(async () => {
  await fetchData()
  wsStore.connect()
})
</script>

<template>
  <div class="dashboard">
    <!-- 요약 카드 -->
    <div class="summary-cards">
      <SummaryCard
        title="활성 로봇"
        :value="`${summary.activeRobots}/${summary.totalRobots}`"
        :percentage="summary.activePercentage"
        icon="robot"
      />
      <SummaryCard
        title="총 센서 수"
        :value="summary.totalSensors"
        icon="sensor"
      />
      <!-- ... -->
    </div>
    
    <!-- 로봇 상태 테이블 -->
    <RobotStatusTable :robots="robotStore.robots" />
    
    <!-- 로그 스트림 -->
    <LogStream :logs="recentLogs" />
  </div>
</template>
```

**필요한 상태 변수**:
- `loading`: 초기 로딩 상태
- `refreshing`: 새로고침 중 상태
- `summary`: 대시보드 요약 통계 (computed)
- `recentLogs`: 최근 로그 (computed)

---

#### RobotControl.vue
```vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRobotStore } from '@/stores/robotStore'
import { useWebSocketStore } from '@/stores/websocketStore'
import { robotApi } from '@/api/robotApi'

const robotStore = useRobotStore()
const wsStore = useWebSocketStore()

// State
const selectedRobotId = ref<string | null>(null)
const controlMode = ref<'manual' | 'auto'>('manual')
const speed = ref(0.5)
const cameraStream = ref<string | null>(null)
const sensorData = ref({
  lidar: null,
  imu: null,
  gps: null
})

// Methods
function selectRobot(robotId: string) {
  selectedRobotId.value = robotId
  const robot = robotStore.robots.find(r => r.robotId === robotId)
  if (robot) {
    robotStore.selectRobot(robot)
    wsStore.subscribeToRobot(robotId)
  }
}

function moveRobot(direction: 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT') {
  if (!selectedRobotId.value) return
  
  wsStore.sendCommand(selectedRobotId.value, {
    command: 'MOVE',
    parameters: {
      direction,
      speed: speed.value,
      duration: 0 // 계속 이동
    }
  })
}

function stopRobot() {
  if (!selectedRobotId.value) return
  
  wsStore.sendCommand(selectedRobotId.value, {
    command: 'STOP'
  })
}

async function emergencyStop() {
  if (!selectedRobotId.value) return
  
  await robotApi.emergencyStop(selectedRobotId.value)
}

// Watch
watch(selectedRobotId, (newId) => {
  if (newId) {
    // 카메라 스트림 시작
    // 센서 데이터 구독
  }
})

onMounted(() => {
  robotStore.fetchRobots()
})
</script>

<template>
  <div class="robot-control">
    <!-- 로봇 목록 사이드바 -->
    <RobotListSidebar
      :robots="robotStore.robots"
      :selected-id="selectedRobotId"
      @select="selectRobot"
    />
    
    <!-- 제어 패널 -->
    <div v-if="robotStore.selectedRobot" class="control-panel">
      <!-- 카메라 피드 -->
      <CameraFeed :stream="cameraStream" />
      
      <!-- 방향키 제어 -->
      <DirectionalControl
        @move="moveRobot"
        @stop="stopRobot"
      />
      
      <!-- 속도 슬라이더 -->
      <v-slider
        v-model="speed"
        :min="0"
        :max="1"
        :step="0.1"
        label="속도"
      />
      
      <!-- 센서 데이터 -->
      <SensorDataPanel :data="sensorData" />
    </div>
  </div>
</template>
```

**필요한 상태 변수**:
- `selectedRobotId`: 선택된 로봇 ID
- `controlMode`: 제어 모드 ('manual' | 'auto')
- `speed`: 이동 속도 (0-1)
- `cameraStream`: 카메라 스트림 URL
- `sensorData`: 센서 데이터 객체

---

#### MapView.vue
```vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRobotStore } from '@/stores/robotStore'

const robotStore = useRobotStore()

// State
const mapCanvas = ref<HTMLCanvasElement | null>(null)
const zoom = ref(1)
const pan = ref({ x: 0, y: 0 })
const selectedRobotId = ref<string | null>(null)
const showGrid = ref(true)
const showPath = ref(true)

// Methods
function drawMap() {
  if (!mapCanvas.value) return
  
  const ctx = mapCanvas.value.getContext('2d')
  if (!ctx) return
  
  // 캔버스 초기화
  ctx.clearRect(0, 0, mapCanvas.value.width, mapCanvas.value.height)
  
  // 그리드 그리기
  if (showGrid.value) {
    drawGrid(ctx)
  }
  
  // 로봇 위치 그리기
  robotStore.robots.forEach(robot => {
    drawRobot(ctx, robot)
  })
  
  // 경로 그리기
  if (showPath.value && selectedRobotId.value) {
    drawPath(ctx, selectedRobotId.value)
  }
}

function drawRobot(ctx: CanvasRenderingContext2D, robot: Robot) {
  const x = robot.position.x * zoom.value + pan.value.x
  const y = robot.position.y * zoom.value + pan.value.y
  
  // 로봇 상태에 따른 색상
  const color = {
    'ACTIVE': '#4CAF50',
    'IDLE': '#FF9800',
    'ERROR': '#F44336',
    'INACTIVE': '#9E9E9E'
  }[robot.status]
  
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2)
  ctx.fill()
}

function handleCanvasClick(event: MouseEvent) {
  const rect = mapCanvas.value?.getBoundingClientRect()
  if (!rect) return
  
  const x = (event.clientX - rect.left - pan.value.x) / zoom.value
  const y = (event.clientY - rect.top - pan.value.y) / zoom.value
  
  // 목표 위치 설정
  if (selectedRobotId.value) {
    setGoal(selectedRobotId.value, x, y)
  }
}

async function setGoal(robotId: string, x: number, y: number) {
  await robotApi.navigateToGoal(robotId, {
    targetX: x,
    targetY: y,
    targetZ: 0,
    speed: 0.5
  })
}

// Watch
watch(() => robotStore.robots, () => {
  drawMap()
}, { deep: true })

onMounted(() => {
  robotStore.fetchRobots()
  drawMap()
})
</script>

<template>
  <div class="map-view">
    <div class="map-controls">
      <v-btn @click="zoom += 0.1">+</v-btn>
      <v-btn @click="zoom -= 0.1">-</v-btn>
      <v-checkbox v-model="showGrid" label="그리드" />
      <v-checkbox v-model="showPath" label="경로" />
    </div>
    
    <canvas
      ref="mapCanvas"
      width="800"
      height="600"
      @click="handleCanvasClick"
    />
    
    <RobotInfoPanel
      v-if="selectedRobotId"
      :robot-id="selectedRobotId"
    />
  </div>
</template>
```

**필요한 상태 변수**:
- `mapCanvas`: Canvas 요소 참조
- `zoom`: 줌 레벨
- `pan`: 팬 오프셋 {x, y}
- `selectedRobotId`: 선택된 로봇 ID
- `showGrid`: 그리드 표시 여부
- `showPath`: 경로 표시 여부

---

#### EquipmentManagement.vue
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRobotStore } from '@/stores/robotStore'

const robotStore = useRobotStore()

// State
const activeTab = ref('robots') // 'robots' | 'sensors' | 'cameras' | 'others'
const searchQuery = ref('')
const showCreateDialog = ref(false)
const editingRobot = ref<Robot | null>(null)

// Form state
const robotForm = ref({
  robotId: '',
  name: '',
  model: '',
  manufacturer: '',
  ros2Config: {
    nodeName: '',
    namespace: '',
    topicPrefix: '',
    domainId: 0,
    qosProfile: 'DEFAULT'
  },
  sensors: []
})

// Computed
const filteredRobots = computed(() => {
  if (!searchQuery.value) return robotStore.robots
  
  return robotStore.robots.filter(robot =>
    robot.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    robot.robotId.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
function openCreateDialog() {
  showCreateDialog.value = true
  resetForm()
}

function openEditDialog(robot: Robot) {
  editingRobot.value = robot
  showCreateDialog.value = true
  // 폼에 로봇 데이터 채우기
  Object.assign(robotForm.value, robot)
}

async function handleSubmit() {
  try {
    if (editingRobot.value) {
      await robotStore.updateRobot(
        editingRobot.value.robotId,
        robotForm.value
      )
    } else {
      await robotStore.createRobot(robotForm.value)
    }
    showCreateDialog.value = false
  } catch (error) {
    console.error('Failed to save robot:', error)
  }
}

async function handleDelete(robotId: string) {
  if (confirm('정말 삭제하시겠습니까?')) {
    await robotStore.deleteRobot(robotId)
  }
}

function resetForm() {
  editingRobot.value = null
  robotForm.value = {
    robotId: '',
    name: '',
    model: '',
    manufacturer: '',
    ros2Config: {
      nodeName: '',
      namespace: '',
      topicPrefix: '',
      domainId: 0,
      qosProfile: 'DEFAULT'
    },
    sensors: []
  }
}

onMounted(() => {
  robotStore.fetchRobots()
})
</script>

<template>
  <div class="equipment-management">
    <v-tabs v-model="activeTab">
      <v-tab value="robots">로봇</v-tab>
      <v-tab value="sensors">센서</v-tab>
      <v-tab value="cameras">카메라</v-tab>
      <v-tab value="others">기타</v-tab>
    </v-tabs>
    
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="searchQuery"
          label="검색"
          prepend-icon="mdi-magnify"
        />
        <v-btn @click="openCreateDialog">
          + 새 로봇 등록
        </v-btn>
      </v-card-title>
      
      <v-data-table
        :items="filteredRobots"
        :headers="[
          { title: 'ID', value: 'robotId' },
          { title: '이름', value: 'name' },
          { title: '모델', value: 'model' },
          { title: '상태', value: 'status' },
          { title: '등록일', value: 'createdAt' },
          { title: '작업', value: 'actions', sortable: false }
        ]"
      >
        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            @click="openEditDialog(item)"
          />
          <v-btn
            icon="mdi-delete"
            @click="handleDelete(item.robotId)"
          />
        </template>
      </v-data-table>
    </v-card>
    
    <!-- 생성/수정 다이얼로그 -->
    <v-dialog v-model="showCreateDialog" max-width="600">
      <v-card>
        <v-card-title>
          {{ editingRobot ? '로봇 수정' : '새 로봇 등록' }}
        </v-card-title>
        
        <v-card-text>
          <RobotForm v-model="robotForm" />
        </v-card-text>
        
        <v-card-actions>
          <v-btn @click="showCreateDialog = false">취소</v-btn>
          <v-btn @click="handleSubmit">
            {{ editingRobot ? '수정' : '등록' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
```

**필요한 상태 변수**:
- `activeTab`: 현재 탭 ('robots' | 'sensors' | 'cameras' | 'others')
- `searchQuery`: 검색어
- `showCreateDialog`: 생성/수정 다이얼로그 표시 여부
- `editingRobot`: 수정 중인 로봇 객체
- `robotForm`: 로봇 폼 데이터

---

#### MonitoringLogs.vue
```vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useLogStore } from '@/stores/logStore'

const logStore = useLogStore()

// State
const dateRange = ref({
  start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7일 전
  end: new Date()
})
const selectedLevel = ref<LogLevel | null>(null)
const selectedRobot = ref<string | null>(null)
const isPaused = ref(false)
const autoScroll = ref(true)

// Methods
async function fetchLogs() {
  await logStore.fetchLogs({
    startDate: dateRange.value.start.toISOString(),
    endDate: dateRange.value.end.toISOString(),
    level: selectedLevel.value,
    robotId: selectedRobot.value,
    page: 0,
    size: 1000
  })
}

function exportLogs() {
  const csv = logStore.logs.map(log =>
    `${log.timestamp},${log.level},${log.source},${log.message}`
  ).join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'logs.csv'
  a.click()
}

onMounted(() => {
  fetchLogs()
})
</script>

<template>
  <div class="monitoring-logs">
    <!-- 필터 -->
    <div class="filters">
      <v-date-picker v-model="dateRange" range />
      <v-select
        v-model="selectedLevel"
        :items="['DEBUG', 'INFO', 'WARN', 'ERROR']"
        label="레벨"
      />
      <v-btn @click="fetchLogs">적용</v-btn>
      <v-btn @click="exportLogs">내보내기</v-btn>
    </div>
    
    <!-- 로그 스트림 -->
    <div class="log-stream">
      <div
        v-for="log in logStore.logs"
        :key="log.logId"
        :class="['log-entry', `log-${log.level.toLowerCase()}`]"
      >
        <span class="timestamp">{{ log.timestamp }}</span>
        <span class="level">[{{ log.level }}]</span>
        <span class="source">{{ log.source }}</span>
        <span class="message">{{ log.message }}</span>
      </div>
    </div>
    
    <!-- 성능 그래프 -->
    <SystemPerformanceCharts />
  </div>
</template>
```

**필요한 상태 변수**:
- `dateRange`: 날짜 범위 {start, end}
- `selectedLevel`: 선택된 로그 레벨
- `selectedRobot`: 선택된 로봇 ID
- `isPaused`: 로그 스트림 일시정지 여부
- `autoScroll`: 자동 스크롤 여부

---

### 5.3 API 클라이언트

```typescript
// src/api/robotApi.ts
import axios from 'axios'
import type { ApiResponse, Robot, RobotCreateRequest } from '@/types'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor: 토큰 추가
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const robotApi = {
  getAllRobots: (params?: any) =>
    apiClient.get<ApiResponse<PaginatedResponse<Robot>>>('/robots', { params }),
  
  getRobotById: (robotId: string) =>
    apiClient.get<ApiResponse<Robot>>(`/robots/${robotId}`),
  
  createRobot: (data: RobotCreateRequest) =>
    apiClient.post<ApiResponse<Robot>>('/robots', data),
  
  updateRobot: (robotId: string, data: RobotUpdateRequest) =>
    apiClient.put<ApiResponse<Robot>>(`/robots/${robotId}`, data),
  
  deleteRobot: (robotId: string) =>
    apiClient.delete<ApiResponse<void>>(`/robots/${robotId}`),
  
  moveRobot: (robotId: string, command: MoveCommand) =>
    apiClient.post(`/robots/${robotId}/control/move`, command),
  
  navigateToGoal: (robotId: string, goal: GoToCommand) =>
    apiClient.post(`/robots/${robotId}/control/goto`, goal),
  
  emergencyStop: (robotId: string) =>
    apiClient.post(`/robots/${robotId}/control/emergency-stop`)
}
```

---

## 6. 에러 코드 정의

### 6.1 HTTP 상태 코드

| 코드 | 의미 | 사용 사례 |
|------|------|-----------|
| 200 | OK | 성공적인 GET, PUT, DELETE |
| 201 | Created | 성공적인 POST (리소스 생성) |
| 400 | Bad Request | 잘못된 요청 (유효성 검증 실패) |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 409 | Conflict | 리소스 충돌 (중복 ID 등) |
| 500 | Internal Server Error | 서버 오류 |
| 503 | Service Unavailable | ROS2 연결 끊김 |

---

### 6.2 커스텀 에러 코드

```json
{
  "success": false,
  "errorCode": "ROBOT_NOT_FOUND",
  "message": "로봇을 찾을 수 없습니다.",
  "timestamp": "2026-02-05T16:00:00Z"
}
```

**에러 코드 목록**:
- `ROBOT_NOT_FOUND`: 로봇을 찾을 수 없음
- `ROBOT_ALREADY_EXISTS`: 로봇 ID 중복
- `ROBOT_NOT_RESPONDING`: 로봇 응답 없음
- `SENSOR_ERROR`: 센서 오류
- `ROS2_CONNECTION_FAILED`: ROS2 연결 실패
- `INVALID_COMMAND`: 잘못된 제어 명령
- `BATTERY_LOW`: 배터리 부족 (제어 불가)
- `UNAUTHORIZED`: 인증 실패
- `PERMISSION_DENIED`: 권한 없음

---

## 7. 다음 단계

이 문서를 기반으로 다음 작업을 진행할 수 있습니다:

1. **Spring Boot 프로젝트 생성**
   - Maven dependencies 추가
   - Entity, Repository, Service, Controller 구현
   - WebSocket 설정
   - CORS 설정

2. **Vue 프로젝트 생성**
   - Vite + Vue3 + TypeScript
   - Pinia, Axios, Vuetify 설치
   - 컴포넌트 구조 생성
   - API 클라이언트 구현

3. **데이터베이스 설정**
   - PostgreSQL 또는 MySQL 설치
   - 스키마 생성 (JPA Auto DDL)

4. **ROS2 브리지 구현**
   - Python rosbridge_suite 설치
   - 또는 Java rcljava 연동

---

**문서 버전**: 1.0  
**작성일**: 2026-02-05  
**작성자**: Claude (Anthropic AI)  
**프로젝트**: Robot Control System API Specification
