import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phone: "",
};

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { setPhone, setOtp } = verifySlice.actions;
export default verifySlice.reducer;
