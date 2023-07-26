import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import Home from './pages/Home';
import Reportes from './pages/Reportes';
import Tabla from './pages/Tabla';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ), // Renderiza Home dentro del Layout
  },
  {
    path: '/tabla',
    element: (
      <Layout>
        <Tabla />
      </Layout>
    ), // Renderiza Tabla dentro del Layout
  },
  {
    path: '/reportes',
    element: (
      <Layout>
        <Reportes />
      </Layout>
    ), // Renderiza Graficos dentro del Layout
  },
]);
