export class MapsMarkersAddRequest {
  name: string = '';
  desc?: string;
  lat?: number;
  lng?: number;
  color?: string
  size?: number;
  placeId?: string;
  tags?: Array<string>;
  fields?: Record<string, string>;
}

export class MapsMarkersChangeRequest {
  name: string = '';
  desc?: string;
  lat?: number;
  lng?: number;
  color?: string;
  size?: number;
  placeId?: string;
  tags?: Array<string>;
  fields?: Record<string, string>;
}
