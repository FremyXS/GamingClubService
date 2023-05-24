import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipmentModule } from './equipment/equipment.module';
import { Condition } from './equipment/entities/condition.entity';
import { Model } from './equipment/entities/model.entity';
import { Type } from './equipment/entities/type.entity';
import { Equipment } from './equipment/entities/equipment.entity';
import { PackageModule } from './package/package.module';
import { Package } from './package/entities/package.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Status } from './reservation/entities/status.entity';
import { Reservation } from './reservation/entities/reservation.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6789,
      username: 'postgres',
      password: '123456',
      database: 'GamingClubDB',
      entities: [
        Condition,
        Model,
        Type,
        Equipment,
        Package,
        Reservation,
        Status,
      ],
      synchronize: true,
    }),
    EquipmentModule,
    PackageModule,
    ReservationModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
