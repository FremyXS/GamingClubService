import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { Condition } from './equipment/entities/condition.entity';
import { Model } from './equipment/entities/model.entity';
import { Type } from './equipment/entities/type.entity';
import { Equipment } from './equipment/entities/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6789,
      username: 'postgres',
      password: '123456',
      database: 'GamingClubDB',
      entities: [Condition, Model, Type, Equipment],
      synchronize: true,
    }),
    EquipmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
