import Logout from './Logout.jsx';
import Menu from './Menu.jsx';
import Contenido from './Contenido.jsx';
import ContenidoEvaluaciones from './ContenidoEvaluaciones.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ContenidoUsuariosPorPais from './ContenidoUsuariosPorPais.jsx';
import ContenidoPuntajes from './ContenidoPuntajes.jsx';
import GraficaPorObjetivos from './GraficaPorObjetivos.jsx';
import GraficaPromedioPorObjetivo from './GraficaPromedioPorObjetivo.jsx';


const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null && localStorage.getItem("idUsuario") === null) {
            navigate("/");
        }

    }, [])


    return (
        <div className="contenedor-dashboard">
            <Logout/>
            <Menu />
            <ContenidoUsuariosPorPais/>
            <Contenido />
            <ContenidoEvaluaciones />
            <ContenidoPuntajes/>
            <GraficaPorObjetivos/>
            <GraficaPromedioPorObjetivo/>
        </div>
    );
};


export default Dashboard;