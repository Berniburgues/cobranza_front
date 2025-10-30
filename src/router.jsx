import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import ReportesDirectos from './components/Reportes/ReportesDirectos';
import ReportesIndirectos from './components/Reportes/ReportesIndirectos';
import ReportesParciales from './components/Reportes/ReportesParciales';
import EditorReportes from './components/Reportes/EditorReportes';
import Pdfs from './components/Reportes/Pdfs';
import Home from './pages/Home';
import Reportes from './pages/Reportes';
import Denegado from './pages/Denegado';
import HistorialACE from './pages/historialACE';
import HistorialSocios from './pages/HistorialSocios';
import Tablas from './pages/Tablas';
import Servicios from './pages/Servicios';
import TablaPagos from './pages/TablaPagos';
import TablaImportes from './pages/TablaImportes';
import StopDebit from './pages/StopDebit';
import Archivos from './pages/Archivos';
import Envios from './pages/Envios';
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
        <Home />
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
        <Home />
      </Layout>
    ),
  },
  {
    path: '/tablaSocios',
    element: (
      <Layout>
        <TablaSocios />
      </Layout>
    ),
  },
  {
    path: '/tablas',
    element: (
      <Layout>
        <Tablas />
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
        <Servicios />
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
        <Reportes />
      </Layout>
    ),
    children: [
      {
        path: 'directos',
        element: <ReportesDirectos />,
        children: [
          {
            path: 'editor',
            element: <EditorReportes />,
          },
        ],
      },
      {
        path: 'indirectos',
        element: <ReportesIndirectos />,
        children: [
          {
            path: 'editor',
            element: <EditorReportes />,
          },
        ],
      },
      {
        path: 'parciales',
        element: <ReportesParciales />,
        children: [
          {
            path: 'editor',
            element: <EditorReportes />,
          },
        ],
      },
      {
        path: 'pdfs',
        element: <Pdfs />,
        children: [
          {
            path: 'editor',
            element: <EditorReportes />,
          },
        ],
      },
    ],
  },
  {
    path: '/padron',
    element: (
      <Layout>
        <Padron />
      </Layout>
    ),
  },
  {
    path: '/archivos',
    element: (
      <Layout>
        <Archivos />
      </Layout>
    ),
  },
  {
    path: '/envios',
    element: (
      <Layout>
        <Envios />
      </Layout>
    ),
  },
  {
    path: '/calendario',
    element: (
      <Layout>
        <Calendario />
      </Layout>
    ),
  },
]);
