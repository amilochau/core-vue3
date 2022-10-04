import { LayerType } from "./maps";

export function mapLayerTypeToMapTypeId(layerType: LayerType) {
  switch (layerType) {
    case LayerType.Satellite:
      return 'satellite'
    case LayerType.Hybrid:
      return 'hybrid'
    case LayerType.Terrain:
      return 'terrain'
    case LayerType.Roadmap:
    default:
      return 'roadmap'
  }
}
