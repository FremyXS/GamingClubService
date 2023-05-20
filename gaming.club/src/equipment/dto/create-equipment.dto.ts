import { ApiProperty } from '@nestjs/swagger';
export class CreateEquipmentDto {
  @ApiProperty()
  serial_number: string;
  @ApiProperty()
  typeId: number;
  @ApiProperty()
  modelId: number;
  @ApiProperty()
  conditionId: number;
}
