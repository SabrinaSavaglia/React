import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paises: []
};

export const PaisesSlice = createSlice({
  name: "paises",
  initialState,
  reducers: {
    guardarPaises: (state, action) => {
      state.paises = action.payload;
    }
  }
});

export const { guardarPaises } = PaisesSlice.actions;
export default PaisesSlice.reducer;
