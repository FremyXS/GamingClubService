import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { Package } from 'src/package/entities/package.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    format: 'time',
    example: '12:30',
  })
  @Column({
    type: 'time',
  })
  startTime: string;

  @ApiProperty({
    format: 'time',
    example: '12:30',
  })
  @Column({
    type: 'time',
  })
  endTime: string;

  @ManyToOne(() => Status, (status) => status.id)
  @JoinColumn()
  status: Status;

  @ApiProperty()
  @Column({
    type: 'decimal',
  })
  price: number;

  @ManyToMany(() => Package)
  @JoinTable()
  packages: Package[];

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @Column({ type: 'date' })
  date: Date;
}
