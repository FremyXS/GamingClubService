import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';

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
}
