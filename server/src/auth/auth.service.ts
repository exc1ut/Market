import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { IPayload } from 'src/interfaces/app';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginCredentials: LoginDto) {
    const user = await this.userService.findByName(loginCredentials.name);
    if (!user || user.password !== loginCredentials.password) {
      throw new UnauthorizedException();
    }
    const payload: IPayload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
