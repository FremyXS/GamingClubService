import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
    const roles = ['admin', 'manager', 'user'];
    for (const name of roles) {
      const role = await this.roleRepository.findOneBy({ name: name });
      if (!role) {
        await this.roleRepository.save(this.roleRepository.create({ name }));
      }
    }
  }
}
