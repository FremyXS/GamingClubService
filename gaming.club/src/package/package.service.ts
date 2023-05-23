import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    const newPackage = this.packageRepository.create({
      ...createPackageDto,
    });

    return await this.packageRepository.save(newPackage);
  }

  async findAll() {
    return await this.packageRepository.find();
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

    await this.packageRepository.update(
      {
        id: id,
      },
      {
        ...updatePackageDto,
      },
    );

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
