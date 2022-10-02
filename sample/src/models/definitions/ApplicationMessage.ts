export class ApplicationMessage {
  disableTranslation: boolean;
  title: string;
  details?: string;
  color: 'error' | 'warning' | 'success' | 'info';
  icon: string;
  timeout: number;
  creation: number; // Used to toggle the same message multiple times

  constructor(title: string, color: 'error' | 'warning' | 'success' | 'info', icon: string, details?: string, timeout?: number, disableTranslation?: boolean) {
    this.title = title
    this.details = details ? details : undefined
    this.color = color ?? 'info',
    this.icon = icon
    this.timeout = timeout ?? 10000
    this.disableTranslation = disableTranslation ?? false
    this.creation = new Date().valueOf()
  }
}
