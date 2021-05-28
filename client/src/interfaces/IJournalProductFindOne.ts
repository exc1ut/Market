import {
  JournalProduct,
  Journal,
  User,
  JournalPayment,
  JournalReturn,
  Client,
  Category,
  Product,
} from './prisma';

export type IJournalProductFindOne = JournalProduct & {
  journal: Journal & {
    seller: User;
    journalProducts: (JournalProduct & {
      product: Product & {
        category: Category;
      };
    })[];
    journalPayments: JournalPayment[];
    journalReturn: (JournalReturn & {
      product: Product;
    })[];
    client: Client;
  };
};
