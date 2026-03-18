import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://dummyjson.com/users');
  return response.json().then((data) => data.users);
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  return response.json();
});

const initialState = {
  users: [],
  selectedUser: null,
  status: 'idle',
  selectedStatus: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.selectedStatus = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
