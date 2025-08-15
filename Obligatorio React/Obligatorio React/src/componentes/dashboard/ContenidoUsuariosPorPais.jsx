import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarUsuariosXPaises } from "../../features/UsuariosPorPaisSlice";
import { toast } from "react-toastify";

const UsuariosPorPaisConRedux = () => {
  const dispatch = useDispatch();
  const usuariosPorPais = useSelector(state => state.usuariosPorPais.usuariosPorPais || []);

  const [idPais, setIdPais] = useState("");
  const [resultado, setResultado] = useState("");
  
  useEffect(() => {
    const cargarUsuariosXPaises = async () => {
     
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (!token || !idUsuario) {
        toast.error("No hay token o usuario almacenado");
        setCargando(false);
        return;
      }

      try {
        const res = await fetch("https://goalify.develotion.com/usuariosPorPais.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
            iduser: idUsuario,
          },
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();

        if (data.paises && Array.isArray(data.paises)) {
          dispatch(guardarUsuariosXPaises(data.paises));
          console.log(data.paises)
        } else {
          toast.error("Respuesta inesperada del servidor");
        }
      } catch (err) {
        toast.error(err.message);
      }
      
    };

    cargarUsuariosXPaises();
  }, [dispatch]);

  const handleBuscar = () => {
    if (!idPais) {
      toast.error("Por favor, seleccioná un país");
      return;
    }

    const idPaisNum = Number(idPais);
    const paisSeleccionado = usuariosPorPais.find(p => p.id === idPaisNum);
    // console.log("usuariosPorPais desde useSelector:", usuariosPorPais);

    if (paisSeleccionado) {
      setResultado(`Usuarios en ${paisSeleccionado.nombre}: ${paisSeleccionado.cantidadDeUsuarios}`);
    } else {
      setResultado("No se encontró el país seleccionado.");
    }
  };

  return (
    <div className="card">
      <h2>Usuarios por país</h2>
      <div className="card-content">
        
            <label htmlFor="paisSelect" className="form-label">
              País
            </label>
            <select
              id="paisSelect"
              value={idPais}
              onChange={(e) => setIdPais(e.target.value)}
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>
              {usuariosPorPais.map(pais => (
                <option key={pais.id} value={pais.id}>
                  {pais.nombre}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn-success"
              onClick={handleBuscar}
              style={{ marginLeft: "10px" }}
            >
              Buscar
            </button>

            {resultado && <p style={{ marginTop: "10px" }}>{resultado}</p>}
          
      </div>
    </div>
  );
};

export default UsuariosPorPaisConRedux;
