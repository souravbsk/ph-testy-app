import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coin: 0,
  isCoinRefetch:false
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoin(state, action) {
      state.coin = action.payload;
    },
    setReFetch(state,action){
      state.isCoinRefetch = action.payload;
    }
  },
});

export const { setCoin,setReFetch } = coinSlice.actions;
export default coinSlice.reducer;
