import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cash: 0,
  card: 0,
  cashless: 0,
  sale: 0,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updatePayment: (state, action: PayloadAction<typeof initialState>) =>
      (state = action.payload),
  },
});

export default paymentSlice.reducer;

export const { updatePayment } = paymentSlice.actions;
