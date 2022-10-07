export type IListResult<TListModel> = {
  rows: number;
  items: TListModel[];
  endReached: boolean;
}

export type IListRequest<TKey, TOrderType> = {
  rows: number;
  search: Record<string, string>;
  orderType: TOrderType;
  firstId?: TKey;
  lastId?: TKey;

  getQuery(): string
}

export type IDefaultCreateResponse = {
  id: string;
}

export class ListResult<TListModel> implements IListResult<TListModel> {
  rows: number = 10;
  items: TListModel[] = [];
  endReached: boolean = false;
}

export class ListRequest<TKey, TOrderType> implements IListRequest<TKey, TOrderType> {
  rows: number
  search: Record<string, string>
  orderType: TOrderType;
  firstId?: TKey;
  lastId?: TKey;

  constructor(rows: number, search: Record<string, string>, orderType: TOrderType, firstId?: TKey, lastId?: TKey) {
    this.rows = rows
    this.search = search
    this.orderType = orderType
    this.firstId = firstId
    this.lastId = lastId
  }

  private createQueryArguments() {
    const args: Record<string, string> = { };
    if (this.rows) {
      args.rows = `${this.rows}`;
    }
    Object.entries(this.search).filter(([, value]) => !!value).forEach(([key, value]) => {
      args[`search[${key}]`] = value;
    });
    args.orderType = `${this.orderType}`;
    if (this.firstId !== undefined) {
      args.firstId = `${this.firstId}`;
    }
    if (this.lastId !== undefined) {
      args.lastId = `${this.lastId}`;
    }
    return args;
  }

  public getQuery(): string {
    const args = this.createQueryArguments();
    let queryString = '';
    for (const [key, value] of Object.entries(args)) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      if (queryString.length) {
        queryString += `&${encodedKey}=${encodedValue}`;
      } else {
        queryString += `${encodedKey}=${encodedValue}`;
      }
    }
    return queryString;
  }
}
