import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export default class ShortURL {
  @Index()
  @PrimaryColumn()
  public id: string;

  @Column()
  public url: string;

  @CreateDateColumn()
  public createdAt: Date;
}
