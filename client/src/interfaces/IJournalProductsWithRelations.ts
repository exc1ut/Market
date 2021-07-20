import {
  Category,
  Journal,
  JournalPayment,
  JournalProduct,
  Product,
} from './prisma';

export type IJournalProductsWithRelations = JournalProduct & {
  product: Product & {
    category: Category;
  };
  journal: Journal & {
    journalPayments: JournalPayment[];
  };
};
