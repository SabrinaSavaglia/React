import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  objetivos: []
};

export const ObjetivosSlice = createSlice({
  name: "objetivos",
  initialState,
  reducers: {
    guardarObjetivos: (state, action) => {
      state.objetivos = action.payload;
    }
  }
});

export const { guardarObjetivos } = ObjetivosSlice.actions;
export default ObjetivosSlice.reducer;
