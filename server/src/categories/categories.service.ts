import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({ where: { id } });
    return category;
  }

  async update(id: number, updateCategoryDto: Prisma.UserUpdateInput) {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return category;
  }

  async remove(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
