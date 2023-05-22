import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { Model } from './entities/model.entity';
import { Type } from './entities/type.entity';
import { Condition } from './entities/condition.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseEquipmentDto } from './dto/response-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {}

  // equipments

  async create(createEquipmentDto: CreateEquipmentDto) {
    const model = await this.modelRepository.findOneBy({
      id: createEquipmentDto.modelId,
    });

    if (!model) {
      throw new NotFoundException(
        `Model with ID ${createEquipmentDto.modelId} not found`,
      );
    }

    const type = await this.typeRepository.findOneBy({
      id: createEquipmentDto.typeId,
    });

    if (!type) {
      throw new NotFoundException(
        `Type with ID ${createEquipmentDto.typeId} not found`,
      );
    }

    const condition = await this.conditionRepository.findOneBy({
      id: createEquipmentDto.conditionId,
    });

    if (!condition) {
      throw new NotFoundException(
        `Condition with ID ${createEquipmentDto.conditionId} not found`,
      );
    }

    const equipment = await this.equipmentRepository.findOneBy({
      serial_number: createEquipmentDto.serial_number,
    });

    if (equipment) {
      throw new NotFoundException(
        `Condition with ID ${createEquipmentDto.conditionId} is live`,
      );
    }

    const newEquipment = this.equipmentRepository.create({
      ...createEquipmentDto,
      type: type,
      model: model,
      condition: condition,
    });

    console.log(newEquipment);

    return await this.equipmentRepository.save(newEquipment);
  }

  async findAll() {
    const equipments = await this.equipmentRepository
      .createQueryBuilder('equipment')
      .leftJoinAndSelect('equipment.type', 'type_name')
      .leftJoinAndSelect('equipment.model', 'model_name')
      .leftJoinAndSelect('equipment.condition', 'condition_name')
      .getMany();

    const equipmentsDto: ResponseEquipmentDto[] = equipments.map((el) => {
      const dto: ResponseEquipmentDto = {
        id: el.id,
        serial_number: el.serial_number,
        model_name: el.model.name,
        type_name: el.type.name,
        condition_name: el.condition.name,
      };
      return dto;
    });
    return equipmentsDto;
  }

  async findOne(id: number) {
    const equipment = await this.equipmentRepository

      .createQueryBuilder('equipment')
      .leftJoinAndSelect('equipment.type', 'type_name')
      .leftJoinAndSelect('equipment.model', 'model_name')
      .leftJoinAndSelect('equipment.condition', 'condition_name')
      .where('equipment.id = :id', {
        id: id,
      })
      .getOne();

    if (!equipment) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    const equipmentsDto: ResponseEquipmentDto = {
      id: equipment.id,
      serial_number: equipment.serial_number,
      type_name: equipment.type.name,
      model_name: equipment.model.name,
      condition_name: equipment.condition.name,
    };

    return equipmentsDto;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentRepository.findOneBy({
      id: id,
    });

    if (!equipment) {
      throw new NotFoundException(`Equipment entity with ID ${id} not found`);
    }

    const model = await this.modelRepository.findOneBy({
      id: updateEquipmentDto.modelId,
    });

    if (!model) {
      throw new NotFoundException(
        `Model with ID ${updateEquipmentDto.modelId} not found`,
      );
    }

    const type = await this.typeRepository.findOneBy({
      id: updateEquipmentDto.typeId,
    });

    if (!type) {
      throw new NotFoundException(
        `Type with ID ${updateEquipmentDto.typeId} not found`,
      );
    }

    const condition = await this.conditionRepository.findOneBy({
      id: updateEquipmentDto.conditionId,
    });

    if (!condition) {
      throw new NotFoundException(
        `Condition with ID ${updateEquipmentDto.conditionId} not found`,
      );
    }

    await this.equipmentRepository.update(
      {
        id: id,
      },
      {
        serial_number: updateEquipmentDto.serial_number,
        type: type,
        model: model,
        condition: condition,
      },
    );

    return `This action updates a #${id} equipment`;
  }

  async remove(serial_number: string) {
    const equipment = await this.equipmentRepository.findOneBy({
      serial_number: serial_number,
    });

    if (!equipment) {
      throw new NotFoundException(
        `Related entity with ID ${serial_number} not found`,
      );
    }

    await this.equipmentRepository.remove(equipment);

    return `This action removes a #${serial_number} equipment`;
  }

  // MODELS

  async createModel(params: CreateModelDto) {
    const model = await this.modelRepository.findOneBy({
      name: params.name,
    });

    if (model) {
      throw new NotFoundException(
        `Related entity with ID ${params.name} is live`,
      );
    }

    const newModel = this.modelRepository.create({
      ...params,
    });

    return await this.modelRepository.save(newModel);
  }

  async findAllModels() {
    return await this.modelRepository.find();
  }

  async findOneModel(id: number) {
    const model = await this.modelRepository.findOneBy({
      id: id,
    });

    if (!model) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    return model;
  }

  async updateModel(id: number, params: UpdateModelDto) {
    const model = await this.modelRepository.findOneBy({
      id: id,
    });

    if (!model) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    await this.modelRepository.update(
      {
        id: id,
      },
      {
        ...params,
      },
    );

    return `This action updates a #${id} model`;
  }

  async removeModel(id: number) {
    const model = await this.modelRepository.findOneBy({
      id: id,
    });

    if (!model) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    await this.modelRepository.remove(model);

    return `This action removes a #${id} model`;
  }

  // TYPES
  async createType(params: CreateTypeDto) {
    const type = await this.typeRepository.findOneBy({
      name: params.name,
    });

    if (type) {
      throw new NotFoundException(
        `Related entity with ID ${params.name} is live`,
      );
    }

    const newType = this.typeRepository.create({
      ...params,
    });

    return await this.typeRepository.save(newType);
  }

  async findAllType() {
    return await this.typeRepository.find();
  }

  async findOneType(id: number) {
    const type = await this.typeRepository.findOneBy({
      id: id,
    });

    if (!type) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    return type;
  }

  async updateType(id: number, params: UpdateTypeDto) {
    const type = await this.typeRepository.findOneBy({
      id: id,
    });

    if (!type) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    await this.typeRepository.update(
      {
        id: id,
      },
      {
        ...params,
      },
    );
    return `This action updates a #${id} type`;
  }

  async removeType(id: number) {
    const type = await this.typeRepository.findOneBy({
      id: id,
    });

    if (!type) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    await this.typeRepository.remove(type);

    return `This action removes a #${id} type`;
  }

  // Conditions

  async createConditon(params: CreateConditionDto) {
    const condition = await this.conditionRepository.findOneBy({
      name: params.name,
    });

    if (condition) {
      throw new NotFoundException(
        `Related entity with ID ${params.name} is live`,
      );
    }

    const newCondition = this.conditionRepository.create({
      ...params,
    });

    return await this.conditionRepository.save(newCondition);
  }

  async findAllCondition() {
    return await this.conditionRepository.find();
  }

  async findOneCondtioon(id: number) {
    const condition = await this.conditionRepository.findOneBy({
      id: id,
    });

    if (!condition) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    return condition;
  }

  async updateCondition(id: number, params: UpdateConditionDto) {
    const condition = await this.conditionRepository.findOneBy({
      id: id,
    });

    if (!condition) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    await this.conditionRepository.update(
      {
        id: id,
      },
      {
        ...params,
      },
    );

    return `This action updates a #${id} type`;
  }

  async removeCondition(id: number) {
    const condition = await this.conditionRepository.findOneBy({
      id: id,
    });

    if (!condition) {
      throw new NotFoundException(`Related entity with ID ${id} not found`);
    }

    await this.conditionRepository.remove(condition);
    return `This action removes a #${id} condition`;
  }
}
