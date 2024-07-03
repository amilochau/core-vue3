/** List result. */
export type IListResult<TListModel, TKey> = {
  items: TListModel[];
  endReached: boolean;
  lastKey?: TKey;
};

/** List request. */
export type IListRequest<TKey> = {
  search: string;
  lastKey?: TKey;

  getQuery(): string
};

/** Default response for `Create` operations. */
export type IDefaultCreateResponse = {
  id: string;
};

/** List result, typically used for HTTP response data. */
export class ListResult<TListModel, TKey> implements IListResult<TListModel, TKey> {
  public items: TListModel[] = [];
  public endReached: boolean = false;
  public lastKey?: TKey;
}

/** List request, typically used for HTTP request data. */
export class ListRequest<TKey> implements IListRequest<TKey> {
  public search: string;
  public lastKey?: TKey;

  /**
   * Creates a new instance.
   * @param search Search pattern.
   * @param lastKey Last key, of the last result returned.
   */
  public constructor(search: string, lastKey?: TKey) {
    this.search = search;
    this.lastKey = lastKey;
  }

  protected createQueryArguments(): Record<string, string> {
    return {};
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

  /** Get query string. */
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
