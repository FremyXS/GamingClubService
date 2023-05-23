import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  //reservation
  async create(createReservationDto: CreateReservationDto) {
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
    });

    return await this.reservationRepository.save(newReservation);
  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findOne(id: number) {
    return await this.reservationRepository.findOneBy({
      id: id,
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = this.reservationRepository.findOneBy({
      id: id,
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation whit id: ${id} not found`);
    }

    const status = await this.statusRepository.findOneBy({
      id: updateReservationDto.statusId,
    });

    if (!status) {
      throw new NotFoundException(
        `Status whit id: ${updateReservationDto.statusId} not found`,
      );
    }

    await this.reservationRepository.update(id, {
      ...updateReservationDto,
      status: status,
      ...{ statusId: undefined },
    });

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
