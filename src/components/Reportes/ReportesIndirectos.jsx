import React, { useEffect, useState, useContext } from 'react';
import { obtenerReportes } from '../../services/obtenerData';
import EditorReportes from './EditorReportes';
import { UserContext } from '../../contexts/UserContext';
import { permisosRoles } from '../../utils/roles';

const ReportesIndirectos = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorVisible, setEditorVisible] = useState(false);
  //Verificacion de rol
  const { user } = useContext(UserContext);
  const rolesPermitidos = permisosRoles[user.rol];
  const editor = rolesPermitidos.includes('/reportes/pdfs/editor');

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await obtenerReportes();
        const reportesFiltrados = data.filter((informe) => informe.tipo === 'indirecto');
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
    <div className="grid grid-cols-3 gap-2">
      {editor && (
        <button
          className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full z-50"
          onClick={openEditor} // Abre el editor
          title="Crear/Editar Reportes"
        >
          ➕✏️
        </button>
      )}
      {informes.map((informe, index) => (
        <div key={index} className="mb-1">
          <button
            className="bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </div>
      ))}
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

export default ReportesIndirectos;
