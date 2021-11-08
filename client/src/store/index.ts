import { configureStore } from "@reduxjs/toolkit";
import auctionReducer from "./auction.reducer";
import userReducer from "./user.reducer";

export default configureStore({
  reducer: {
    auction: auctionReducer,
    user: userReducer,
  },
});
