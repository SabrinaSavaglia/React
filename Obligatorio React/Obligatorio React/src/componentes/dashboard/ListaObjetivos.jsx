import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarObjetivos } from '../../features/ObjetivosSlice';
import { toast } from 'react-toastify';

const ListaObjetivos = () => {
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.objetivos.objetivos);

  useEffect(() => {
    const cargarObjetivos = () => {
      const token = localStorage.getItem('token');
      const idUsuario = localStorage.getItem('idUsuario');

      if (!token || !idUsuario) {
        toast.error('No hay token o usuario almacenado');
        return;
      }

      fetch('https://goalify.develotion.com/objetivos.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
          iduser: idUsuario
        }
      })
        .then(res => {
          if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (data.objetivos && Array.isArray(data.objetivos)) {
            dispatch(guardarObjetivos(data.objetivos));
          } else {
            toast.error('Respuesta inesperada del servidor');
          }
        })
        .catch(err => {
          toast.error(err.message);
        });
    };

    cargarObjetivos();
  }, [dispatch]);

  return (
    <div>
      <h2>Lista de Objetivos</h2>
      <ul>
        {lista.map(obj => (
          <li key={obj.id}>{obj.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaObjetivos;
