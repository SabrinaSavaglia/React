import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarFiltro } from "../../features/EvaluacionesSlice";

const FiltroFecha = () => {
  const dispatch = useDispatch();
  const filtro = useSelector((state) => state.evaluaciones.filtro);

  return (
    <div>
      <label>Filtro por fecha: </label>
      <select value={filtro} onChange={(e) => dispatch(cambiarFiltro(e.target.value))}>
        <option value="todo">Todo</option>
        <option value="semana">Última semana</option>
        <option value="mes">Último mes</option>
      </select>
    </div>
  );
};

export default FiltroFecha;
