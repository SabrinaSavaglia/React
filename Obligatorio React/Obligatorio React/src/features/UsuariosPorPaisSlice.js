import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuariosPorPais: []
};

export const UsuariosPorPaisSlice = createSlice({
  name: "usuariosPorPais",
  initialState,
  reducers: {
    guardarUsuariosXPaises: (state, action) => {
      state.usuariosPorPais = action.payload;
    }
  }
});

export const { guardarUsuariosXPaises } = UsuariosPorPaisSlice.actions;
export default UsuariosPorPaisSlice.reducer;
