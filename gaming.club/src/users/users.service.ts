import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getRoleByUserLogin(login: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.login = :login', {
        login: login,
      })
      .getOne();

    console.log(user);

    return user.role.name;
  }

  async findByLogin(login: string): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({
      login: login,
    });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({
      id: id,
    });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
