import { configureStore } from "@reduxjs/toolkit";
import objetivosReducer from "../features/ObjetivosSlice";
import paisesReducer from "../features/PaisesSlice";
import evaluacionesReducer from "../features/EvaluacionesSlice";
import usuariosPorPaisReducer from "../features/UsuariosPorPaisSlice";

export const store = configureStore({
  reducer: {
    objetivos: objetivosReducer,
    paises: paisesReducer,
    evaluaciones: evaluacionesReducer,
    usuariosPorPais: usuariosPorPaisReducer,
  },
});
