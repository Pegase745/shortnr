interface IShortURLEntry {
  id: string;
  url: string;
}

export default class ShortURLService {
  public database: IShortURLEntry[];
  public shouldThrowError: boolean;
  public forceThrowErrorMessage: string;
  public defaultId?: string;

  constructor() {
    this._init();
  }

  public reset() {
    this._init();
    return this;
  }

  public async createWithId(id: string, url: string) {
    return await this.create(url, id);
  }

  public async create(url: string, withId?: string) {
    const id = this.defaultId || withId || '' + Math.random();
    const shortURL: IShortURLEntry = {
      id,
      url,
    };
    this.database.push(shortURL);
    return shortURL;
  }

  public async findById(id: string) {
    if (this.shouldThrowError) {
      throw new Error(this.forceThrowErrorMessage);
    }

    return this.database.find((entry: IShortURLEntry) => {
      return entry.id === id;
    });
  }

  public async findByURL(url: string) {
    if (this.shouldThrowError) {
      throw new Error(this.forceThrowErrorMessage);
    }

    return this.database.find((entry: IShortURLEntry) => {
      return entry.url === url;
    });
  }

  public activateThrowErrorMode() {
    this.shouldThrowError = true;
    return this;
  }

  public activateThrowErrorModeWithMessage(message: string) {
    this.activateThrowErrorMode();
    this.forceThrowErrorMessage = message;
    return this;
  }

  public setDefaultId(defaultId: string) {
    this.defaultId = defaultId;
    return this;
  }

  private _init() {
    this.database = [];
    this.shouldThrowError = false;
    this.forceThrowErrorMessage = '';
  }
}
