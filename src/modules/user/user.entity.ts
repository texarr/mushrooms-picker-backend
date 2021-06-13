import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  name: string;

  @Column()
  @ApiModelProperty()
  email: string;

  @Column()
  @ApiModelProperty()
  isActive: boolean;

  @Column()
  deleted: boolean;

  @Column()
  password: string;

  constructor() {
    this.isActive = false;
    this.deleted = false;
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }
}
