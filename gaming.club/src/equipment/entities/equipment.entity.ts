import { ApiProperty } from '@nestjs/swagger';
import { Model } from './model.entity';
import { Condition } from './condition.entity';
import { Type } from './type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Note identifier', nullable: false })
  serial_number: string;

  @OneToOne(() => Type)
  @JoinColumn()
  @ApiProperty({ description: 'Note identifier', nullable: false })
  type: Type;

  @OneToOne(() => Model)
  @JoinColumn()
  @ApiProperty({ description: 'Note identifier', nullable: false })
  model: Model;

  @OneToOne(() => Condition)
  @JoinColumn()
  @ApiProperty({ description: 'Note identifier', nullable: false })
  condition: Condition;
}
