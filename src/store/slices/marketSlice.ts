import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { Package } from '../../types/report';
import { Coupon } from '../../types/coupon';
import { PartnerInfo } from '../../types/birthChart';

interface MarketState {
  selectedPackage: Package | null;
  appliedCoupon: Coupon | null;
  partnerInfo: PartnerInfo | null;
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
    appliedCoupon: null,
    partnerInfo: null,
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
    applyCoupon: (state, action: PayloadAction<Coupon | null>) => {
      state.appliedCoupon = action.payload;
    },
    setPartnerInfo: (state, action: PayloadAction<PartnerInfo>) => {
      state.partnerInfo = action.payload;
    }
  },
});
export const {selectPackage, setBillingInfo, applyCoupon,setPartnerInfo} = marketSlice.actions;
export const marketActions = marketSlice.actions;
export default marketSlice.reducer;