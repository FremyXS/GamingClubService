import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Note identifier', nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Note identifier', nullable: false })
  name: string;

  @OneToMany(() => Equipment, (equipment) => equipment.condition)
  equipments: Equipment[];
}
