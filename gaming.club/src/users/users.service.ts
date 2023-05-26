import { Injectable, NotFoundException } from '@nestjs/common';
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
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleRepository.findOneBy({
      id: createUserDto.roleId,
    });

    if (!role) {
      throw new NotFoundException(
        `Role with id ${createUserDto.roleId} not found`,
      );
    }

    const user = this.userRepository.create({
      ...createUserDto,
      role: role,
      phone: '',
      firstName: '',
      lastName: '',
      registerDate: '',
      lastActivityDate: '',
    });

    console.log(user);

    return await this.userRepository.save(user);
  }

  async findAll() {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .getMany();
    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const role = await this.roleRepository.findOneBy({
      id: updateUserDto.roleId,
    });

    if (!role) {
      throw new NotFoundException(
        `Role with id ${updateUserDto.roleId} not found`,
      );
    }

    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user) {
      throw new NotFoundException(
        `User with id ${updateUserDto.roleId} not found`,
      );
    }

    await this.userRepository.update(
      {
        id: id,
      },
      {
        ...user,
        ...updateUserDto,
        role: role,
        ...{ roleId: undefined },
      },
    );

    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userRepository.remove(
      await this.userRepository.findOneBy({ id: id }),
    );
    return `This action removes a #${id} user`;
  }

  async roleFindAll() {
    return await this.roleRepository.find();
  }
}
