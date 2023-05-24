import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Package } from 'src/package/entities/package.entity';

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
  async create(createReservationDto: CreateReservationDto) {
    const packages: Package[] = [];

    createReservationDto.packageIds.forEach(async (el) => {
      const packageEntity = await this.packageRepository.findOneBy({
        id: el,
      });

      if (!packageEntity) {
        throw new NotFoundException(
          `Package whit id: ${createReservationDto.statusId} not found`,
        );
      }

      packages.push(packageEntity);
    });

    const status = await this.statusRepository.findOneBy({
      id: createReservationDto.statusId,
    });

    if (!status) {
      throw new NotFoundException(
        `Status whit id: ${createReservationDto.statusId} not found`,
      );
    }

    const newReservation = this.reservationRepository.create({
      ...createReservationDto,
      status: status,
      packages: packages,
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
        throw new NotFoundException(
          `Package whit id: ${updateReservationDto.statusId} not found`,
        );
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

    const updateReservation = {
      ...reservation,
      ...updateReservationDto,
      status: status,
      packages: packages,
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

  async statusCreate(createStatusDto: CreateStatusDto) {
    const newStatus = this.statusRepository.create({
      ...createStatusDto,
    });

    return await this.statusRepository.save(newStatus);
  }

  async statusFindAll() {
    return await this.statusRepository.find();
  }

  async statusFindOne(id: number) {
    return await this.statusRepository.findOneBy({
      id: id,
    });
  }

  async statusUpdate(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.statusRepository.findOneBy({
      id: id,
    });

    if (!status) {
      throw new NotFoundException(`Status whit id: ${id} not found`);
    }

    await this.statusRepository.update(id, {
      ...updateStatusDto,
    });

    return `This action updates a #${id} status`;
  }

  async statusRemove(id: number) {
    const status = await this.statusRepository.findOneBy({
      id: id,
    });

    if (!status) {
      throw new NotFoundException(`Status whit id: ${id} not found`);
    }

    await this.statusRepository.remove(status);

    return `This action removes a #${id} status`;
  }
}
