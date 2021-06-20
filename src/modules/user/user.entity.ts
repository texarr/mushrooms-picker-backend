import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { MushroomPicking } from '../mushroom-picking/mushroom-picking.entity';

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

  @OneToMany(() => MushroomPicking, (mushroomPicks) => mushroomPicks.user)
  mushroomPicks: MushroomPicking[];

  constructor() {
    this.isActive = false;
    this.deleted = false;
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }
}
