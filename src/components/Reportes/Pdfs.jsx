import React, { useEffect, useState, useContext } from 'react';
import { obtenerReportes } from '../../services/obtenerData';
import EditorReportes from './EditorReportes';
import { UserContext } from '../../contexts/UserContext';
import { permisosRoles } from '../../utils/roles';

const Pdfs = () => {
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
        const reportesFiltrados = data.filter((informe) => informe.tipo === 'general');
        setInformes(reportesFiltrados); // Asignar los datos filtrados al estado
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setError('Error al cargar los reportes.'); // Manejo de error
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchReportes(); // Llama a la función para obtener reportes
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
    return <div>Cargando reportes...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar mensaje de error
  }

  return (
    <ul className="flex flex-col">
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
        <li key={index} className="mb-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </li>
      ))}
      {editorVisible && (
        <EditorReportes
          reportes={informes} // Pasar la lista de reportes al editor
          onClose={closeEditor}
          onInformesChange={handleInformesChange} // Pasar función para manejar cambios en informes
        />
      )}
    </ul>
  );
};

export default Pdfs;
