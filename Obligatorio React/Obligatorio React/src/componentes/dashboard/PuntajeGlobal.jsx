import React from "react";
import { useSelector } from "react-redux";

const PuntajeGlobal = () => {
  const evaluaciones = useSelector(state => state.evaluaciones.evaluaciones);

  if (evaluaciones.length === 0) return <p>No hay evaluaciones.</p>;

  const suma = evaluaciones.reduce((acc, eva) => acc + eva.calificacion, 0);
  const promedio = suma / evaluaciones.length;

  return (
    <div>
      <h3>Puntaje Global</h3>
      <p>{promedio.toFixed(2)}</p>
    </div>
  );
};

export default PuntajeGlobal;
