import { ApiProperty } from '@nestjs/swagger';
export class CreateConditionDto {
  @ApiProperty({ nullable: false })
  name: string;
}
