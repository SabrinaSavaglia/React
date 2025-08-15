import React from "react";
import BotonAgregar from "./BotonAgregar";
import TituloNuevaEvaluacion from "./TituloNuevaEvaluacion";

const Contenido = () => {
  return (
    <div className="card">
      <TituloNuevaEvaluacion />
      <div className="card-body">
        <BotonAgregar />
      </div>
    </div>
  );
};

export default Contenido;
