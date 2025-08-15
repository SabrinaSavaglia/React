import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Logout = () => {
  let navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    toast.success("Salida Exitosa")
    navigate("/"); 
   
  };

  return (
    <button className="btnLogOut" onClick={cerrarSesion}>Logout
    </button>
  );
};

export default Logout;
