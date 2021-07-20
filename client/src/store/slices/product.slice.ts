import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

type IProduct = {
  quantity: number;
  number: number;
  length: number;
  cost: number | undefined;
  sale: number;
  id: number;
};

const initialState: IProduct[] = [];

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.findIndex((v) => v.id === action.payload.id);
      if (index < 0) state.push(action.payload);
      else state[index] = action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state = state.filter((v) => v.id !== action.payload);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: number; data: IProduct }>
    ) => {
      const index = state.findIndex((v) => v.id === action.payload.id);
      state[index] = action.payload.data;
    },
  },
});

//selectors
const selectSelf = (state: RootState) => state.productSlice;

export const findOne = (id: number) => {
  return createDraftSafeSelector(selectSelf, (state) => {
    return state.find((val) => val.id === id);
  });
};

export default product.reducer;

export const { addProduct, removeProduct, updateProduct } = product.actions;
