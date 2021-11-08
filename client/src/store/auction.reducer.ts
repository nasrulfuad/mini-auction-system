import { createSlice } from "@reduxjs/toolkit";
import { IAuction } from "../types";

interface IAuctionState {
  item: IAuction | null;
  highestPrice: number;
}

export const Slice = createSlice<
  IAuctionState,
  {
    addAuction: (state: IAuctionState, action: { payload: IAuction }) => void;
    addHighestPrice: (
      state: IAuctionState,
      action: { payload: number }
    ) => void;
  }
>({
  name: "auction",
  initialState: {
    item: null,
    highestPrice: 0,
  },
  reducers: {
    addAuction: (state, action) => {
      state.item = {
        ...action.payload,
      };
      state.highestPrice = action.payload.price;
    },
    addHighestPrice: (state, action) => {
      state.highestPrice = action.payload;
    },
  },
});

export const { addAuction, addHighestPrice } = Slice.actions;

export const getAuction = (state: { auction: IAuctionState }) => state.auction;

export default Slice.reducer;
