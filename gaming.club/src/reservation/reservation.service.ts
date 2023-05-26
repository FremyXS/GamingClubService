import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Package } from 'src/package/entities/package.entity';
import { StatusesEnum } from './entities/status.enum';
import { User } from 'src/users/entities/user.entity';
import { Type } from 'src/equipment/entities/type.entity';
import { TypesEnum } from 'src/equipment/entities/type.enum';
import { Analytics } from './entities/analytics.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Analytics)
    private readonly analitycsRepository: Repository<Analytics>,
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

  private getDevices = async () => {
    const temp = await this.typeRepository
      .createQueryBuilder('type')
      .leftJoinAndSelect('type.equipments', 'equipments')
      .getMany();

    const pces = temp.find((el) => el.name === TypesEnum.PC);

    const consoles = temp.find((el) => el.name === TypesEnum.GameConsole);

    return {
      count_pc: pces.equipments.length,
      count_console: consoles.equipments.length,
    };
  };

  private checkReservationToDate = async (date: Date) => {
    const reservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.packages', 'package')
      .leftJoinAndSelect('package.type', 'type')
      .leftJoinAndSelect('reservation.status', 'status')
      .where('reservation.date = :date', {
        date: date,
      })
      .getMany();

    const { count_pc, count_console } = await this.getDevices();

    let busy_pc = 0,
      busy_console = 0;

    reservations.forEach((el) => {
      el.packages.forEach((pac) => {
        if (pac.type.name === TypesEnum.PC) {
          busy_pc++;
        }

        if (pac.type.name === TypesEnum.GameConsole) {
          busy_console++;
        }
      });
    });

    return {
      free_pc: count_pc - busy_pc,
      free_console: count_console - busy_console,
    };
  };

  private addDataToAnalytics = async (price: number) => {
    const currentDate = new Date();
    let model = await this.analitycsRepository.findOneBy({
      date: currentDate,
    });

    if (!model) {
      model = this.analitycsRepository.create({
        date: currentDate,
        countPayments: 0,
        countCancellations: 0,
        payday: 0,
      });
    }

    model.payday += price;
    model.countPayments++;

    await this.analitycsRepository.save(model);
  };

  async create(createReservationDto: CreateReservationDto, userLogin: string) {
    const currentDate = new Date();
    console.log(`Current date is ${currentDate}`);
    let { free_pc, free_console } = await this.checkReservationToDate(
      createReservationDto.date,
    );

    const packages: Package[] = [];
    const packagesEntity = await this.packageRepository
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.type', 'type')
      .getMany();

    if (
      createReservationDto.packageIds == null ||
      createReservationDto.packageIds.length <= 0
    ) {
      throw new NotFoundException('Packages cannot be missing');
    }

    try {
      createReservationDto.packageIds.forEach((el) => {
        const packageEntity = packagesEntity.find((pac) => pac.id === el);

        if (!packageEntity) {
          throw new NotFoundException(`Package whit id: ${el} not found`);
        }

        if (packageEntity.type.name === TypesEnum.PC) {
          free_pc--;
        }

        if (free_pc < 0) {
          throw new ConflictException('There are no free computers');
        }

        if (packageEntity.type.name === TypesEnum.GameConsole) {
          free_console--;
        }

        if (free_console < 0) {
          throw new ConflictException('There are no free consoles');
        }

        packages.push(packageEntity);
      });
    } catch (error: any) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const status = await this.statusRepository.findOneBy({
      name: StatusesEnum.Expectation,
    });

    if (!status) {
      throw new NotFoundException(
        `Status whit name: ${StatusesEnum.Expectation} not found`,
      );
    }

    const user = await this.userRepository.findOneBy({
      login: userLogin,
    });

    const { startTime, endTime, price } = this.getSettingsPackage(packages);

    const newReservation = this.reservationRepository.create({
      ...createReservationDto,
      status: status,
      packages: packages,
      startTime: startTime,
      endTime: endTime,
      price: price,
      user: user,
    });

    await this.addDataToAnalytics(price);

    return await this.reservationRepository.save(newReservation);
  }

  async findAllByLoginUser(login: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.reservations', 'reservation')
      .leftJoinAndSelect('reservation.packages', 'package')
      .leftJoinAndSelect('reservation.status', 'status')
      .where('user.login = :login', {
        login: login,
      })
      .getOne();

    return user.reservations;
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

    reservation.status = await this.statusRepository.findOneBy({
      name: StatusesEnum.Cancelled,
    });

    await this.reservationRepository.update(
      {
        id: id,
      },
      {
        ...reservation,
      },
    );

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

  //analytics

  async analyticsFindAll() {
    return await this.analitycsRepository.find();
  }
}
