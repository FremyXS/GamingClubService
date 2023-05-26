import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Package } from 'src/package/entities/package.entity';
import { StatusesEnum } from './entities/status.enum';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  //reservation
  private getTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date;
  };

  private getSettingsPackage = (packages: Package[]) => {
    let startTime = '23:59';
    let endTime = '00:00';
    let price = 0;

    packages.forEach((el) => {
      if (this.getTime(el.startTime) < this.getTime(startTime)) {
        startTime = el.startTime;
      }

      if (this.getTime(el.endTime) > this.getTime(endTime)) {
        endTime = el.endTime;
      }

      price += Number(el.price);
    });

    return { startTime, endTime, price };
  };

  async create(createReservationDto: CreateReservationDto) {
    const packages: Package[] = [];

    createReservationDto.packageIds.forEach(async (el) => {
      const packageEntity = await this.packageRepository.findOneBy({
        id: el,
      });

      if (!packageEntity) {
        throw new NotFoundException(`Package whit id: ${el} not found`);
      }

      packages.push(packageEntity);
    });

    const status = await this.statusRepository.findOneBy({
      name: StatusesEnum.Expectation,
    });

    if (!status) {
      throw new NotFoundException(
        `Status whit name: ${StatusesEnum.Expectation} not found`,
      );
    }

    const { startTime, endTime, price } = this.getSettingsPackage(packages);

    const newReservation = this.reservationRepository.create({
      ...createReservationDto,
      status: status,
      packages: packages,
      startTime: startTime,
      endTime: endTime,
      price: price,
    });

    return await this.reservationRepository.save(newReservation);
  }

  async findAll() {
    const res = await this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.packages', 'package')
      .leftJoinAndSelect('reservation.status', 'status')
      .getMany();
    return res;
  }

  async findOne(id: number) {
    return await this.reservationRepository.findOneBy({
      id: id,
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOneBy({
      id: id,
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation whit id: ${id} not found`);
    }

    const packages: Package[] = [];

    updateReservationDto.packageIds.forEach(async (el) => {
      const packageEntity = await this.packageRepository.findOneBy({
        id: el,
      });

      if (!packageEntity) {
        throw new NotFoundException(`Package whit id: ${el} not found`);
      }

      packages.push(packageEntity);
    });

    const status = await this.statusRepository.findOneBy({
      id: updateReservationDto.statusId,
    });

    if (!status) {
      throw new NotFoundException(
        `Status whit id: ${updateReservationDto.statusId} not found`,
      );
    }

    const { startTime, endTime, price } = this.getSettingsPackage(packages);

    const updateReservation = {
      ...reservation,
      ...updateReservationDto,
      status: status,
      packages: packages,
      startTime: startTime,
      endTime: endTime,
      price: price,
    };

    await this.reservationRepository.save(updateReservation);

    return `This action updates a #${id} reservation`;
  }

  async remove(id: number) {
    const reservation = await this.reservationRepository.findOneBy({
      id: id,
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation whit id: ${id} not found`);
    }

    await this.reservationRepository.remove(reservation);

    return `This action removes a #${id} reservation`;
  }

  //status

  async statusFindAll() {
    return await this.statusRepository.find();
  }

  async statusFindOne(id: number) {
    return await this.statusRepository.findOneBy({
      id: id,
    });
  }
}
