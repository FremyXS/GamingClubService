import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { Package } from '../../package/entities/package.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  @ApiProperty({ nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ nullable: false })
  name: string;

  @OneToMany(() => Equipment, (equipment) => equipment.type)
  @JoinTable()
  equipments: Equipment[];

  @OneToMany(() => Package, (packages) => packages.type)
  @JoinTable()
  packages: Package[];
}
