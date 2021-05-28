import userSlice from './slices/user.slice';
import cartSlice from './slices/cart.slice';
import productSlice from './slices/product.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({ userSlice, cartSlice, productSlice });

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
