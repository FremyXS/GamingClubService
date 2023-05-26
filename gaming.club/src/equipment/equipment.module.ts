import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Condition } from './entities/condition.entity';
import { Model } from './entities/model.entity';
import { Type } from './entities/type.entity';
import { Equipment } from './entities/equipment.entity';
import { TypesEnum } from './entities/type.enum';
import { Repository } from 'typeorm';
import { ConditionsEnum } from './entities/condition.enum';

@Module({
  imports: [TypeOrmModule.forFeature([Condition, Model, Type, Equipment])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {}

  async onModuleInit() {
    for (const name in ConditionsEnum) {
      const type = await this.conditionRepository.findOneBy({
        name: ConditionsEnum[name],
      });
      if (!type) {
        await this.conditionRepository.save(
          this.conditionRepository.create({ name: ConditionsEnum[name] }),
        );
      }
    }

    for (const name in TypesEnum) {
      const role = await this.typeRepository.findOneBy({
        name: TypesEnum[name],
      });
      if (!role) {
        await this.typeRepository.save(
          this.typeRepository.create({ name: TypesEnum[name] }),
        );
      }
    }
  }
}
