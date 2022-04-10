import { createSlice } from '@reduxjs/toolkit';
import { AdminLayoutStateInterface } from '../../../../interfaces/redux/state.interface';

const initialState: AdminLayoutStateInterface = {
  isOpenedLeftMenu: true,
  isOpenedTopMenu: false,
};

export const adminLayoutReducer = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openLeftMenu: (state) => {
      state.isOpenedLeftMenu = true;
    },
    closeLeftMenu: (state) => {
      state.isOpenedLeftMenu = false;
    },
    openTopMenu: (state) => {
      state.isOpenedTopMenu = true;
    },
    closeTopMenu: (state) => {
      state.isOpenedTopMenu = false;
    },
  },
});

export const {
  openLeftMenu,
  openTopMenu,
  closeLeftMenu,
  closeTopMenu,
} = adminLayoutReducer.actions;

export default adminLayoutReducer.reducer;
