export type IListResult<TListModel, TKey> = {
  items: TListModel[];
  endReached: boolean;
  lastKey?: TKey;
};

export type IListRequest<TKey> = {
  search: string;
  lastKey?: TKey;

  getQuery(): string
};

export type IDefaultCreateResponse = {
  id: string;
};

export class ListResult<TListModel, TKey> implements IListResult<TListModel, TKey> {
  items: TListModel[] = [];
  endReached: boolean = false;
  lastKey?: TKey;
}

export class ListRequest<TKey> implements IListRequest<TKey> {
  search: string;
  lastKey?: TKey;

  constructor(search: string, lastKey?: TKey) {
    this.search = search;
    this.lastKey = lastKey;
  }

  protected createQueryArguments(): Record<string, string> {
    const args: Record<string, string> = { };
    return args;
  }

  private createQueryArgumentsInteral() {
    const args = this.createQueryArguments();
    if (this.search) {
      args.search = this.search;
    }
    if (this.lastKey) {
      args.lastKey = `${this.lastKey}`;
    }
    return args;
  }

  public getQuery(): string {
    const args = this.createQueryArgumentsInteral();
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
