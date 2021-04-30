import { Category, Product } from './prisma';

export type IProductWithCategory = Product & { category: Category };
