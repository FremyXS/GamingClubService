import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login, pass) {
    const user = await this.usersService.findByLogin(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const role = await this.usersService.getRoleByUserLogin(user.login);
    const payload = { sub: user.id, username: user.login, role: role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: role,
    };
  }
}
