export interface ILogger {
  debug(message: string, data?: any[]): void;
  error(message: string, data?: any[]): void;
  info(message: string, data?: any[]): void;
  warn(message: string, data?: any[]): void;
}
const DEBUG_ENABLED: boolean =
  !!process.env.REACT_APP_DEBUG && process.env.REACT_APP_DEBUG === 'true';

class Logger implements ILogger {
  private static instance: Logger;
  private debugEnabled: boolean;

  private constructor() {
    this.debugEnabled = DEBUG_ENABLED;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  private now = (): Date => new Date(Date.now());

  private getReadableTime = (now: Date): string =>
    `${now.getHours()}:${now.getMinutes()}.${now.getSeconds()}`;

  private getReadableNow = (): string => this.getReadableTime(this.now());

  private log = (
    msgType: 'debug' | 'info' | 'warn' | 'error',
    msg: any,
    ...data: any
  ): void => {
    const logger = console[msgType];
    const time = this.getReadableNow();
    // const message = `${time}# ${msg}; ${data ? data : ''}`;
    logger(msg, ...data);
  };

  public debug(message: any, ...data: any): void {
    if (this.debugEnabled) this.log('debug', message, ...data);
  }
  public error(message: string, data?: any[]): void {
    this.log('error', message, data);
  }
  public info(message: string, data?: any[]): void {
    this.log('info', message, data);
  }
  public warn(message: string, data?: any[]): void {
    this.log('warn', message, data);
  }
}

export default Logger;
