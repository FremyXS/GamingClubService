import { ApiProperty } from '@nestjs/swagger';
export class CreateModelDto {
  @ApiProperty({ nullable: false })
  name: string;
}
