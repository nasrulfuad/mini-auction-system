import { configureStore } from "@reduxjs/toolkit";
import auctionReducer from "./auction.reducer";

export default configureStore({
  reducer: {
    auction: auctionReducer,
  },
});
