import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarEvaluacion, guardarEvaluaciones } from "../../features/EvaluacionesSlice";
import { guardarObjetivos } from "../../features/ObjetivosSlice";
import { toast } from "react-toastify";

const BotonAgregar = () => {
  const dispatch = useDispatch();
  const objetivos = useSelector((state) => state.objetivos.objetivos);

  // Refs para inputs
  const objetivoRef = useRef();
  const calificacionRef = useRef();
  const fechaRef = useRef();

  // Cargar objetivos 
  useEffect(() => {
    const cargarObjetivos = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (!token || !idUsuario) {
        toast.error("No hay token o usuario almacenado");
        return;
      }

      try {
        const res = await fetch("https://goalify.develotion.com/objetivos.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
            iduser: idUsuario,
          },
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();

        if (data.objetivos && Array.isArray(data.objetivos)) {
          dispatch(guardarObjetivos(data.objetivos));
        
        } else {
          toast.error("Respuesta inesperada del servidor");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    cargarObjetivos();
  }, [dispatch]);

  const handleSubmit = async () => {
    if (
      !objetivoRef.current?.value ||
      !calificacionRef.current?.value ||
      !fechaRef.current?.value
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    const idObjetivo = objetivoRef.current.value;
    const calificacion = Number(calificacionRef.current.value);
    const fecha = fechaRef.current.value;
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    if (!token || !idUsuario) {
      toast.error("No hay token o usuario almacenado");
      return;
    }

    // Validar calificación entre -5 y 5
    if (calificacion < -5 || calificacion > 5) {
      toast.error("La calificación debe estar entre -5 y 5");
      return;
    }

    // Validar que la fecha no sea posterior a hoy
    const hoy = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    if (fecha > hoy) {
      toast.error("La fecha no puede ser posterior a hoy");
      return;
    }

    const objEvaluacion = {
      idObjetivo,
      idUsuario,
      calificacion,
      fecha,
    };

    try {
      const res = await fetch("https://goalify.develotion.com/evaluaciones.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
          iduser: idUsuario,
        },
        body: JSON.stringify(objEvaluacion),
      });

      const data = await res.json();

      if (data.codigo === 200) {
        toast.success("Evaluación agregada correctamente");

        // Recargar evaluaciones después de agregar para actualizar la lista
        const resGet = await fetch(
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
        const dataGet = await resGet.json();

        if (dataGet.codigo === 200 && Array.isArray(dataGet.evaluaciones)) {
          dispatch(guardarEvaluaciones(dataGet.evaluaciones));
          objetivoRef.current.value = "";
          calificacionRef.current.value = "";
          fechaRef.current.value = "";
        } else {
          toast.error("No se pudieron cargar las evaluaciones actualizadas");
        }
      } else {
        toast.error(data.mensaje || "Error al agregar evaluación");
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="col-md-4">
        <label className="form-label" htmlFor="objetivoSelect">
          Objetivo
        </label>

        <select id="objetivoSelect" defaultValue="" ref={objetivoRef} required>
          <option value="" disabled>
            Seleccionar
          </option>
          {objetivos.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {obj.nombre}
            </option>
          ))}
        </select>

      </div>

      <div className="col">
        <label className="form-label" htmlFor="calificacion">
          Calificación (-5 a 5)
        </label>
        <input
          type="number"
          id="calificacion"
          className="form-control"
          min={-5}
          max={5}
          ref={calificacionRef}
          required
        />
      </div>

      <div className="col">
        <label htmlFor="inputFecha">Fecha</label>
        <input id="inputFecha" name="inputFecha" type="date" required ref={fechaRef} />
      </div>

      <div className="col mt-3">
        <button className="btn btn-success" onClick={handleSubmit}>
          Agregar Evaluación
        </button>
      </div>
    </div>
  );
};

export default BotonAgregar;
