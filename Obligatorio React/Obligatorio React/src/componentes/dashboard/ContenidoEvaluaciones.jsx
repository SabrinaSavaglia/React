import React from 'react';
import ListaEvaluaciones from './ListaEvaluaciones';
import TituloEvaluaciones from './TituloEvaluaciones';
import FiltroFecha from './FiltroFecha';
import EliminarEvaluacion from './BotonEliminar';

const ContenidoEvaluaciones = () => {
  return (
    <div className="card">
      <TituloEvaluaciones />
      <div className="card-body">
        <FiltroFecha/>
        <ListaEvaluaciones />
      </div>
    </div>
  );
};

export default ContenidoEvaluaciones;
