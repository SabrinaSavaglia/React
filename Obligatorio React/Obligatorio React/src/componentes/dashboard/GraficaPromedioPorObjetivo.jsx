import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Gráfico de promedio de evaluaciones por objetivo',
        },
    },
};

// Lista local de objetivos para mapear id a nombre
const objetivos = [
  { id: 1, nombre: "Salud" },
  { id: 2, nombre: "Finanzas" },
  { id: 4, nombre: "Trabajo" },
  { id: 5, nombre: "Emocional" },
  { id: 6, nombre: "Social" },
  { id: 7, nombre: "Aprendizaje" },
  { id: 8, nombre: "Descanso" },
];

const GraficaPromedioPorObjetivos = () => {
  const listaEvaluaciones = useSelector(state => state.evaluaciones.evaluaciones) || [];

  // Acumular suma y cantidad para cada idObjetivo
  const acumulador = listaEvaluaciones.reduce((acc, evalua) => {
    if (!acc[evalua.idObjetivo]) {
      acc[evalua.idObjetivo] = { suma: 0, cantidad: 0 };
    }
    acc[evalua.idObjetivo].suma += evalua.calificacion;
    acc[evalua.idObjetivo].cantidad += 1;
    return acc;
  }, {});

  // Para cada objetivo calcular promedio o 0 si no hay evaluaciones
  const promedios = objetivos.map(obj => {
    const data = acumulador[obj.id];
    const promedio = data ? data.suma / data.cantidad : 0;
    return {
      nombre: obj.nombre,
      promedio,
    };
  });

  const labels = promedios.map(p => p.nombre);
  const dataValues = promedios.map(p => p.promedio);

  const data = {
    labels,
    datasets: [
      {
        label: 'Promedio de evaluaciones',
        data: dataValues,
        backgroundColor: dataValues.map(v => (v >= 0 ? 'rgba(75, 192, 192, 0.7)' : 'rgba(255, 99, 132, 0.7)')),
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de promedio de evaluaciones por objetivo</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraficaPromedioPorObjetivos;
