import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentDto } from './create-equipment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  @ApiProperty()
  serial_number: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  condition: string;
}
