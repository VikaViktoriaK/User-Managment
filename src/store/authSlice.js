import { createSlice } from '@reduxjs/toolkit';

const getSaveLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(key, error);
    localStorage.removeItem(key);
    return null;
  }
};

const initialState = {
  currentUser: getSaveLocalStorage('currentUser'),
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('currentUser', JSON.stringify(user));

      state.currentUser = user;
    },
    login: (state, action) => {
      const { username, password } = action.payload;

      const storedUser = getSaveLocalStorage('user');

      if (storedUser && storedUser.username === username && storedUser.password === password) {
        state.currentUser = storedUser;
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
      } else {
        console.log('Error: Invalid username or password');
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
