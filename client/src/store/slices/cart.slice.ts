import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { access, stat } from 'fs';
import _, { values } from 'lodash';
import {
  JournalPayment,
  JournalProduct,
  Prisma,
} from '../../interfaces/prisma';
import { RootState } from '../store';

export interface IPaymentInfo {
  paid: number;
  sale: number;
}

export interface CartProduct extends Omit<JournalProduct, 'id' | 'journalId'> {}

export interface CartPayment
  extends Omit<Prisma.JournalPaymentCreateInput, 'journal'> {}

export interface ICart {
  total: number;
  paid: number;
  sale: number;
  client?: {
    connect: {
      id: number;
    };
  };
  journalProducts: {
    create: CartProduct[];
  };
  journalPayments: {
    create: CartPayment[];
  };
  seller: {
    connect: {
      id: number;
    };
  };
}

const initialState: ICart = {
  total: 0,
  paid: 0,
  sale: 0,
  client: undefined,
  journalProducts: {
    create: [],
  },
  journalPayments: {
    create: [],
  },
  seller: { connect: { id: 0 } },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addJournal: (state, { payload }: PayloadAction<IPaymentInfo>) => {
      state.paid = payload.paid;
      state.sale = payload.sale;
    },
    addProduct: (state, { payload }: PayloadAction<CartProduct>) => {
      const index = state.journalProducts.create.findIndex(
        (val) => val.productId === payload.productId
      );
      if (index < 0) {
        state.journalProducts.create.push(payload);
      } else state.journalProducts.create[index] = payload;

      let sum = 0;
      state.journalProducts.create.forEach((val) => {
        sum += val.total;
      });
      state.total = sum;
    },
    addPayment: (state, { payload }: PayloadAction<CartPayment>) => {
      state.journalPayments.create.push(payload);
    },
    setSeller: (state, { payload }: PayloadAction<number>) => {
      state.seller.connect.id = payload;
    },
    removeProduct: (state, { payload }: PayloadAction<number>) => {
      const newState = state.journalProducts.create.filter(
        (val) => val.productId !== payload
      );
      state.journalProducts.create = newState;
    },
    addClient: (state, { payload }: PayloadAction<number>) => {
      state.client = {
        connect: {
          id: payload,
        },
      };
    },
    removeClient: (state) => {
      state.client = undefined;
    },
    resetCart: (state) => (state = initialState),
    resetPayments: (state) => {
      state.journalPayments.create = [];
    },
  },
});

//selectors
const selectSelf = (state: RootState) => state;

export const totalCost = createDraftSafeSelector(selectSelf, (state) => {
  let sum = 0;
  state.cartSlice.journalProducts.create.forEach((product) => {
    sum += product.total;
  });
  return sum;
});

export const getIds = createDraftSafeSelector(selectSelf, (state) => {
  const ids: number[] = [];
  state.cartSlice.journalProducts.create.forEach((product) => {
    ids.push(product.productId);
  });
  return ids;
});

export default cartSlice.reducer;

export const {
  addJournal,
  removeProduct,
  addPayment,
  addProduct,
  setSeller,
  addClient,
  removeClient,
  resetCart,
  resetPayments,
} = cartSlice.actions;
