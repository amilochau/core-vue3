export enum TestEnum {
  First = 1,
  Second = 2,
  Third = 3,
  Fourth = 4,
  Fifth = 5,
  Sixth = 6,
}

export class ItemRecord {
  name: string = '';
  desc?: string;
  num?: number;
  color?: string;
}

export class Item {
  name: string = '';
  desc?: string;
  records: Record<string, ItemRecord> = {};
}
