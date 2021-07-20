import { Prisma } from '@prisma/client';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './rbac/roles.guard';
import { Roles } from './rbac/roles.decorator';
import { Role } from './rbac/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('test')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async test(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
