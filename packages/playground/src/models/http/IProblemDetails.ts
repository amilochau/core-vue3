export type IProblemDetails = {
  title?: string;
  type?: string;
  traceId?: string;
  status?: number;
  errors?: Record<string, string[]>;
}
