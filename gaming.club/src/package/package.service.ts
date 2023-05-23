import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';
import { Type } from 'src/equipment/entities/type.entity';
import { ResponsePackageDto } from './dto/response-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    const type = await this.typeRepository.findOneBy({
      id: createPackageDto.typeId,
    });

    if (!type) {
      throw new NotFoundException(
        `Type with id: ${createPackageDto.typeId} not found`,
      );
    }

    const newPackage = this.packageRepository.create({
      ...createPackageDto,
      type: type,
    });

    return await this.packageRepository.save(newPackage);
  }

  async findAll() {
    const packages = await this.packageRepository
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.type', 'type_name')
      .getMany();

    const packagesDto: ResponsePackageDto[] = packages.map((el) => {
      const dto: ResponsePackageDto = {
        ...el,
        type_name: el.type.name,
      };
      return dto;
    });
    return packagesDto;
  }

  async findOne(id: number) {
    const packages = await this.packageRepository.findOneBy({
      id: id,
    });

    if (!packages) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    return packages;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const packages = await this.packageRepository.findOneBy({
      id: id,
    });

    if (!packages) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    const type = await this.typeRepository.findOneBy({
      id: updatePackageDto.typeId,
    });

    if (!type) {
      throw new NotFoundException(
        `Type with id: ${updatePackageDto.typeId} not found`,
      );
    }

    await this.packageRepository.update(id, {
      ...updatePackageDto,
      type: type,
      ...{ typeId: undefined },
    });

    return `This action updates a #${id} package`;
  }

  async remove(id: number) {
    const packages = await this.packageRepository.findOneBy({
      id: id,
    });

    if (!packages) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    await this.packageRepository.remove(packages);

    return `This action removes a #${id} package`;
  }
}
