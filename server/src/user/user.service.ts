import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({ data: createUserDto });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    return user;
  }

  async findByName(username: string) {
    const user = await this.prisma.user.findFirst({
      where: { name: username },
    });
    return user;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
