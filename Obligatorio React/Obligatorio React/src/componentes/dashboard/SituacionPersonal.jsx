import React from "react";
import { useSelector } from "react-redux";

const SituacionPersonal = () => {
  const evaluaciones = useSelector(state => state.evaluaciones.evaluaciones);

  if (evaluaciones.length === 0) return <p>Sin evaluaciones aún.</p>;

  const suma = evaluaciones.reduce((acc, eva) => acc + eva.calificacion, 0);// acumulador de suma,reduce trabaja como un for 
  const promedio = suma / evaluaciones.length;

  let emoji = "😐"; 

  if (promedio > 0) emoji = "😊";
  else if (promedio < 0) emoji = "😞";

  return (
    <div>
      <h3>Situación Personal</h3>
      <p style={{ fontSize: "2rem" }}>{emoji}</p>
    </div>
  );
};

export default SituacionPersonal;
