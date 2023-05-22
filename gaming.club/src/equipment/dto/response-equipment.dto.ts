import { ApiProperty } from '@nestjs/swagger';

export class ResponseEquipmentDto {
  id: number;

  @ApiProperty({ description: 'Note identifier', nullable: false })
  serial_number: string;

  @ApiProperty({ description: 'Note identifier', nullable: false })
  type_name: string;

  @ApiProperty({ description: 'Note identifier', nullable: false })
  model_name: string;

  @ApiProperty({ description: 'Note identifier', nullable: false })
  condition_name: string;
}
