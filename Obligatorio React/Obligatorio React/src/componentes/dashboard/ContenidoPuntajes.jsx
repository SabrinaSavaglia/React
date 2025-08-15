import React from 'react'
import PuntajeGlobal from './PuntajeGlobal'
import PuntajeDiario from './PuntajeDiario'
import SituacionPersonal from './SituacionPersonal'

export const ContenidoPuntajes = () => {
  return (
    <div className="card">
  <div className="puntajes-container">
    <PuntajeGlobal />
    <PuntajeDiario />
    <SituacionPersonal />
  </div>
</div>

  )
}
export default ContenidoPuntajes;