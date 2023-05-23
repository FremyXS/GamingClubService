import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Status } from './entities/status.entity';
import { Package } from 'src/package/entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Status, Package])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
