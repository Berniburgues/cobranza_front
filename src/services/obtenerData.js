import axios from 'axios';

//Obtener Datos para Tabla Códigos
export const fetchDataPagos = async (
  periodo,
  cbu,
  codigos,
  convenio,
  ExB,
  dniComienzaCon,
  terminacionDni,
  tramo,
) => {
  try {
    // let url = `http://localhost:8080/clientes/cobranzaSocios?periodo=${periodo}`;
    let url = `https://back-atsapra.sytes.net:8080/clientes/cobranzaSocios?periodo=${periodo}`;

    if (cbu) {
      url += `&cbu=${cbu}`;
    }

    if (codigos && codigos.length > 0) {
      // Si codigos es un array y tiene elementos, agregamos múltiples parámetros 'codigo' a la URL
      codigos.forEach((codigo) => {
        url += `&codigo=${codigo}`;
      });
    }

    if (convenio) {
      url += `&convenio=${convenio}`;
    }

    if (ExB) {
      url += `&ExB=${ExB}`;
    }

    if (dniComienzaCon) {
      url += `&dniComienzaCon=${dniComienzaCon}`;
    }

    if (terminacionDni) {
      url += `&${terminacionDni.map((value) => `terminacionDni=${value}`).join('&')}`;
    }

    if (tramo) {
      url += `&tramo=${tramo}`;
    }

    const response = await axios.get(url);

    return {
      data: response.data.data, // Obtener los datos
      count: response.data.count, // Obtener el valor de count desde la respuesta
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener Datos de Socios
export const fetchSocios = async (documentos, año) => {
  try {
    const documentosArray = Array.isArray(documentos) ? documentos : [documentos];
    let url = 'https://back-atsapra.sytes.net:8080/clientes/historialSocios';

    // Agregar el parámetro del año a la URL si está definido
    if (año) {
      url += `?año=${año}`;
    }

    const response = await axios.post(url, {
      documentos: documentosArray,
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos de los socios:', error);
    return null;
  }
};

// Obtener Datos para Historial de DNI
export const fetchHistorialDNI = async (
  banco,
  periodo,
  dniComienzaCon,
  terminacionDni,
) => {
  try {
    // Construir la URL de la solicitud GET con los parámetros
    // const url = `http://localhost:8080/clientes/historialDNI?banco=${banco}&periodo=${periodo}&dniComienzaCon=${
    const url = `https://back-atsapra.sytes.net:8080/clientes/historialDNI?banco=${banco}&periodo=${periodo}&dniComienzaCon=${
      dniComienzaCon || ''
    }&${terminacionDni.map((value) => `terminacionDni=${value}`).join('&')}`;

    // Realizar la solicitud GET al servidor
    const response = await axios.get(url);

    // Verificar si la respuesta tiene datos
    if (response.data && response.data.data) {
      return response.data; // Devuelve tanto el count como los datos
    } else {
      // Si la respuesta está vacía o no tiene datos, devuelve un objeto vacío
      return { count: 0, totalSocios: 0, data: [] };
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los datos del historial:', error);
    return { count: 0, totalSocios: 0, data: [] }; // Devuelve un objeto vacío en caso de error
  }
};

export const getTablaImportes = async (banco, periodo, codigo) => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/clientes/tablaImportes?periodo=${periodo}&banco=${banco}`;
    //let url = `http://localhost:8080/clientes/tablaImportes?periodo=${periodo}&banco=${banco}`;

    // Agregar la condición para el código
    if (codigo) {
      url += `&codigo=${codigo}`;
    }

    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Obtener Datos para Bancos
export const getBanco = async (banco) => {
  try {
    // let url = `http://localhost:8080/bancos/data?banco=${banco}`;
    let url = `https://back-atsapra.sytes.net:8080/bancos/data?banco=${banco}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Obtener Importes, Cuiles, Servicios
export const fetchImportes = async (periodo, bco, exb) => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/clientes/importes?periodo=${periodo}`;

    if (bco) {
      url += `&bco=${bco}`;
    }
    if (exb) {
      url += `&exb=${exb}`;
    }

    const response = await axios.get(url);

    if (response.status === 200) {
      // Si la respuesta es exitosa, devuelve los datos
      return response.data;
    } else {
      // Si la respuesta tiene un estado diferente a 200, puedes manejar el error aquí
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los importes:', error);
    throw error;
  }
};
export const fetchImportesPorFecha = async (periodo, bco, exb) => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/clientes/importesPorFecha?periodo=${periodo}`;

    if (bco) {
      url += `&bco=${bco}`;
    }
    if (exb) {
      url += `&exb=${exb}`;
    }

    const response = await axios.get(url);

    if (response.status === 200) {
      // Si la respuesta es exitosa, devuelve los datos
      return response.data;
    } else {
      // Si la respuesta tiene un estado diferente a 200, puedes manejar el error aquí
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los importes:', error);
    throw error;
  }
};
export const fetchCuiles = async (periodo, bco) => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/clientes/cuiles?periodo=${periodo}`;

    if (bco) {
      url += `&bco=${bco}`;
    }

    const response = await axios.get(url);

    if (response.status === 200) {
      // Si la respuesta es exitosa, devuelve los datos
      return response.data;
    } else {
      // Si la respuesta tiene un estado diferente a 200, puedes manejar el error aquí
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los cuiles:', error);
    throw error;
  }
};
export const fetchServicios = async (periodo, bco) => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/clientes/servicios?periodo=${periodo}`;

    if (bco) {
      url += `&bco=${bco}`;
    }

    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    throw error;
  }
};

//Obtener listado de Socios con Stop Debit (R08)
export const stopDebit = async (periodo, bco) => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/clientes/stopDebit?periodo=${periodo}`;

    if (bco) {
      url += `&banco=${bco}`;
    }

    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//Obtener Filtros de Todos los Períodos
export const filtroPeriodos = async () => {
  try {
    let url = `https://back-atsapra.sytes.net:8080/filtros/periodos`;

    const res = await axios.get(url);
    return res.data.Periodos;
  } catch (error) {
    console.error(error);
  }
};

//Obtener Filtros para Tabla Madre
export const fetchFiltrosPagos = async () => {
  try {
    const res = await axios.get(
      'https://back-atsapra.sytes.net:8080/filtros/filtrosPagos',
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
//Obtener Filtros para Tabla Historial DNI
export const fetchFiltrosDNI = async () => {
  try {
    const res = await axios.get('https://back-atsapra.sytes.net:8080/filtros/DNI');
    return res.data;
  } catch (error) {
    throw error;
  }
};
//Obtener FIltros para Tabla Importes
export const fetchFiltrosTablaImportes = async () => {
  try {
    const res = await axios.get(
      'https://back-atsapra.sytes.net:8080/filtros/filtrosTablaImportes',
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

//Servicio para los contadores del Home
export const fetchInfoHome = async () => {
  try {
    const res = await axios.get('https://back-atsapra.sytes.net:8080/clientes/infoHome');
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

//Servicio para los contadores del Home
export const fetchDatosTarjeta = async () => {
  try {
    const res = await axios.get(
      'https://back-atsapra.sytes.net:8080/clientes/fetchDatosTarjeta',
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// Servicio para insertar datos en la tabla de Tarjetas Web
export const insertDatosTarjeta = async () => {
  try {
    const res = await axios.post(
      'https://back-atsapra.sytes.net:8080/clientes/datosTarjeta',
    );
    console.log(res.data); // Muestra la respuesta del servidor en la consola
    return res.data; // Retorna los datos de la respuesta si es necesario
  } catch (error) {
    console.error('Error al insertar datos de tarjeta en el servidor:', error);
    throw error; // Lanza el error para manejarlo en el componente que llama a esta función
  }
};

// Servicio para eliminar una o varias filas del historial de tarjetas
export const eliminarFilaTarjeta = async (ids) => {
  try {
    const res = await axios.delete(
      `https://back-atsapra.sytes.net:8080/clientes/deleteFilaTarjeta/${ids}`, // Incluir los IDs en la URL
    );
    console.log(res.data); // Muestra la respuesta del servidor en la consola
    return res.data; // Retorna los datos de la respuesta si es necesario
  } catch (error) {
    console.error('Error al eliminar filas del historial en el servidor:', error);
    throw error; // Lanza el error para manejarlo en el componente que llama a esta función
  }
};

//Eliminar todas las filas del historial de Tarjetas
export const eliminarTodasLasFilasTarjeta = async (id) => {
  try {
    const res = await axios.delete(
      'https://back-atsapra.sytes.net:8080/clientes/deleteAllFilas',
    );
    console.log(res.data); // Muestra la respuesta del servidor en la consola
    return res.data; // Retorna los datos de la respuesta si es necesario
  } catch (error) {
    console.error('Error al eliminar fila del historial en el servidor:', error);
    throw error; // Lanza el error para manejarlo en el componente que llama a esta función
  }
};

//Servicio para el Login
export const loginService = async (email, password) => {
  try {
    const res = await axios.post('https://back-atsapra.sytes.net:8080/users/login', {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Servicio para subir archivos para historial Socio
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      'https://back-atsapra.sytes.net:8080/archivos/subir_archivo',
      formData,
    );
    return response.data;
  } catch (error) {
    // Manejar el error, mostrar un mensaje, etc.
    console.error('Error al subir el archivo:', error);
    throw error;
  }
};

//Servicio para carga de Archivos de Novedades
export const fetchCargaNovedades = async () => {
  try {
    const res = await axios.get(
      'https://back-atsapra.sytes.net:8080/archivos/cargaNovedades',
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//Llamada para obtener tabla de Servicios y sus correspondientes Beneficios
export const getServiciosYBeneficios = async () => {
  try {
    const res = await axios.get('https://back-atsapra.sytes.net:8080/servicios');
    if (res.status === 200) {
      return res.data.data;
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

//Obtener Socios y sus Servicios
export const getSociosYServicios = async (banco, ExB, titular, documentos) => {
  try {
    const documentosArray = Array.isArray(documentos) ? documentos : [documentos];
    let url = `https://back-atsapra.sytes.net:8080/servicios/sociosServicios?`;

    const queryParams = [];
    if (banco) {
      queryParams.push(`banco=${banco}`);
    }

    if (ExB) {
      queryParams.push(`ExB=${ExB}`);
    }

    if (titular) {
      queryParams.push(`titular=${titular}`);
    }

    if (queryParams.length > 0) {
      url += queryParams.join('&');
    }

    const res = await axios.post(url, {
      documentos: documentosArray,
    });

    if (res.status === 200) {
      return res.data.data[0];
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

//Obtener padrones
export const fetchPadronData = async (params) => {
  const queryParams = new URLSearchParams(params);
  const response = await axios.get(
    `https://back-atsapra.sytes.net:8080/padron?${queryParams.toString()}`,
  );
  return response.data.data;
};

//ENVIOS
const baseURL = 'https://back-cobranza-1n55.onrender.com/archivos'; // URL base de tu backend

// Llamada 1: Obtener periodos y envíos
export const obtenerEnvios = async () => {
  try {
    const response = await axios.get(`${baseURL}/envios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener periodos y envíos:', error);
    throw error;
  }
};

// Llamada 2: Obtener archivos por envioId
export const obtenerArchivos = async (envioId) => {
  try {
    const response = await axios.get(`${baseURL}/envios/${envioId}/archivos`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener archivos para el envioId ${envioId}:`, error);
    throw error;
  }
};

// Llamada 3: Obtener contenido del archivo TXT
export const obtenerContenidoTXT = async (envioId, archivo) => {
  try {
    const response = await axios.get(
      `${baseURL}/envios/${envioId}/archivos/${archivo}/txt`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener el contenido del archivo ${archivo} para el envioId ${envioId}:`,
      error,
    );
    throw error;
  }
};
