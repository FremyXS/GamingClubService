import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty()
  @Column()
  countPayments: number;

  @ApiProperty()
  @Column()
  countCancellations: number;

  @ApiProperty()
  @Column()
  payday: number;
}
