import { Injectable } from '@nestjs/common';
import { paymentMethod } from 'src/enums/paymentMethod.enum';
import { PrismaService } from 'src/prisma.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';

@Injectable()
export class JournalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJournalDto: CreateJournalDto, id: number) {
    createJournalDto.products.forEach(async (value, index) => {
      const product = await this.prisma.product.findFirst({
        where: { id: value.productId },
      });

      product.available = product.available - value.quantity;

      if (product.available < value.quantity) {
        throw new Error('Only available products can be bought');
      }
      await this.prisma.product.update({
        where: { id: value.productId },
        data: product,
      });
    });

    const journal = await this.prisma.journal.create({
      data: {
        sellerId: id,
        journalProducts: {
          create: createJournalDto.products,
        },
        journalPayments: {
          create: createJournalDto.payments,
        },
      },
      include: {
        journalProducts: true,
        journalPayments: true,
      },
    });
    return journal;
  }

  async getProducts(getProductsDto: GetProductsDto) {
    const products = this.prisma.journalProduct.findMany({
      where: {
        journal: {
          date: {
            gte: new Date(getProductsDto.dateFrom),
            lt: new Date(getProductsDto.dateTo),
          },
        },
        product: {
          name: {
            contains: getProductsDto.name,
          },
          category: {
            id: {
              in: getProductsDto.categories,
            },
          },
        },
      },
      include: {
        journal: true,
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return products;
  }

  findAll() {
    return `This action returns all journal`;
  }

  findOne(id: number) {
    const product = this.prisma.journalProduct.findFirst({
      where: { id },
      include: {
        journal: {
          include: {
            journalProducts: true,
            journalPayments: true,
            journalReturn: true,
          },
        },
      },
    });
    return product;
  }

  update(id: number, updateJournalDto: UpdateJournalDto) {
    return `This action updates a #${id} journal`;
  }

  async return(journalProductId: number, quantity: number) {
    const journal = await this.prisma.journalProduct.findFirst({
      where: { id: journalProductId },
      include: { journal: true },
    });
    const product = await this.prisma.product.findFirst({
      where: { id: journal.productId },
    });

    journal.quantity = journal.quantity - quantity;
    product.available = product.available + quantity;

    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        available: product.available,
      },
    });
    await this.prisma.journalProduct.update({
      where: { id: journal.id },
      data: {
        quantity: journal.quantity,
      },
    });

    const data = {
      price: product.cost * quantity,
      paymentMethod: paymentMethod.CASH,
      comment: 'some reason',
      journalId: journal.journalId,
    };

    return await this.prisma.journalPayment.create({ data });
  }

  remove(id: number) {
    return `This action removes a #${id} journal`;
  }
}
