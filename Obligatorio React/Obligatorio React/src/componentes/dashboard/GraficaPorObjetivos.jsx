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
            text: 'Gráfico de evaluaciones por objetivo',
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

const GraficaPorObjetivos = () => {
  const listaEvaluaciones = useSelector(state => state.evaluaciones.evaluaciones) || [];

  if (listaEvaluaciones.length === 0) {
    return <p>No hay evaluaciones para mostrar.</p>;
  }

  // Crear mapa rápido idObjetivo => nombreObjetivo
  const mapaObjetivos = objetivos.reduce((acc, obj) => {
    acc[obj.id] = obj.nombre;
    return acc;
  }, {});

  const conteoPorObjetivo = listaEvaluaciones.reduce((acc, evaluacion) => {
    const nombreObjetivo = mapaObjetivos[evaluacion.idObjetivo] || `Objetivo ${evaluacion.idObjetivo}`;
    acc[nombreObjetivo] = (acc[nombreObjetivo] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(conteoPorObjetivo);
  const dataValues = Object.values(conteoPorObjetivo);

  const data = {
    labels,
    datasets: [
      {
        label: 'Cantidad de evaluaciones',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de evaluaciones por objetivo</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default GraficaPorObjetivos;
