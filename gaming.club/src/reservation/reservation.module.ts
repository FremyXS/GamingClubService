import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Status } from './entities/status.entity';
import { Package } from 'src/package/entities/package.entity';
import { Repository } from 'typeorm';
import { StatusesEnum } from './entities/status.enum';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Status, Package])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async onModuleInit() {
    for (const name in StatusesEnum) {
      const role = await this.statusRepository.findOneBy({
        name: StatusesEnum[name],
      });
      if (!role) {
        await this.statusRepository.save(
          this.statusRepository.create({ name: StatusesEnum[name] }),
        );
      }
    }
  }
}
