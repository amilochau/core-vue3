import { ConfigValues } from "../models/definitions/Configuration"

const config: ConfigValues = {
  default: {
    VITE_GOOGLE_MAPS_API_KEY: "AIzaSyA11QlCEpdVbQTSOcMzgtI97kSFHrdNqRg"
  },
  local: {
    VITE_API_URL: "https://api-dev.milochau.com/maps/v1",
    VITE_API_CLIENT_ID: "5ea3d7ac-f358-4a7b-9702-6b4672faf89a",
    VITE_REDIRECT_URI: "http://localhost:3000",
    VITE_API_SCOPE_USE: "https://milochau.onmicrosoft.com/maps-api-development/Use"
  },
  dev: {
    VITE_API_URL: "https://api-dev.milochau.com/maps/v1",
    VITE_API_CLIENT_ID: "5ea3d7ac-f358-4a7b-9702-6b4672faf89a",
    VITE_REDIRECT_URI: "https://maps-dev.milochau.com",
    VITE_API_SCOPE_USE: "https://milochau.onmicrosoft.com/maps-api-development/Use"
  },
  prd: {
    VITE_API_URL: "https://api.milochau.com/maps/v1",
    VITE_API_CLIENT_ID: "2aa180f1-f100-4f05-b378-ff01f2610a9e",
    VITE_REDIRECT_URI: "https://maps.milochau.com",
    VITE_API_SCOPE_USE: "https://milochau.onmicrosoft.com/maps-api-production/Use"
  }
}

export default config
