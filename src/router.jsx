import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';
import ReportesDirectos from './components/Reportes/ReportesDirectos';
import ReportesIndirectos from './components/Reportes/ReportesIndirectos';
import Home from './pages/Home';
import Reportes from './pages/Reportes';
import Tabla from './pages/Tabla';
import Socio from './pages/Socio';
import Login from './pages/Login';
import Denegado from './pages/Denegado';
import HistorialACE from './pages/historialACE';
import Tablas from './pages/Tablas';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/denegado',
    element: (
      <Layout>
        <Denegado />
      </Layout>
    ),
  },
  {
    path: '/home',
    element: (
      <Layout>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/tablas',
    element: (
      <Layout>
        <ProtectedRoute>
          <Tablas />
        </ProtectedRoute>
      </Layout>
    ),
    children: [
      {
        path: 'tabla',
        element: <Tabla />,
      },
      {
        path: 'socio',
        element: <Socio />,
      },
      {
        path: 'historialACE',
        element: <HistorialACE />,
      },
    ],
  },
  {
    path: '/reportes',
    element: (
      <Layout>
        <ProtectedRoute>
          <Reportes />
        </ProtectedRoute>
      </Layout>
    ),
    children: [
      {
        path: 'directos',
        element: <ReportesDirectos />,
      },
      {
        path: 'indirectos',
        element: <ReportesIndirectos />,
      },
    ],
  },
]);
