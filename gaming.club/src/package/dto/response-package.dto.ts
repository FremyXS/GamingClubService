import { ApiProperty } from '@nestjs/swagger';

export class ResponsePackageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

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
  type_name: string;
}
