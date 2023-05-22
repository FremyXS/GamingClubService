import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateConditionDto } from './create-condition.dto';

export class UpdateConditionDto extends PartialType(CreateConditionDto) {}
