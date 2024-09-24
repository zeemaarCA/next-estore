// promoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPromoApplied: false,
  discount: 0,
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromo: (state, action) => {
      state.isPromoApplied = action.payload.isPromoApplied;
      state.discount = action.payload.discount;
    },
  },
});

export const { setPromo } = promoSlice.actions;
export default promoSlice.reducer;
