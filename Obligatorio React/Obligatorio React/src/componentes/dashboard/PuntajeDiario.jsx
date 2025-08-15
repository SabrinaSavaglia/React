import React from "react";
import { useSelector } from "react-redux";

const PuntajeDiario = () => {
  const evaluaciones = useSelector(state => state.evaluaciones.evaluaciones);

  const hoy = new Date().toISOString().slice(0, 10); // formato ISO 8601 en UTC(date completo) y el slice lo corta a dd/mm/yy

  const evaluacionesHoy = evaluaciones.filter(eva => eva.fecha === hoy);

  if (evaluacionesHoy.length === 0) return <p>No hay evaluaciones para hoy.</p>;

  const suma = evaluacionesHoy.reduce((acc, eva) => acc + eva.calificacion, 0);
  const promedio = suma / evaluacionesHoy.length;

  return (
    <div>
      <h3>Puntaje Diario</h3>
      <p>{promedio.toFixed(2)}</p>
    </div>
  );
};

export default PuntajeDiario;
