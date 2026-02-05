export type RobotStatus = 'RUNNING' | 'IDLE' | 'ERROR' | 'DISCONNECTED';

export interface Robot {
  id: string;
  name: string;
  model: string;
  status: RobotStatus;
  battery: number;
  lastConnected: string;
}

export interface RobotCommand {
  robotId: string;
  command: 'MOVE' | 'STOP' | 'GOTO';
  params?: Record<string, any>;
}