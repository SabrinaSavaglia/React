import React from 'react';
import BotonEliminar from './BotonEliminar';

const EvaluacionItem = () => {
  return (
    <li className="evaluacion-item">
      <span className="evaluacion-text">
        <span className="emoji"></span> 
      </span>
      <BotonEliminar />
    </li>
  );
};

export default EvaluacionItem;
