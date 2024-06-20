import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';
import ReportesDirectos from './components/Reportes/ReportesDirectos';
import ReportesIndirectos from './components/Reportes/ReportesIndirectos';
import ReportesParciales from './components/Reportes/ReportesParciales';
import Home from './pages/Home';
import Reportes from './pages/Reportes';
import Login from './pages/Login';
import Denegado from './pages/Denegado';
import HistorialACE from './pages/historialACE';
import HistorialSocios from './pages/HistorialSocios';
import Tablas from './pages/Tablas';
import Servicios from './pages/Servicios';
import TablaPagos from './pages/TablaPagos';
import TablaImportes from './pages/TablaImportes';
import StopDebit from './pages/StopDebit';
import Archivos from './pages/Archivos';
import BeneficiosServicios from './pages/BeneficiosServicios';
import SociosServicios from './pages/SociosServicios';
import Bancos from './pages/Bancos';
import Calendario from './pages/Calendario';
import TablaSocios from './pages/TablaSocios';
import Padron from './pages/Padron';

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
    path: '/tablaSocios',
    element: (
      <Layout>
        <ProtectedRoute>
          <TablaSocios />
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
        path: 'historialSocios',
        element: <HistorialSocios />,
      },
      {
        path: 'historialACE',
        element: <HistorialACE />,
      },
      {
        path: '/tablas/bancos',
        element: <Bancos />,
      },
      {
        path: '/tablas/stopDebit',
        element: <StopDebit />,
      },
    ],
  },
  {
    path: '/servicios',
    element: (
      <Layout>
        <ProtectedRoute>
          <Servicios />
        </ProtectedRoute>
      </Layout>
    ),
    children: [
      {
        path: '/servicios/beneficiosServicios',
        element: <BeneficiosServicios />,
      },
      {
        path: '/servicios/sociosServicios',
        element: <SociosServicios />,
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
    path: '/padron',
    element: (
      <Layout>
        <ProtectedRoute>
          <Padron />
        </ProtectedRoute>
      </Layout>
    ),
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
