import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
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

  @ApiProperty()
  statusId: number;

  @ApiProperty()
  packageIds: number[];
}
