import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'src/equipment/entities/type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Package {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

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

  @ApiProperty()
  @Column({
    type: 'decimal',
  })
  price: number;

  @ManyToOne(() => Type, (type) => type.id)
  @JoinColumn()
  type: Type;
}
