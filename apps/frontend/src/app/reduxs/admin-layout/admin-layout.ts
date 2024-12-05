import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const state = localStorage.getItem('isCollapsed') ? true : false;

interface IBreadcrumb {
  label: string;
  link: string;
  isOrigin?: boolean;
}

interface ILayoutState {
  isCollapsed: boolean;
  breadcrumbs: Array<IBreadcrumb>;
}

const initialState: ILayoutState = {
  isCollapsed: state,
  breadcrumbs: [],
};

const adminLayoutSlice = createSlice({
  name: 'adminLayout',
  initialState: initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCollapsed: action.payload };
    },

    setBreadcrumb: (state, action: PayloadAction<IBreadcrumb[]>) => {
      return { ...state, breadcrumbs: action.payload };
    },
  },
});

export const { setCollapsed, setBreadcrumb } = adminLayoutSlice.actions;
export default adminLayoutSlice.reducer;
