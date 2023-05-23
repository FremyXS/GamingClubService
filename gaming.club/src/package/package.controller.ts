import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Response,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Package } from './entities/package.entity';
import { Response as Res } from 'express';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  @ApiBody({
    type: CreatePackageDto,
  })
  async create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  @ApiResponse({
    type: [Package],
  })
  async findAll(@Response() res: Res) {
    const data = await this.packageService.findAll();
    return res.set({ 'X-Total-Count': data.length }).json(data);
  }

  @Get(':id')
  @ApiResponse({
    type: Package,
  })
  async findOne(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Put(':id')
  @ApiBody({
    type: UpdatePackageDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }
}
