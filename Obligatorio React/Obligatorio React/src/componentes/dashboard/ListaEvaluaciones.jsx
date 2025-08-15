import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarEvaluaciones } from "../../features/EvaluacionesSlice";
import BotonEliminar from "./BotonEliminar";

const ListaEvaluaciones = () => {
  const dispatch = useDispatch();
  const { evaluaciones, filtro } = useSelector((state) => state.evaluaciones);

  const [mensaje, setMensaje] = useState(null);

  
  const objetivosMap = {
    1: { nombre: "Salud", emoji: "🏥" },
    2: { nombre: "Finanzas", emoji: "💰" },
    4: { nombre: "Trabajo", emoji: "💼" },
    5: { nombre: "Emocional", emoji: "💖" },
    6: { nombre: "Social", emoji: "🫂" },
    7: { nombre: "Aprendizaje", emoji: "📚" },
    8: { nombre: "Descanso", emoji: "💤" },
  };

  useEffect(() => {
    const cargarEvaluaciones = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (!token || !idUsuario) {
        setMensaje("No hay token o usuario almacenado");
        return;
      }

      try {
        const res = await fetch(
          `https://goalify.develotion.com/evaluaciones.php?idUsuario=${idUsuario}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
              iduser: idUsuario,
            },
          }
        );

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();

        if (data.codigo === 200 && Array.isArray(data.evaluaciones)) {
          if (data.evaluaciones.length === 0) {
            setMensaje("No hay evaluaciones para este usuario.");
          } else {
            dispatch(guardarEvaluaciones(data.evaluaciones));
          }
        } else {
          setMensaje(data.mensaje || "No se pudieron obtener las evaluaciones.");
        }
      } catch (err) {
        setMensaje(`Error en la petición: ${err.message}`);
      }
    };

    cargarEvaluaciones();
  }, [dispatch]);

  const evaluacionesFiltradas = evaluaciones
    .filter((eva) => eva && eva.fecha)
    .filter((eva) => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const fechaEva = new Date(eva.fecha);
      fechaEva.setHours(0, 0, 0, 0);

      if (filtro === "semana") {
        const hace7Dias = new Date(hoy);
        hace7Dias.setDate(hoy.getDate() - 7);
        return fechaEva >= hace7Dias && fechaEva <= hoy;
      }
      if (filtro === "mes") {
        const hace30Dias = new Date(hoy);
        hace30Dias.setDate(hoy.getDate() - 29);
        return fechaEva >= hace30Dias && fechaEva <= hoy;
      }
      return true;
    })
    .filter((eva) => eva.id !== undefined && eva.id !== null);

  const handleEliminar = (idEliminado) => {
    const nuevasEvaluaciones = evaluaciones.filter((eva) => eva.id !== idEliminado);
    dispatch(guardarEvaluaciones(nuevasEvaluaciones));
  };

  if (evaluaciones.length === 0) return <p>No hay evaluaciones para este usuario.</p>;

  return (
    <ul className="evaluaciones-lista">
      {evaluacionesFiltradas.map((e) => {
        const objetivo = objetivosMap[e.idObjetivo] || { nombre: "Desconocido", emoji: "" };
        return (
          <li key={e.id}>
            <div className="evaluacion-texto">
              <span style={{ marginRight: 5 }}>{objetivo.emoji}</span>
              <strong>Objetivo:</strong> {objetivo.nombre} |{" "}
              <strong>Calificación:</strong> {e.calificacion} |{" "}
              <strong>Fecha:</strong> {e.fecha} | <strong>ID:</strong> {e.id}
            </div>
            <BotonEliminar id={e.id} onEliminar={handleEliminar} />
          </li>
        );
      })}
    </ul>
  );
};

export default ListaEvaluaciones;
