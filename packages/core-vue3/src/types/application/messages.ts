/** Message, typically displayed on the home page. */
export type IHomeMessage = {
  title?: string;
  message?: string;
  icon?: string;
  color?: string;
  border?: 'top' | 'bottom' | 'start' | 'end';
  prominent: boolean;
  variant?: 'text' | 'outlined' | 'plain' | 'elevated' | 'flat' | 'tonal'
};

/** Application message, typically displayed on a snackbar or in a form. */
export type ApplicationMessage = {
  title: string;
  details?: string;
  color?: 'error' | 'warning' | 'success' | 'info' | 'primary';
  icon?: string;
  timeout_ms?: number;
  creation?: number; // Used to toggle the same message multiple times
};
