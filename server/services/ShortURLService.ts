import * as shortid from 'shortid';
import { Repository } from 'typeorm';

import ShortURL from '../entities/ShortURL';

export default class ShortURLService {
  public repository: Repository<ShortURL>;

  constructor(repository: Repository<ShortURL>) {
    this.repository = repository;
  }

  public async create(url: string): Promise<ShortURL> {
    const shortURL = new ShortURL();
    shortURL.id = shortid.generate();
    shortURL.url = url;

    return await this.repository.save(shortURL);
  }

  public async findById(id: string): Promise<ShortURL> {
    return await this.repository.findOne(id);
  }

  public async findByURL(url: string): Promise<ShortURL> {
    return await this.repository.findOne({ url });
  }
}
