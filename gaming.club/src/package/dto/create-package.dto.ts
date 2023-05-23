import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';

export class CreatePackageDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    format: 'time',
    example: '12:30',
  })
  startTime: string;

  @ApiProperty({
    format: 'time',
    example: '12:30',
  })
  endTime: string;

  @ApiProperty()
  price: number;
}
