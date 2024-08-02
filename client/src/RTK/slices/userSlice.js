import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true; // Set logged-in state
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false; // Set logged-out state
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
