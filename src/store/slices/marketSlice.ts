import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { Package } from '../../types/report';

interface MarketState {
  selectedPackage: Package | null;
  billingInfo: {
    idNumber: string;
    fullName: string;
    address: string;
    phone: string;
    email: string;
  };
}

const initialState: MarketState = {
    selectedPackage: null,
    billingInfo: {
        idNumber: '',
        fullName: '',
        address: '',
        phone: '',
        email: '',
    },
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    selectPackage: (state, action: PayloadAction<Package>) => {
      state.selectedPackage = action.payload;
    },
    setBillingInfo: (state, action: PayloadAction<MarketState['billingInfo']>) => {
      state.billingInfo = action.payload;
    },
  },
});
export const {selectPackage, setBillingInfo} = marketSlice.actions;
export const marketActions = marketSlice.actions;
export default marketSlice.reducer;