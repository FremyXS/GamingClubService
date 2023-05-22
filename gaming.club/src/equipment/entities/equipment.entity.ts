import { ApiProperty } from '@nestjs/swagger';
import { Model } from './model.entity';
import { Condition } from './condition.entity';
import { Type } from './type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Note identifier', nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Note identifier', nullable: false })
  serial_number: string;

  @ManyToOne(() => Type, (type) => type.id)
  @JoinColumn()
  @ApiProperty({
    description: 'Note identifier',
    nullable: false,
    uniqueItems: false,
  })
  type: Type;

  @ManyToOne(() => Model, (model) => model.id)
  @JoinColumn()
  @ApiProperty({
    description: 'Note identifier',
    nullable: false,
    uniqueItems: false,
  })
  model: Model;

  @ManyToOne(() => Condition, (condition) => condition.id)
  @JoinColumn()
  @ApiProperty({
    description: 'Note identifier',
    nullable: false,
    uniqueItems: false,
  })
  condition: Condition;
}
