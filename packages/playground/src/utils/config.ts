import config from '../data/config'
import { Environment } from "../models/definitions/Configuration"

const defaultEnv: Environment = Environment.Default

const getCurrentEnv = (host: string, subdomain: string): Environment => {
  if (host.includes('localhost')) {
    return Environment.Local
  } else if (subdomain.includes('dev')) {
    return Environment.Development
  } else {
    return Environment.Production
  }
}

export function getConfig(key: string): string {
  const host = window.location.host
  const subdomain = host.split('.')[0]
  const currentEnv = getCurrentEnv(host, subdomain)

  return import.meta.env[key] ?? config[currentEnv][key] ?? config[defaultEnv][key]
}
