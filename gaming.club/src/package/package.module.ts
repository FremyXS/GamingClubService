import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Package } from './entities/package.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'src/equipment/entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Type])],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
