import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../interfaces/prisma';
import { apiAddress } from '../../utils/app';

type CustomType = {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: any;
  userInfo: User;
};

const initialState: CustomType = {
  userInfo: {
    id: 0,
    email: '',
    name: '',
    phone: null,
    address: null,
    birthData: new Date(),
    comment: null,
    inn: null,
    kpp: null,
    card: null,
    role: 0,
    password: '',
  },
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id: string, thunkAPI) => {
    const { data } = await axios.get(`http://${apiAddress}/user/${id}`);
    console.log(data);
    return data as User;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    removeUser: (state, _) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUser.pending, (state, _) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUser.rejected, (state, _) => {
      state.status = 'error';
    });
  },
});

export default userSlice.reducer;

export const {} = userSlice.actions;
