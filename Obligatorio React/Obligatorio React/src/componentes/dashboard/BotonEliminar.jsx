import React from "react";
import { toast } from "react-toastify";

const BotonEliminar = ({ id, onEliminar }) => {

  const eliminarEvaluacion = async () => {

    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    try {
      const res = await fetch(
        `https://goalify.develotion.com/evaluaciones.php?idEvaluacion=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token,
            iduser: idUsuario,
          },
        }
      );
      const data = await res.json();

      if (data.codigo === 200) {
        onEliminar(id);
      } else {
        toast.error(data.mensaje || "Error al eliminar");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="boton-eliminar-container">
      <button
        onClick={eliminarEvaluacion}
        className="btn-eliminar"
        title="Eliminar evaluación"
      >
        Eliminar
      </button>
    </div>
  );
};

export default BotonEliminar;
