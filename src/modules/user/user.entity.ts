import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  deleted: boolean;

  constructor() {
    this.isActive = false;
    this.deleted = false;
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }
}
