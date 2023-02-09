export type IListResult<TListModel> = {
  items: TListModel[];
  endReached: boolean;
  lastKey?: string;
}

export type IListRequest = {
  search: string;
  lastKey?: string;

  getQuery(): string
}

export type IDefaultCreateResponse = {
  id: string;
}

export class ListResult<TListModel> implements IListResult<TListModel> {
  items: TListModel[] = [];
  endReached: boolean = false;
  lastKey?: string;
}

export class ListRequest implements IListRequest {
  search: string
  lastKey?: string

  constructor(search: string, lastKey?: string) {
    this.search = search
    this.lastKey = lastKey
  }

  protected createQueryArguments(): Record<string, string> {
    const args: Record<string, string> = { };
    return args;
  }

  private createQueryArgumentsInteral() {
    const args = this.createQueryArguments()
    if (this.search) {
      args.search = this.search;
    }
    if (this.lastKey) {
      args.lastKey = this.lastKey
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
