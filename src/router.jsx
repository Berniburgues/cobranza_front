import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import Home from './pages/Home';
import Reportes from './pages/Reportes';
import ReportesDirectos from './components/Reportes/ReportesDirectos';
import ReportesIndirectos from './components/Reportes/ReportesIndirectos';
import Tabla from './pages/Tabla';
import Socio from './pages/Socio';
import Login from './pages/Login';
import ProtectedRoute from './components/Common/ProtectedRoute';

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
    path: '/tabla',
    element: (
      <Layout>
        <ProtectedRoute>
          <Tabla />
        </ProtectedRoute>
      </Layout>
    ),
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
  {
    path: '/socio',
    element: (
      <Layout>
        <ProtectedRoute>
          <Socio />
        </ProtectedRoute>
      </Layout>
    ),
  },
]);
