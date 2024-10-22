import React, { useEffect, useState, useContext } from 'react';
import { obtenerReportes } from '../../services/obtenerData';
import EditorReportes from './EditorReportes';
import { UserContext } from '../../contexts/UserContext';
import { permisosRoles } from '../../utils/roles';

const ReportesDirectos = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorVisible, setEditorVisible] = useState(false);
  //Verificacion de rol
  const { user } = useContext(UserContext);
  const rolesPermitidos = permisosRoles[user.rol];
  const editor = rolesPermitidos.includes('/reportes/directos/editor');

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await obtenerReportes();
        const reportesFiltrados = data.filter((informe) => informe.tipo === 'directo');
        setInformes(reportesFiltrados);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setError('Error al cargar los reportes.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, []);

  const openEditor = () => {
    setEditorVisible(true);
  };

  const closeEditor = () => {
    setEditorVisible(false);
  };

  const handleInformesChange = (updatedInformes) => {
    setInformes(updatedInformes);
  };

  if (loading) {
    return <div>Cargando reportes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {editor && (
        <button
          className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full z-50"
          onClick={openEditor} // Abre el editor
          title="Crear/Editar Reportes"
        >
          ➕✏️
        </button>
      )}

      <ul className="flex flex-col">
        {informes.map((informe) => (
          <li key={informe.id} className="mb-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
              onClick={() => {
                window.open(informe.url, '_blank'); // Abrir el editor
              }}
            >
              {informe.title}
            </button>
          </li>
        ))}
      </ul>

      {editorVisible && (
        <EditorReportes
          reportes={informes} // Pasar la lista de reportes al editor
          onClose={closeEditor}
          onInformesChange={handleInformesChange} // Pasar función para manejar cambios en informes
        />
      )}
    </div>
  );
};

export default ReportesDirectos;
