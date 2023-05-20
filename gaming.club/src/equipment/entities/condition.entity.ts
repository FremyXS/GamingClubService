import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Note identifier', nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Note identifier', nullable: false })
  name: string;
}
