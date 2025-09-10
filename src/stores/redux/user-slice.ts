import { TUser } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: TUser | null;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
