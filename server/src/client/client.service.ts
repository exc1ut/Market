// import { Prisma } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: Prisma.ClientCreateInput) {
    const client = await this.prisma.client.create({ data: createClientDto });

    return client;
  }

  async findAll() {
    const client = await this.prisma.client.findMany();

    return client;
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findFirst({ where: { id } });

    return client;
  }

  async update(id: number, updateClientDto: Prisma.ClientUpdateInput) {
    const client = await this.prisma.client.update({
      data: updateClientDto,
      where: { id },
    });

    return client;
  }

  async remove(id: number) {
    return await this.prisma.client.delete({ where: { id } });
  }
}
