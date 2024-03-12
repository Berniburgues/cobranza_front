import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';
import ReportesDirectos from './components/Reportes/ReportesDirectos';
import ReportesIndirectos from './components/Reportes/ReportesIndirectos';
import ReportesParciales from './components/Reportes/ReportesParciales';
import Home from './pages/Home';
import Reportes from './pages/Reportes';
import Socio from './pages/Socio';
import Login from './pages/Login';
import Denegado from './pages/Denegado';
import HistorialACE from './pages/historialACE';
import Tablas from './pages/Tablas';
import TablaPagos from './pages/TablaPagos';
import TablaImportes from './pages/TablaImportes';
import Archivos from './pages/Archivos';
import Bancos from './pages/Bancos';
import Calendario from './pages/Calendario';

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
        path: 'tablaPagos',
        element: <TablaPagos />,
      },
      {
        path: 'tablaImportes',
        element: <TablaImportes />,
      },
      {
        path: 'socio',
        element: <Socio />,
      },
      {
        path: 'historialACE',
        element: <HistorialACE />,
      },
      {
        path: '/tablas/bancos',
        element: <Bancos />,
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
      {
        path: 'parciales',
        element: <ReportesParciales />,
      },
    ],
  },
  {
    path: '/archivos',
    element: (
      <Layout>
        <ProtectedRoute>
          <Archivos />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/calendario',
    element: (
      <Layout>
        <ProtectedRoute>
          <Calendario />
        </ProtectedRoute>
      </Layout>
    ),
  },
]);
