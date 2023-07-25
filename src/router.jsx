import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import Home from './pages/Home';
import Graficos from './pages/Graficos';
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
    path: '/graficos',
    element: (
      <Layout>
        <Graficos />
      </Layout>
    ), // Renderiza Graficos dentro del Layout
  },
]);
