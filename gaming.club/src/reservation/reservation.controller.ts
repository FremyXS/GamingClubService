import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('reservation')
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get('reservation')
  async findAll() {
    return this.reservationService.findAll();
  }

  @Get('reservation/:id')
  async findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Put('reservation/:id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete('reservation/:id')
  async remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }

  @Post('status')
  async statusCreate(@Body() createStatusDto: CreateStatusDto) {
    return this.reservationService.statusCreate(createStatusDto);
  }

  @Get('status')
  async statusFindAll() {
    return this.reservationService.statusFindAll();
  }

  @Get('status/:id')
  async statusFindOne(@Param('id') id: string) {
    return this.reservationService.statusFindOne(+id);
  }

  @Put('status/:id')
  async statusUpdate(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.reservationService.statusUpdate(+id, updateStatusDto);
  }

  @Delete('status/:id')
  async statusRemove(@Param('id') id: string) {
    return this.reservationService.statusRemove(+id);
  }
}
