import { createSlice } from '@reduxjs/toolkit';

const state = localStorage.getItem('isCollapsed') ? true : false;

const layoutSlice = createSlice({
  name: 'layout',
  initialState: { isCollapsed: state },
  reducers: {
    setCollapsed: (state, action) => {
      return { isCollapsed: action.payload };
    },
  },
});

export const { setCollapsed } = layoutSlice.actions;
export default layoutSlice.reducer;
