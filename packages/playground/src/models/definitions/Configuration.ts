export type ConfigValues = {
  [key in Environment]: Record<string, string>
}

export enum Environment {
  Default = 'default',
  Local = 'local',
  Development = 'dev',
  Production = 'prd'
}
