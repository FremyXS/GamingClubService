import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RolesEnum } from './entities/role.enum';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    for (const name in RolesEnum) {
      const role = await this.roleRepository.findOneBy({
        name: RolesEnum[name],
      });
      if (!role) {
        await this.roleRepository.save(
          this.roleRepository.create({ name: RolesEnum[name] }),
        );
      }
    }
  }
}
