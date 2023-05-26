import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Response,
  Put,
  Header,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Equipment } from './entities/equipment.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './entities/model.entity';
import { UpdateModelDto } from './dto/update-model.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './entities/type.entity';
import { UpdateTypeDto } from './dto/update-type.dto';
import { CreateConditionDto } from './dto/create-condition.dto';
import { Condition } from './entities/condition.entity';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { Response as Res } from 'express';

@ApiTags('equipment')
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  //Equipments

  @Post('equipment')
  @ApiBody({
    type: CreateEquipmentDto,
  })
  async create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Header('Content-Range', 'equipments 0-9/100')
  @Get('equipment')
  @ApiResponse({
    type: [Equipment],
  })
  async findAll(@Response() res: Res) {
    const data = await this.equipmentService.findAll();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }
  @Get('equipment/:id')
  async findOneById(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @Put('equipment/:id')
  @ApiBody({
    type: UpdateEquipmentDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete('equipment/:id')
  async remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }

  //Models

  @Post('model')
  @ApiBody({
    type: CreateModelDto,
  })
  async createModel(@Body() createEquipmentDto: CreateModelDto) {
    return this.equipmentService.createModel(createEquipmentDto);
  }

  @Header('Content-Range', 'models 0-9/100')
  @Get('model')
  @ApiOkResponse({ type: Model, isArray: true })
  @ApiOperation({ summary: 'Get all entities' })
  async findAllModel(@Response() res: Res) {
    const data = await this.equipmentService.findAllModels();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }

  @Get('model/:id')
  async findOneModel(@Param('id') id: string) {
    return this.equipmentService.findOneModel(+id);
  }

  @Put('model/:id')
  @ApiBody({
    type: UpdateModelDto,
  })
  async updateModel(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateModelDto,
  ) {
    return this.equipmentService.updateModel(+id, updateEquipmentDto);
  }

  @Delete('model/:id')
  async removeModel(@Param('id') id: string) {
    return this.equipmentService.removeModel(+id);
  }

  //Types

  @Header('Content-Range', 'types 0-9/100')
  @Get('type')
  @ApiResponse({
    type: [Type],
  })
  async findAllType(@Response() res: Res) {
    const data = await this.equipmentService.findAllType();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }

  @Get('type/:id')
  async findOneType(@Param('id') id: string) {
    return this.equipmentService.findOneType(+id);
  }

  //Conditions

  @Header('Content-Range', 'conditions 0-9/100')
  @Get('condition')
  @ApiResponse({
    type: [Condition],
  })
  async findAllCondition(@Response() res: Res) {
    const data = await this.equipmentService.findAllCondition();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }

  @Get('condition/:id')
  async findOneCondition(@Param('id') id: string) {
    return this.equipmentService.findOneCondtioon(+id);
  }
}
