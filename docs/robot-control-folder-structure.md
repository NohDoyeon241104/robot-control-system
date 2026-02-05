# 로봇 제어 시스템 - 프로젝트 폴더 구조

## 목차
1. [전체 프로젝트 구조](#1-전체-프로젝트-구조)
2. [Spring Boot 백엔드 구조](#2-spring-boot-백엔드-구조)
3. [Vue 프론트엔드 구조](#3-vue-프론트엔드-구조)
4. [프로젝트 생성 명령어](#4-프로젝트-생성-명령어)
5. [핵심 파일 설명](#5-핵심-파일-설명)

---

## 1. 전체 프로젝트 구조

```
D:/robot-control-system/
├── backend-springboot/          # Spring Boot 프로젝트
│   ├── src/
│   ├── pom.xml
│   └── README.md
│
├── frontend-vue/                # Vue.js 프로젝트
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docs/                        # 문서 모음
│   ├── api-specification.md
│   ├── ui-wireframe.md
│   ├── database-schema.sql
│   └── deployment-guide.md
│
└── README.md                    # 프로젝트 전체 README
```

---

## 2. Spring Boot 백엔드 구조

### 2.1 전체 폴더 구조

```
backend-springboot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── robot/
│   │   │           ├── RobotControlApplication.java    # 메인 애플리케이션
│   │   │           │
│   │   │           ├── config/                         # 설정 클래스
│   │   │           │   ├── CorsConfig.java
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── WebSocketConfig.java
│   │   │           │   ├── JpaConfig.java
│   │   │           │   └── ROS2BridgeConfig.java
│   │   │           │
│   │   │           ├── controller/                     # REST 컨트롤러
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── RobotController.java
│   │   │           │   ├── SensorController.java
│   │   │           │   ├── DashboardController.java
│   │   │           │   ├── LogController.java
│   │   │           │   ├── NotificationController.java
│   │   │           │   └── SettingsController.java
│   │   │           │
│   │   │           ├── websocket/                      # WebSocket 컨트롤러
│   │   │           │   ├── RobotWebSocketController.java
│   │   │           │   ├── SensorWebSocketController.java
│   │   │           │   └── LogWebSocketController.java
│   │   │           │
│   │   │           ├── service/                        # 비즈니스 로직
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── RobotService.java
│   │   │           │   ├── SensorService.java
│   │   │           │   ├── DashboardService.java
│   │   │           │   ├── LogService.java
│   │   │           │   ├── NotificationService.java
│   │   │           │   └── SettingsService.java
│   │   │           │
│   │   │           ├── service/ros2/                   # ROS2 관련 서비스
│   │   │           │   ├── ROS2BridgeService.java
│   │   │           │   ├── ROS2CommandService.java
│   │   │           │   ├── ROS2DataSubscriber.java
│   │   │           │   └── ROS2ConnectionManager.java
│   │   │           │
│   │   │           ├── repository/                     # JPA Repository
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── RobotRepository.java
│   │   │           │   ├── SensorRepository.java
│   │   │           │   ├── SensorDataRepository.java
│   │   │           │   ├── SystemLogRepository.java
│   │   │           │   ├── NotificationRepository.java
│   │   │           │   └── ROS2ConfigRepository.java
│   │   │           │
│   │   │           ├── entity/                         # JPA 엔티티
│   │   │           │   ├── User.java
│   │   │           │   ├── Robot.java
│   │   │           │   ├── ROS2Config.java
│   │   │           │   ├── Sensor.java
│   │   │           │   ├── SensorData.java
│   │   │           │   ├── SystemLog.java
│   │   │           │   └── Notification.java
│   │   │           │
│   │   │           ├── dto/                            # 데이터 전송 객체
│   │   │           │   ├── request/
│   │   │           │   │   ├── LoginRequest.java
│   │   │           │   │   ├── RobotCreateRequest.java
│   │   │           │   │   ├── RobotUpdateRequest.java
│   │   │           │   │   ├── MoveCommand.java
│   │   │           │   │   ├── GoToCommand.java
│   │   │           │   │   └── SettingsUpdateRequest.java
│   │   │           │   │
│   │   │           │   ├── response/
│   │   │           │   │   ├── ApiResponse.java
│   │   │           │   │   ├── LoginResponse.java
│   │   │           │   │   ├── RobotDTO.java
│   │   │           │   │   ├── SensorDTO.java
│   │   │           │   │   ├── DashboardSummary.java
│   │   │           │   │   ├── RobotStatusSummary.java
│   │   │           │   │   ├── CommandResponse.java
│   │   │           │   │   └── NavigationResponse.java
│   │   │           │   │
│   │   │           │   └── websocket/
│   │   │           │       ├── WebSocketMessage.java
│   │   │           │       ├── RobotStatusUpdate.java
│   │   │           │       ├── SensorDataMessage.java
│   │   │           │       └── LogMessage.java
│   │   │           │
│   │   │           ├── mapper/                         # DTO <-> Entity 변환
│   │   │           │   ├── RobotMapper.java
│   │   │           │   ├── SensorMapper.java
│   │   │           │   └── UserMapper.java
│   │   │           │
│   │   │           ├── exception/                      # 커스텀 예외
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── ValidationException.java
│   │   │           │   ├── ROS2ConnectionException.java
│   │   │           │   └── UnauthorizedException.java
│   │   │           │
│   │   │           ├── security/                       # 보안 관련
│   │   │           │   ├── JwtTokenProvider.java
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   └── UserDetailsServiceImpl.java
│   │   │           │
│   │   │           ├── util/                           # 유틸리티
│   │   │           │   ├── DateUtil.java
│   │   │           │   ├── JsonUtil.java
│   │   │           │   └── ValidationUtil.java
│   │   │           │
│   │   │           └── constant/                       # 상수
│   │   │               ├── RobotStatus.java            # Enum
│   │   │               ├── SensorType.java             # Enum
│   │   │               ├── LogLevel.java               # Enum
│   │   │               ├── UserRole.java               # Enum
│   │   │               └── ApiConstants.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml                         # 메인 설정 파일
│   │       ├── application-dev.yml                     # 개발 환경 설정
│   │       ├── application-prod.yml                    # 운영 환경 설정
│   │       ├── logback-spring.xml                      # 로깅 설정
│   │       │
│   │       ├── db/
│   │       │   └── migration/                          # Flyway 마이그레이션
│   │       │       ├── V1__create_users_table.sql
│   │       │       ├── V2__create_robots_table.sql
│   │       │       ├── V3__create_sensors_table.sql
│   │       │       └── V4__create_logs_table.sql
│   │       │
│   │       ├── static/                                 # 정적 리소스
│   │       │   └── docs/                               # API 문서 (Swagger UI)
│   │       │
│   │       └── templates/                              # 이메일 템플릿 등
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── robot/
│                   ├── controller/                     # Controller 테스트
│                   │   ├── RobotControllerTest.java
│                   │   └── AuthControllerTest.java
│                   │
│                   ├── service/                        # Service 테스트
│                   │   ├── RobotServiceTest.java
│                   │   └── AuthServiceTest.java
│                   │
│                   ├── repository/                     # Repository 테스트
│                   │   └── RobotRepositoryTest.java
│                   │
│                   └── integration/                    # 통합 테스트
│                       └── RobotIntegrationTest.java
│
├── pom.xml                                             # Maven 의존성 관리
├── .gitignore
├── README.md
└── Dockerfile                                          # Docker 이미지 빌드용
```

---

### 2.2 핵심 파일 내용

#### pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.robot</groupId>
    <artifactId>robot-control-backend</artifactId>
    <version>1.0.0</version>
    <name>Robot Control Backend</name>
    <description>Robot Control System Backend with ROS2 Integration</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot WebSocket -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
        
        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- Spring Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- PostgreSQL Driver -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- H2 Database (for testing) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>test</scope>
        </dependency>
        
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- ModelMapper (DTO 변환) -->
        <dependency>
            <groupId>org.modelmapper</groupId>
            <artifactId>modelmapper</artifactId>
            <version>3.2.0</version>
        </dependency>
        
        <!-- Jackson (JSON) -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        
        <!-- Flyway (DB Migration) -->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        
        <!-- Swagger/OpenAPI -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.3.0</version>
        </dependency>
        
        <!-- WebSocket Client (for ROS2 Bridge) -->
        <dependency>
            <groupId>org.java-websocket</groupId>
            <artifactId>Java-WebSocket</artifactId>
            <version>1.5.4</version>
        </dependency>
        
        <!-- MQTT Client (대안: ROS2 통신용) -->
        <dependency>
            <groupId>org.eclipse.paho</groupId>
            <artifactId>org.eclipse.paho.client.mqttv3</artifactId>
            <version>1.2.5</version>
        </dependency>
        
        <!-- Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

---

#### application.yml
```yaml
spring:
  application:
    name: robot-control-backend
  
  # 프로파일 설정
  profiles:
    active: dev
  
  # 데이터베이스 설정
  datasource:
    url: jdbc:postgresql://localhost:5432/robot_control_db
    username: robot_admin
    password: your_password
    driver-class-name: org.postgresql.Driver
    
  # JPA 설정
  jpa:
    hibernate:
      ddl-auto: validate  # Flyway 사용 시 validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect
  
  # Flyway 설정
  flyway:
    enabled: true
    baseline-on-migrate: true
    locations: classpath:db/migration
  
  # 파일 업로드 설정
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

# 서버 설정
server:
  port: 8080
  servlet:
    context-path: /
  
# 로깅 설정
logging:
  level:
    com.robot: DEBUG
    org.springframework.web: INFO
    org.hibernate: INFO
  file:
    name: logs/robot-control.log
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"

# JWT 설정
jwt:
  secret: your-secret-key-min-256-bits-long-for-security
  expiration: 86400000  # 24시간 (밀리초)
  refresh-expiration: 604800000  # 7일

# ROS2 브리지 설정
ros2:
  bridge:
    type: PYTHON_BRIDGE  # PYTHON_BRIDGE, RCLJAVA, MQTT
    url: ws://localhost:9090
    reconnect-interval: 5000
    domain-id: 0
    qos-profile: DEFAULT

# CORS 설정
cors:
  allowed-origins: http://localhost:5173
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  allow-credentials: true
  max-age: 3600

# Swagger 설정
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: method
```

---

#### RobotControlApplication.java
```java
package com.robot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RobotControlApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(RobotControlApplication.class, args);
    }
}
```

---

## 3. Vue 프론트엔드 구조

### 3.1 전체 폴더 구조

```
frontend-vue/
├── public/
│   ├── favicon.ico                         o
│   └── robots.txt                          o
│
├── src/
│   ├── main.ts                              # 앱 진입점
│   ├── App.vue                              # 루트 컴포넌트
│   │
│   ├── assets/                              # 정적 자산
│   │   ├── images/
│   │   │   ├── logo.png                    o
│   │   │   └── robot-icons/                o
│   │   │       ├── active.svg              
│   │   │       ├── idle.svg
│   │   │       └── error.svg
│   │   │
│   │   ├── styles/
│   │   │   ├── main.scss                    # 전역 스타일
│   │   │   ├── variables.scss               # CSS 변수
│   │   │   ├── mixins.scss                  # SCSS Mixins
│   │   │   └── themes/
│   │   │       ├── light.scss
│   │   │       └── dark.scss
│   │   │
│   │   └── fonts/
│   │       └── roboto/
│   │
│   ├── components/                          # 재사용 가능한 컴포넌트
│   │   ├── common/                          # 공통 컴포넌트
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppSidebar.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   ├── ErrorMessage.vue
│   │   │   ├── ConfirmDialog.vue
│   │   │   └── NotificationToast.vue
│   │   │
│   │   ├── robot/                           # 로봇 관련 컴포넌트
│   │   │   ├── RobotCard.vue
│   │   │   ├── RobotStatusBadge.vue
│   │   │   ├── RobotListSidebar.vue
│   │   │   ├── RobotForm.vue
│   │   │   ├── RobotStatusTable.vue
│   │   │   └── RobotInfoPanel.vue
│   │   │
│   │   ├── control/                         # 제어 관련 컴포넌트
│   │   │   ├── DirectionalControl.vue
│   │   │   ├── SpeedSlider.vue
│   │   │   ├── ControlModeSwitch.vue
│   │   │   └── EmergencyStopButton.vue
│   │   │
│   │   ├── sensor/                          # 센서 관련 컴포넌트
│   │   │   ├── SensorDataPanel.vue
│   │   │   ├── LidarVisualization.vue
│   │   │   ├── IMUDisplay.vue
│   │   │   ├── CameraFeed.vue
│   │   │   └── GPSDisplay.vue
│   │   │
│   │   ├── map/                             # 맵 관련 컴포넌트
│   │   │   ├── MapCanvas.vue
│   │   │   ├── MapControls.vue
│   │   │   ├── MapLegend.vue
│   │   │   └── RobotMarker.vue
│   │   │
│   │   ├── dashboard/                       # 대시보드 컴포넌트
│   │   │   ├── SummaryCard.vue
│   │   │   ├── QuickActions.vue
│   │   │   ├── LogStream.vue
│   │   │   └── SystemPerformanceCharts.vue
│   │   │
│   │   ├── notification/                    # 알림 컴포넌트
│   │   │   ├── NotificationBell.vue
│   │   │   ├── NotificationDropdown.vue
│   │   │   └── NotificationItem.vue
│   │   │
│   │   └── charts/                          # 차트 컴포넌트
│   │       ├── LineChart.vue
│   │       ├── BarChart.vue
│   │       └── PieChart.vue
│   │
│   ├── views/                               # 페이지 컴포넌트
│   │   ├── Dashboard.vue                    # 대시보드 페이지
│   │   ├── RobotControl.vue                 # 로봇 제어 페이지
│   │   ├── MapView.vue                      # 맵 뷰 페이지
│   │   ├── EquipmentManagement.vue          # 장비 관리 페이지
│   │   ├── MonitoringLogs.vue               # 모니터링 및 로그 페이지
│   │   ├── Settings.vue                     # 설정 페이지
│   │   ├── Login.vue                        # 로그인 페이지
│   │   └── NotFound.vue                     # 404 페이지
│   │
│   ├── layouts/                             # 레이아웃 컴포넌트
│   │   ├── DefaultLayout.vue                # 기본 레이아웃 (헤더+사이드바)
│   │   ├── AuthLayout.vue                   # 인증 레이아웃 (로그인)
│   │   └── EmptyLayout.vue                  # 빈 레이아웃
│   │
│   ├── router/                              # Vue Router
│   │   ├── index.ts                         # 라우터 설정
│   │   ├── routes.ts                        # 라우트 정의
│   │   └── guards.ts                        # 네비게이션 가드
│   │
│   ├── stores/                              # Pinia Store
│   │   ├── index.ts                         # Store 진입점
│   │   ├── authStore.ts                     # 인증 Store
│   │   ├── robotStore.ts                    # 로봇 Store
│   │   ├── sensorStore.ts                   # 센서 Store
│   │   ├── dashboardStore.ts                # 대시보드 Store
│   │   ├── logStore.ts                      # 로그 Store
│   │   ├── notificationStore.ts             # 알림 Store
│   │   ├── settingsStore.ts                 # 설정 Store
│   │   └── websocketStore.ts                # WebSocket Store
│   │
│   ├── api/                                 # API 클라이언트
│   │   ├── index.ts                         # Axios 인스턴스 설정
│   │   ├── authApi.ts                       # 인증 API
│   │   ├── robotApi.ts                      # 로봇 API
│   │   ├── sensorApi.ts                     # 센서 API
│   │   ├── dashboardApi.ts                  # 대시보드 API
│   │   ├── logApi.ts                        # 로그 API
│   │   ├── notificationApi.ts               # 알림 API
│   │   └── settingsApi.ts                   # 설정 API
│   │
│   ├── types/                               # TypeScript 타입 정의
│   │   ├── index.ts                         # 타입 진입점
│   │   ├── robot.ts                         # 로봇 타입
│   │   ├── sensor.ts                        # 센서 타입
│   │   ├── user.ts                          # 사용자 타입
│   │   ├── api.ts                           # API 응답 타입
│   │   ├── websocket.ts                     # WebSocket 메시지 타입
│   │   └── common.ts                        # 공통 타입
│   │
│   ├── composables/                         # 재사용 가능한 Composition API
│   │   ├── useWebSocket.ts                  # WebSocket 훅
│   │   ├── useRobotControl.ts               # 로봇 제어 훅
│   │   ├── useAuth.ts                       # 인증 훅
│   │   ├── useNotification.ts               # 알림 훅
│   │   └── useTheme.ts                      # 테마 훅
│   │
│   ├── utils/                               # 유틸리티 함수
│   │   ├── date.ts                          # 날짜 포맷팅
│   │   ├── validation.ts                    # 유효성 검사
│   │   ├── format.ts                        # 데이터 포맷팅
│   │   ├── storage.ts                       # LocalStorage 헬퍼
│   │   └── constants.ts                     # 상수 정의
│   │
│   ├── plugins/                             # Vue 플러그인
│   │   ├── vuetify.ts                       # Vuetify 설정
│   │   ├── chart.ts                         # Chart.js 설정
│   │   └── i18n.ts                          # 다국어 설정 (선택)
│   │
│   └── middleware/                          # 미들웨어
│       ├── auth.ts                          # 인증 미들웨어
│       └── logger.ts                        # 로깅 미들웨어
│
├── .env                                     # 환경 변수
├── .env.development                         # 개발 환경 변수
├── .env.production                          # 운영 환경 변수
├── .gitignore
├── package.json
├── tsconfig.json                            # TypeScript 설정
├── vite.config.ts                           # Vite 설정
├── README.md
└── Dockerfile
```

---

### 3.2 핵심 파일 내용

#### package.json
```json
{
  "name": "robot-control-frontend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "axios": "^1.6.2",
    "vuetify": "^3.4.8",
    "@mdi/font": "^7.3.67",
    "chart.js": "^4.4.0",
    "vue-chartjs": "^5.2.0",
    "@stomp/stompjs": "^7.0.0",
    "sockjs-client": "^1.6.1",
    "konva": "^9.2.3",
    "vue-konva": "^3.0.2",
    "dayjs": "^1.11.10",
    "lodash-es": "^4.17.21"
  },
  "devDependencies": {
    "@types/node": "^20.10.4",
    "@types/lodash-es": "^4.17.12",
    "@types/sockjs-client": "^1.5.4",
    "@vitejs/plugin-vue": "^4.5.1",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^12.0.0",
    "eslint": "^8.54.0",
    "eslint-plugin-vue": "^9.19.2",
    "prettier": "^3.1.0",
    "sass": "^1.69.5",
    "typescript": "^5.3.3",
    "vite": "^5.0.6",
    "vue-tsc": "^1.8.25"
  }
}
```

---

#### vite.config.ts
```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['vuetify'],
          'chart-vendor': ['chart.js', 'vue-chartjs']
        }
      }
    }
  }
})
```

---

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path alias */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

#### .env
```env
# API 설정
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws

# 앱 설정
VITE_APP_TITLE=Robot Control System
VITE_APP_VERSION=1.0.0

# 기능 플래그
VITE_ENABLE_MOCK_DATA=false
VITE_ENABLE_DEBUG_MODE=false
```

---

#### main.ts
```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// 전역 스타일
import './assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
```

---

#### src/router/index.ts
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 전역 네비게이션 가드 - 로그인을 위해서 잠시 주석 260205
router.beforeEach(authGuard)

export default router
```

---

#### src/router/routes.ts
```typescript
import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      }
    ]
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'control',
        name: 'RobotControl',
        component: () => import('@/views/RobotControl.vue')
      },
      {
        path: 'map',
        name: 'MapView',
        component: () => import('@/views/MapView.vue')
      },
      {
        path: 'equipment',
        name: 'EquipmentManagement',
        component: () => import('@/views/EquipmentManagement.vue')
      },
      {
        path: 'monitoring',
        name: 'MonitoringLogs',
        component: () => import('@/views/MonitoringLogs.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes
```

---

#### src/router/guards.ts
```typescript
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
}
```

---

#### src/api/index.ts
```typescript
import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

---

## 4. 프로젝트 생성 명령어

### 4.1 Spring Boot 프로젝트 생성

**방법 1: Spring Initializr 웹사이트**
1. https://start.spring.io/ 접속
2. 다음 설정 선택:
   - Project: Maven
   - Language: Java
   - Spring Boot: 3.2.0
   - Group: com.robot
   - Artifact: robot-control-backend
   - Java: 17
   - Dependencies: Spring Web, Spring Data JPA, PostgreSQL Driver, Lombok, Spring Security, Validation, WebSocket
3. Generate 클릭 → 다운로드 → 압축 해제

**방법 2: Spring Boot CLI**
```bash
spring init \
  --dependencies=web,data-jpa,postgresql,lombok,security,validation,websocket \
  --group-id=com.robot \
  --artifact-id=robot-control-backend \
  --name=RobotControlBackend \
  --package-name=com.robot \
  --java-version=17 \
  --build=maven \
  robot-control-backend
```

**방법 3: Maven 직접 생성**
```bash
cd D:/robot-control-system
mkdir backend-springboot
cd backend-springboot

# pom.xml 직접 작성 후
mvn clean install
```

---

### 4.2 Vue 프로젝트 생성

```bash
cd D:/robot-control-system

# Vite를 사용한 Vue 프로젝트 생성
npm create vue@latest frontend-vue

# 선택 옵션:
# ✔ Add TypeScript? Yes
# ✔ Add JSX Support? No
# ✔ Add Vue Router? Yes
# ✔ Add Pinia? Yes
# ✔ Add Vitest? No (또는 Yes)
# ✔ Add ESLint? Yes
# ✔ Add Prettier? Yes

cd frontend-vue

# 의존성 설치
npm install

# 추가 패키지 설치
npm install vuetify @mdi/font
npm install axios
npm install chart.js vue-chartjs
npm install @stomp/stompjs sockjs-client
npm install konva vue-konva
npm install dayjs lodash-es

# 개발 의존성 설치
npm install -D @types/sockjs-client @types/lodash-es
npm install -D sass

# 개발 서버 실행
npm run dev
```

---

### 4.3 전체 프로젝트 초기화 스크립트

**Windows (PowerShell)**
```powershell
# 프로젝트 루트 디렉토리 생성
New-Item -ItemType Directory -Path "D:\robot-control-system"
Set-Location "D:\robot-control-system"

# docs 폴더 생성
New-Item -ItemType Directory -Path "docs"

# Spring Boot 프로젝트 생성 (Spring Initializr에서 다운로드 후 이동)
# 또는 직접 생성

# Vue 프로젝트 생성
npm create vue@latest frontend-vue

# 완료 메시지
Write-Host "프로젝트 구조가 생성되었습니다!" -ForegroundColor Green
```

**Linux/macOS (Bash)**
```bash
#!/bin/bash

# 프로젝트 루트 디렉토리 생성
mkdir -p /home/user/robot-control-system
cd /home/user/robot-control-system

# docs 폴더 생성
mkdir docs

# Vue 프로젝트 생성
npm create vue@latest frontend-vue

echo "프로젝트 구조가 생성되었습니다!"
```

---

## 5. 핵심 파일 설명

### 5.1 Spring Boot 핵심 파일

| 파일/폴더 | 설명 |
|----------|------|
| `pom.xml` | Maven 의존성 관리 파일 |
| `application.yml` | 애플리케이션 설정 (DB, 서버, 로깅 등) |
| `RobotControlApplication.java` | Spring Boot 메인 클래스 |
| `config/` | 설정 클래스 (CORS, Security, WebSocket) |
| `controller/` | REST API 컨트롤러 |
| `service/` | 비즈니스 로직 |
| `repository/` | JPA Repository (DB 접근) |
| `entity/` | JPA 엔티티 (DB 테이블 매핑) |
| `dto/` | 데이터 전송 객체 (Request/Response) |
| `exception/` | 커스텀 예외 처리 |
| `security/` | JWT 인증/인가 |

---

### 5.2 Vue 핵심 파일

| 파일/폴더 | 설명 |
|----------|------|
| `package.json` | npm 의존성 관리 |
| `vite.config.ts` | Vite 빌드 도구 설정 |
| `tsconfig.json` | TypeScript 설정 |
| `main.ts` | Vue 앱 진입점 |
| `App.vue` | 루트 컴포넌트 |
| `router/` | Vue Router 라우팅 설정 |
| `stores/` | Pinia 상태 관리 |
| `views/` | 페이지 컴포넌트 |
| `components/` | 재사용 가능한 컴포넌트 |
| `api/` | Axios API 클라이언트 |
| `types/` | TypeScript 타입 정의 |

---

## 6. 개발 워크플로우

### 6.1 개발 서버 실행

**백엔드 (Spring Boot)**
```bash
cd D:/robot-control-system/backend-springboot

# Maven을 사용한 실행
mvn spring-boot:run

# 또는 IDE에서 RobotControlApplication.java 실행
```

**프론트엔드 (Vue)**
```bash
cd D:/robot-control-system/frontend-vue

npm run dev
```

접속:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html

---

### 6.2 빌드 및 배포

**백엔드**
```bash
cd backend-springboot
mvn clean package

# 생성된 JAR 파일: target/robot-control-backend-1.0.0.jar
java -jar target/robot-control-backend-1.0.0.jar
```

**프론트엔드**
```bash
cd frontend-vue
npm run build

# 생성된 파일: dist/
# 정적 웹 서버에 배포 가능
```

---

## 7. Git 저장소 구조

```
robot-control-system/
├── .gitignore
├── README.md
├── backend-springboot/
│   ├── .gitignore
│   └── ...
├── frontend-vue/
│   ├── .gitignore
│   └── ...
└── docs/
```

**루트 .gitignore**
```gitignore
# IDE
.idea/
.vscode/
*.iml
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Environment
.env.local
.env.*.local
```

---

## 8. 다음 단계

1. ✅ 프로젝트 폴더 구조 생성
2. ✅ Spring Boot 프로젝트 생성
3. ✅ Vue 프로젝트 생성
4. 🔄 Entity 및 Repository 구현
5. 🔄 Service 및 Controller 구현
6. 🔄 Vue 컴포넌트 및 Store 구현
7. 🔄 API 연동 테스트
8. 🔄 WebSocket 연동
9. 🔄 ROS2 브리지 구현

---

**문서 버전**: 1.0  
**작성일**: 2026-02-05  
**작성자**: Claude (Anthropic AI)  
**프로젝트**: Robot Control System - Folder Structure Guide
