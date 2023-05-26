import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Header('Content-Range', 'user 0-9/100')
  @Get('user')
  async findAll(@Response() res: Res) {
    const data = await this.usersService.findAll();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Header('Content-Range', 'roles 0-9/100')
  @Get('role')
  async roleFindAll(@Response() res: Res) {
    const data = await this.usersService.roleFindAll();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }
}
