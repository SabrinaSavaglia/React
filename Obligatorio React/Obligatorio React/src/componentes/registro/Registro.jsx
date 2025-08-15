import { useEffect, useRef, useId } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { guardarPaises } from "../../features/PaisesSlice"; // ruta según tu estructura

const Registro = () => {
  const idUser = useId();
  const idPass = useId();
  const idPais = useId();

  const userRef = useRef(null);
  const passRef = useRef(null);
  const paisRef = useRef(null);
  const mensajeRef = useRef(null);

  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paises.paises);

  const navigate = useNavigate();

  //cargar paises para registrarse
  useEffect(() => {
    if (paises.length === 0) {
      fetch("https://goalify.develotion.com/paises.php")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.paises)) {
            dispatch(guardarPaises(data.paises));
          }
        })
        .catch(() => {
          if (mensajeRef.current) {
            mensajeRef.current.textContent = "Error cargando países.";
          }
        });
    }
  }, [paises.length, dispatch]);

  //registrarse
  const registrar = (e) => {
    e.preventDefault();

    const usuario = userRef.current.value.trim();
    const password = passRef.current.value.trim();
    const idPaisSeleccionado = parseInt(paisRef.current.value);
    const mensajeRegistro = mensajeRef.current;

    mensajeRegistro.textContent = "";

    if (!usuario || !password || isNaN(idPaisSeleccionado)) {
      mensajeRegistro.textContent = "Por favor, completá todos los campos.";
      return;
    }

    fetch("https://goalify.develotion.com/usuarios.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password, idPais: idPaisSeleccionado }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.codigo === 200) {
          
          localStorage.setItem("token", data.token);
          localStorage.setItem("idUsuario", data.id);

          // Limpiar campos
          userRef.current.value = "";
          passRef.current.value = "";
          paisRef.current.value = "";

          mensajeRegistro.textContent = "";

          navigate("/dashboard");
        } else {
          mensajeRegistro.textContent =
            data.mensaje || "Error en el registro.";
        }
      })
      .catch(() => {
        mensajeRegistro.textContent = "Error de conexión con el servidor.";
      });
  };

  return (
    <div className="form-container">
      <div className="menu">
        <h2>Registro</h2>
      </div>

      <div className="contenido">
        <div className="inputs">
          <div className="input">
            <label htmlFor={idUser}>Usuario:</label>
            <input type="text" id={idUser} placeholder="Usuario" ref={userRef} />
          </div>

          <div className="input">
            <label htmlFor={idPass}>Contraseña:</label>
            <input type="password" id={idPass} placeholder="Contraseña" ref={passRef} />
          </div>

          <div className="input">
            <label htmlFor={idPais}>País:</label>
            <select id={idPais} ref={paisRef}>
              <option value="">Seleccione un país</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="ingresar">
          <button onClick={registrar}>Registrarse</button>
        </div>

        <div
          ref={mensajeRef}
          id="mensajeRegistro"
          style={{ color: "red", marginTop: "10px" }}
        ></div>

        <div className="registrarse">
          <Link to="/">¿Ya tenés cuenta? Ir a Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
