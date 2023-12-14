import {createSlice} from '@reduxjs/toolkit';
import authReducer from './auth';

const initialState = {};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default slice.reducer;
