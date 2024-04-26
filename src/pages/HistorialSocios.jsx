import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchSocios, uploadFile } from '../services/obtenerData';
import { getNombrePeriodo, formatFecha } from '../utils/fechas';
import { descripcionCodigo } from '../utils/descripcionCodigos';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import ExcelSocios from '../components/Socios/ExcelSocios';

const HistorialSocios = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialDNI = searchParams.getAll('DNI');
  const dniFromParam = initialDNI ? initialDNI.join('\n') : ''; // Convertir a string
  const [socios, setSocios] = useState([]);
  const [diasCobro, setDiasCobro] = useState(new Set());
  const [documentos, setDocumentos] = useState(dniFromParam);
  const [selectedAño, setSelectedAño] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //Función para cargar los archivos en el input File
  const handleFileUpload = async (file) => {
    setIsLoading(true);
    try {
      const dnis = await uploadFile(file);
      // Dividir los DNIs por líneas
      const dnisSeparatedByLine = dnis.documentos ? dnis.documentos.join('\n') : '';
      setDocumentos(dnisSeparatedByLine);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleAñoChange = (e) => {
    setSelectedAño(e.target.value);
  };

  const handleBuscarClick = async () => {
    setIsLoading(true);
    try {
      // Dividir los documentos ingresados por líneas y eliminar líneas vacías
      const dnis = documentos.split('\n').filter((doc) => doc.trim() !== '');
      // Realizar la búsqueda de socios con los DNIs ingresados
      const sociosData = await fetchSocios(dnis, selectedAño);
      setSocios(sociosData);
      // Calcular los días de cobro y los períodos
      let diasSet = new Set();
      sociosData.forEach((socio) => {
        Object.entries(socio.Pagos).forEach(([periodo, pagos]) => {
          pagos.forEach((pago) => {
            diasSet.add(pago.Dia);
          });
        });
      });
      setDiasCobro(diasSet);
    } catch (error) {
      console.error('Error al buscar los socios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setDocumentos('');
    setSocios([]);
    setIsLoading(false);
    setSelectedAño('');
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <section className="overflow-x-auto w-full">
      <div className="flex flex-col items-center justify-center mb-1">
        <div className="mb-1 flex items-center gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="dniInput"
              className="text-xs italic text-center flex justify-center mr-2"
            >
              Ingresar el/los DNI's, uno por línea (MÁX 1000)
            </label>
            <textarea
              id="dniInput"
              className="flex-grow h-[28px] text-sm border border-black rounded-md p-1  focus:outline-none focus:border-blue-500"
              value={documentos}
              onChange={(e) => setDocumentos(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="fileInput"
              className="text-xs italic text-center  flex justify-center mr-2"
            >
              Seleccionar archivo (.txt, .csv, excel)
              <a
                href="https://drive.google.com/file/d/1WhDBhBnPKiWJsFN6ujiJALHc-raU2bgC/view?usp=sharing"
                className="italic text-blue-700 hover:text-blue-500 text-xs font-semibold pl-2"
                target="blank"
              >
                Ver Formato (pág. 2)
              </a>
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".txt, .csv, .xlsx, .xls"
              onChange={onFileChange}
              className="border text-sm px-1 py-[1px] border-black rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-xs italic text-center  flex justify-center mr-2"
              htmlFor="año"
            >
              Año:
            </label>
            <select
              id="año"
              value={selectedAño}
              onChange={handleAñoChange}
              className="flex-grow h-[28px] text-sm border border-black rounded-md p-1  focus:outline-none focus:border-blue-500"
            >
              <option value="">--Todos--</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5 mt-1">
          <button
            className={`bg-orange-500 hover:bg-orange-600 text-white px-4 border border-black rounded-md ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleBuscarClick}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Buscar'}
          </button>
          <button
            className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 border border-black rounded-md ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleReset}
            disabled={isLoading}
          >
            Nueva Consulta
          </button>
          <ExcelSocios diasCobro={diasCobro} socios={socios} isLoading={isLoading} />
        </div>
      </div>
      {socios.length > 0 ? (
        <div className="overflow-x-auto h-[24rem] px-1 mt-2">
          <h3 className="text-center font-bold text-sm mb-2">
            <span className="italic underline font-semibold">Socios Encontrados:</span>{' '}
            {socios.length}
          </h3>
          <table className="border-collapse text-center table-auto text-xs md:text-sm whitespace-nowrap">
            <thead>
              <tr>
                <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky top-0">
                  Socio
                </th>
                <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky top-0">
                  CBU
                </th>
                <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky top-0">
                  DNI
                </th>
                <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky top-0">
                  CUIL
                </th>
                <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky top-0">
                  Periodo
                </th>
                {[...diasCobro].map((dia, index) => (
                  <th
                    key={index}
                    className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky top-0"
                    style={{ minWidth: '50px', minHeight: '30px' }}
                  >
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {socios?.map((socio, index) => (
                <React.Fragment key={index}>
                  {Object.entries(socio.Pagos).map(([periodo, pagos], idx) => (
                    <tr key={`${index}-${idx}`}>
                      <td
                        className={`p-1 text-xs text-center ${
                          idx === 0 ? 'border-2 border-black' : 'bg-slate-500'
                        }`}
                      >
                        {idx === 0 && socio.Socio}
                      </td>
                      <td
                        className={`p-1 text-xs text-center ${
                          idx === 0 ? 'border-2 font-bold border-black' : 'bg-slate-500'
                        } ${
                          idx === 0 && socio.CBU === '027'
                            ? 'bg-white'
                            : idx === 0 &&
                              (socio.CBU === '002' ||
                                socio.CBU === '004' ||
                                socio.CBU === '005' ||
                                socio.CBU === '003' ||
                                socio.CBU === '006')
                            ? 'bg-violet-500'
                            : idx === 0
                            ? 'bg-blue-500'
                            : ''
                        }`}
                        title={`${idx === 0 ? determinarBancoPorCBU(socio.CBU) : ''}`}
                      >
                        <Link to={`/tablas/bancos?banco=${socio.CBU}`} target="_blank">
                          {idx === 0 && socio.CBU}
                        </Link>
                      </td>

                      <td
                        className={`p-1 text-xs text-center ${
                          idx === 0 ? 'border-2 border-black' : 'bg-slate-500'
                        } `}
                      >
                        {idx === 0 && socio.DNI}
                      </td>
                      <td
                        className={`p-1 text-xs text-center ${
                          idx === 0 ? 'border-2 border-black' : 'bg-slate-500'
                        }`}
                      >
                        {idx === 0 && socio.CUIL}
                      </td>
                      <td className="p-1 text-xs border border-black text-center">
                        {getNombrePeriodo(periodo)}
                      </td>
                      {[...diasCobro].map((dia, diaIndex) => {
                        const cobroDia = pagos.filter((pago) => pago.Dia === dia);

                        // Filtrar los códigos válidos y eliminar null
                        const validCodes = cobroDia
                          .map((pago) => pago.Codigo)
                          .filter((codigo) => codigo !== null);

                        // Usar un conjunto para almacenar los códigos únicos
                        const uniqueCodes = new Set(validCodes);
                        const codigos = [...uniqueCodes].join('-'); // Unir los códigos únicos

                        const hasCodes = uniqueCodes.size > 0; // Verificar si hay al menos un código presente

                        // Determinar la clase de color para el fondo de la celda
                        let cellColorClass = '';
                        if (hasCodes) {
                          if (uniqueCodes.size === 1) {
                            const codigo = [...uniqueCodes][0];
                            if (codigo === 'R10') {
                              cellColorClass = 'bg-yellow-400';
                            } else if (codigo === 'ACE') {
                              cellColorClass = 'bg-green-500';
                            } else {
                              cellColorClass = 'bg-red-500';
                            }
                          } else {
                            const isR10Present = uniqueCodes.has('R10');
                            const isACEPresent = uniqueCodes.has('ACE');
                            if (isR10Present && isACEPresent) {
                              cellColorClass =
                                'bg-gradient-to-b from-yellow-400 to-green-500';
                            } else if (isR10Present && !isACEPresent) {
                              cellColorClass =
                                'bg-gradient-to-b from-yellow-500 to-red-500';
                            } else if (!isR10Present && isACEPresent) {
                              cellColorClass =
                                'bg-gradient-to-b from-green-500 to-red-500';
                            } else {
                              cellColorClass = 'bg-red-500';
                            }
                          }
                        }

                        // Construir el título solo si hay al menos un código presente
                        const titleText = hasCodes
                          ? cobroDia
                              .map(
                                (item) =>
                                  `${formatFecha(item.FechaCobro)} - ${descripcionCodigo(
                                    item.Codigo,
                                  )} (${item.Concepto}) - $${item.Importe}`,
                              )
                              .join('\n')
                          : null;

                        return (
                          <td
                            key={diaIndex}
                            title={titleText}
                            className={`font-bold p-1 font-mono text-xs border border-black text-center ${
                              hasCodes ? cellColorClass : ''
                            }`}
                            style={{ minWidth: '50px', minHeight: '30px' }} // Establecer el ancho y alto mínimo
                          >
                            {codigos}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default HistorialSocios;
