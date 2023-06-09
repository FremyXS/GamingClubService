import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Response,
  UseGuards,
  Request,
  Header,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Response as Res } from 'express';
import { AuthGuard } from 'src/auth/auth.guars';
import { RolesEnum } from 'src/users/entities/role.enum';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard)
  @Post('reservation')
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req,
  ) {
    return this.reservationService.create(
      createReservationDto,
      req.user.username,
    );
  }

  @UseGuards(AuthGuard)
  @Header('Content-Range', 'reservations 0-9/100')
  @Get('reservation')
  async findAll(@Response() res: Res, @Request() req) {
    console.log(req.user);

    let data = null;
    if (req.user.role === RolesEnum.User) {
      data = await this.reservationService.findAllByLoginUser(
        req.user.username,
      );
    } else {
      data = await this.reservationService.findAll();
    }
    return res.set({ 'X-Total-Count': data.length }).json(data);
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

  @Header('Content-Range', 'status 0-9/100')
  @Get('status')
  async statusFindAll(@Response() res: Res) {
    const data = await this.reservationService.statusFindAll();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }

  @Get('status/:id')
  async statusFindOne(@Param('id') id: string) {
    return this.reservationService.statusFindOne(+id);
  }

  @Header('Content-Range', 'analytics 0-9/100')
  @Get('analytics')
  async analyticsFindAll(@Response() res: Res) {
    const data = await this.reservationService.analyticsFindAll();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }
}
