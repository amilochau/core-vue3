export class MapsListResponse {
  id: string = '';
  name: string = '';
  desc?: string;
  accessLevel: AccessLevel = AccessLevel.None;
}

export class MapsCreateRequest {
  name: string = '';
  desc?: string;
  settings: MapSettings = new MapSettings();
}

export class MapsDetailsResponse {
  id: string = '';
  name: string = '';
  desc?: string;
  settings: MapSettings = new MapSettings();
  userAccessLevel: AccessLevel = AccessLevel.None;
  accessPolicy: MapAccessPolicy = new MapAccessPolicy();

  markers: Record<string, MapsMarkersDetailsResponse> = {};
  lines: Record<string, MapsLinesDetailsResponse> = {};
}

export class MapsEditRequest {
  name: string = '';
  desc?: string;
  settings: MapSettings = new MapSettings();
  accessPolicy: MapAccessPolicy = new MapAccessPolicy();
}

export class MapsMarkersDetailsResponse {
  name: string = '';
  desc?: string;
  lat: number = 0;
  lng: number = 0;
  color?: string;
  size?: number;
  placeId?: string;
  tags?: Array<string>;
  fields?: Record<string, string>;
}

export class MapsLinesDetailsResponse {
  name: string = '';
  desc?: string;
  points: Array<string> = [];
  color?: string;
  size?: number;
  tags?: Array<string>;
  fields?: Record<string, string>;
}

export class MapSettings {
  layer: MapLayerSettings = new MapLayerSettings();
  markers: MapMarkersSettings = new MapMarkersSettings();
  lines: MapLinesSettings = new MapLinesSettings();
  center: {
    lat: number,
    lng: number
  } = { lat: 48.856614, lng: 2.3522219 }; // Paris
  zoom: number = 5;
}

export class MapLayerSettings {
  layerType: LayerType = LayerType.Roadmap;
  disablePois?: boolean;
  disableRoads?: boolean;
}

export class MapMarkersSettings {
  defaultColor?: string;
  defaultSize?: number;
  defaultTags: Record<string, Tag> = {};
  defaultFields: Record<string, Field> = {};
}

export class MapLinesSettings {
  defaultColor?: string;
  defaultSize?: number;
  defaultTags: Record<string, Tag> = {};
  defaultFields: Record<string, Field> = {};
}

export class MapAccessPolicy {
  anonymousAccessLevel: AccessLevel = AccessLevel.None;
}

export class Tag {
  label: string = '';
  desc?: string;
}

export class Field {
  label: string = '';
  desc?: string;
  type: FieldType = FieldType.Text;
  validationRules?: FieldValidationRule[] = [];
}

export class FieldValidationRule {
  type: FieldValidationRuleType = FieldValidationRuleType.Required;
  args?: string[] = [];
}

export enum AccessLevel {
  None = 0,
  Read = 1,
  Change = 3,
  Manage = 7,
}

export enum LayerType {
  Roadmap = 0,
  Satellite = 1,
  Hybrid = 2,
  Terrain = 3,
}

export enum FieldType {
  Text = 0,
  Textarea = 1,
  Date = 2,
}

export enum FieldValidationRuleType {
  Required = 0,
  MinLength = 1,
  MaxLength = 2,
  EmailAddress = 3,
}

export const MapsDefaultColorMarkers: string = 'rgb(166,27,74)';
export const MapsDefaultColorLines: string = 'rgb(166,27,74)';
export const MapsMaxDefaultFields: number = 10;
export const MapsMaxDefaultTags: number = 10;
export const MapsMaxMarkersLines: number = 500;
export const MapsDefaultSizeMarkers: number = 7;
export const MapsDefaultSizeLines: number = 5;
