import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return product;
  }

  async findByNameAndCategory(name: string, categories: number[]) {
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        categoryId: {
          in: categories,
        },
      },
      include: {
        category: true,
      },
    });

    return products;
  }

  async clone(id: number) {
    const product = await this.prisma.product.findFirst({ where: { id } });
    delete product.id;

    await this.prisma.product.create({ data: product });
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({ where: { id } });
    return product;
  }

  async findInRange(ids: number[]) {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return product;
  }

  async remove(id: number) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
