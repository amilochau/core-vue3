export type IHomeMessage = {
  title?: string;
  message?: string;
  icon?: string;
  color?: string;
  border?: string;
  prominent: boolean;
  variant?: "text" | "outlined" | "plain" | "elevated" | "flat" | "tonal" | undefined
}
