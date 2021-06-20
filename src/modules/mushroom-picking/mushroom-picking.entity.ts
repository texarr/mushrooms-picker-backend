import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { NewPickingInterface } from './interface/new-picking.interface';
import { User } from '../user/user.entity';

@Entity()
export class MushroomPicking {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  start: Date;

  @Column({
    nullable: true,
  })
  end: Date;

  @Column()
  startingLocationLat: string;

  @Column()
  startingLocationLng: string;

  @Column({
    nullable: true,
  })
  pickingCount: number;

  @Column({
    nullable: true,
  })
  notes: string;

  @ManyToOne(() => User, (user) => user.mushroomPicks)
  user: User;

  constructor(newPickDto: NewPickingInterface) {
    this.id = uuidv4();

    if (newPickDto) {
      this.startingLocationLat = newPickDto.startingLocation.lat;
      this.startingLocationLng = newPickDto.startingLocation.lng;
      this.start = new Date();
    }
  }
}
