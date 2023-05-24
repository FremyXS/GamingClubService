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
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  description: string;

  @ApiProperty({
    format: 'time',
    example: '12:30',
  })
  @Column({
    type: 'time',
    nullable: false,
  })
  startTime: string;

  @ApiProperty({
    format: 'time',
    example: '12:30',
  })
  @Column({
    type: 'time',
    nullable: false,
  })
  endTime: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Type, (type) => type.id)
  @JoinColumn()
  type: Type;
}
