import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      login: 'admin',
      password: 'admin',
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      registerDate: '',
      lastActivityDate: '',
    },
  ];

  async findByLogin(login: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.login === login);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);
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
