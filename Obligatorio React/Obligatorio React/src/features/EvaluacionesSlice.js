import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  evaluaciones: [],
  filtro: "todo" 
};

export const EvaluacionesSlice = createSlice({
  name: "evaluaciones",
  initialState,
  reducers: {
    guardarEvaluaciones: (state, action) => {
      state.evaluaciones = action.payload;
    },
    agregarEvaluacion: (state, action) => {
      state.evaluaciones.push(action.payload);
    },
    cambiarFiltro: (state, action) => {
      state.filtro = action.payload;
    }
  }
});

export const { guardarEvaluaciones, agregarEvaluacion, cambiarFiltro } = EvaluacionesSlice.actions;
export default EvaluacionesSlice.reducer;
