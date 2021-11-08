import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  name: string | null;
}

interface IAddUser {
  payload: IUserState;
}

export const Slice = createSlice<
  IUserState,
  {
    addUser: (state: IUserState, action: IAddUser) => void;
  }
>({
  name: "user",
  initialState: {
    name: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export const { addUser } = Slice.actions;

export const getUser = (state: { user: IUserState }) => state.user;

export default Slice.reducer;
