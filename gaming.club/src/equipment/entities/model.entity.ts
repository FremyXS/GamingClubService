import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  @ApiProperty({ nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ nullable: false })
  name: string;
}
