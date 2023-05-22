import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  @ApiProperty({ nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ nullable: false })
  name: string;

  @OneToMany(() => Equipment, (equipment) => equipment.type)
  equipments: Equipment[];
}
