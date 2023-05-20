import { ApiProperty } from '@nestjs/swagger';
export class CreateTypeDto {
  @ApiProperty({ nullable: false })
  name: string;
}
