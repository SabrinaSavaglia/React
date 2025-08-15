import { useId, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const idUser = useId();
  const idPass = useId();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");
  let navigate = useNavigate();

  const ingresar = (e) => {
    e.preventDefault();

    setMensajeLogin("");

    fetch("https://goalify.develotion.com/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario.trim(), password: password.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.codigo === 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("idUsuario", data.id);
          toast.success("Login exitoso");
          navigate("/dashboard");
        } else {
          toast.error("Usuario o contraseña incorrectos.");
        }
      })
      .catch(() => {
        toast.error("Error de conexión con el servidor.");
      });
  };

  const estaCompleto = usuario.trim() !== "" && password.trim() !== "";

  return (
    <div className="form-container">
      <div className="menu">
        <h2>Iniciar sesión</h2>
      </div>

      <div className="contenido">
        <form onSubmit={ingresar} className="inputs">
          <div className="input">
            <label htmlFor={idUser}>Usuario:</label>
            <input
              type="text"
              id={idUser}
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="input">
            <label htmlFor={idPass}>Contraseña:</label>
            <input
              type="password"
              id={idPass}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="ingresar">
            <button type="submit" disabled={!estaCompleto}>
              Ingresar
            </button>
          </div>

          {mensajeLogin && (
            <div id="mensajeLogin" style={{ color: "red", marginTop: "10px" }}>
              {mensajeLogin}
            </div>
          )}
        </form>

        <div className="registrarse">
          <Link to="/registro">¿No tenés cuenta? Registrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
