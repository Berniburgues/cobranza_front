import axios from 'axios';

//Obtener Datos para Tabla Madre
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
    let url = `https://cobranza.2.us-1.fl0.io/clientes/cobranzaSocios?periodo=${periodo}`;

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
export const fetchSociosData = async (numerosSocio) => {
  try {
    const numerosSocioArray = Array.isArray(numerosSocio) ? numerosSocio : [numerosSocio];

    // const response = await axios.post('http://localhost:8080/clientes/socio', {
    const response = await axios.post('https://cobranza.2.us-1.fl0.io/clientes/socio', {
      numerosSocio: numerosSocioArray,
    });
    console.log(response.data);
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
    const url = `https://cobranza.2.us-1.fl0.io/clientes/historialDNI?banco=${banco}&periodo=${periodo}&dniComienzaCon=${
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
    let url = `https://cobranza.2.us-1.fl0.io/clientes/tablaImportes?periodo=${periodo}&banco=${banco}`;
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
    let url = `https://cobranza.2.us-1.fl0.io/bancos/data?banco=${banco}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Obtener Importes, Cuiles, Servicios
export const fetchImportes = async (periodo, bco, exb) => {
  try {
    let url = `https://cobranza.2.us-1.fl0.io/clientes/importes?periodo=${periodo}`;

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
    let url = `https://cobranza.2.us-1.fl0.io/clientes/importesPorFecha?periodo=${periodo}`;

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
    let url = `https://cobranza.2.us-1.fl0.io/clientes/cuiles?periodo=${periodo}`;

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
    let url = `https://cobranza.2.us-1.fl0.io/clientes/servicios?periodo=${periodo}`;

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

//Obtener Filtros para Tabla Madre
export const fetchFiltrosPagos = async () => {
  try {
    const res = await axios.get('https://cobranza.2.us-1.fl0.io/filtros/filtrosPagos');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
//Obtener Filtros para Tabla Historial DNI
export const fetchFiltrosDNI = async () => {
  try {
    const res = await axios.get('https://cobranza.2.us-1.fl0.io/filtros/DNI');
    return res.data;
  } catch (error) {
    throw error;
  }
};
//Obtener FIltros para Tabla Importes
export const fetchFiltrosTablaImportes = async () => {
  try {
    const res = await axios.get(
      'https://cobranza.2.us-1.fl0.io/filtros/filtrosTablaImportes',
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
//Obtener Filtros para Historial de Socio
export const fetchFiltroSocio = async (ace) => {
  try {
    let url = `https://cobranza.2.us-1.fl0.io/filtros/filtroSocios?ace=${ace}`;
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data.documentos || [];
    } else {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Servicio para los contadores del Home
export const fetchInfoHome = async () => {
  try {
    const res = await axios.get('https://cobranza.2.us-1.fl0.io/clientes/infoHome');
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
      'https://cobranza.2.us-1.fl0.io/clientes/fetchDatosTarjeta',
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
    const res = await axios.post('https://cobranza.2.us-1.fl0.io/clientes/datosTarjeta');
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
      `https://cobranza.2.us-1.fl0.io/clientes/deleteFilaTarjeta/${ids}`, // Incluir los IDs en la URL
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
      'https://cobranza.2.us-1.fl0.io/clientes/deleteAllFilas',
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
    const res = await axios.post('https://cobranza.2.us-1.fl0.io/users/login', {
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
      'https://cobranza.2.us-1.fl0.io/archivos/subir_archivo',
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
    const res = await axios.get('https://cobranza.2.us-1.fl0.io/archivos/cargaNovedades');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
