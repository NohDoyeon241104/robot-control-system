// 센서 타입
export type SensorType = 'LIDAR' | 'CAMERA' | 'IMU' | 'GPS' | 'ULTRASONIC'

// 센서 상태
export type SensorStatus = 'ACTIVE' | 'INACTIVE' | 'ERROR'

// 센서 정보
export interface Sensor {
  sensorId: string
  robotId: string
  type: SensorType
  topic: string
  status: SensorStatus
  frequency: number
  lastUpdate: string
}

// LiDAR 데이터
export interface LidarData {
  range: number
  angleMin: number
  angleMax: number
  angleIncrement: number
  ranges: number[]
}

// IMU 데이터
export interface ImuData {
  orientation: {
    yaw: number
    pitch: number
    roll: number
  }
  acceleration: {
    x: number
    y: number
    z: number
  }
  angularVelocity: {
    x: number
    y: number
    z: number
  }
}

// GPS 데이터
export interface GpsData {
  latitude: number
  longitude: number
  altitude: number
}

// 카메라 데이터
export interface CameraData {
  format: string
  width: number
  height: number
  imageBase64: string
}
