export class MapsLinesAddRequest {
  name: string = '';
  desc?: string;
  points: Array<string> = [];
  color?: string;
  size?: number;
  tags?: Array<string>;
  fields?: Record<string, string>;
}

export class MapsLinesChangeRequest {
  name: string = '';
  desc?: string;
  points: Array<string> = [];
  color?: string;
  size?: number;
  tags?: Array<string>;
  fields?: Record<string, string>;
}
