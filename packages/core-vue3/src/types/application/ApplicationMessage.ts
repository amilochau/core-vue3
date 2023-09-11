export class ApplicationMessage {
  title: string;
  details?: string;
  color: 'error' | 'warning' | 'success' | 'info';
  icon: string;
  timeout_ms: number;
  creation: number; // Used to toggle the same message multiple times

  constructor(title: string, color: 'error' | 'warning' | 'success' | 'info', icon: string, details?: string, timeout_ms?: number) {
    this.title = title
    this.details = details
    this.color = color,
    this.icon = icon
    this.timeout_ms = timeout_ms ?? 10000
    this.creation = new Date().valueOf()
  }
}
