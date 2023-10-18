import axios from 'axios';

//Obtener Datos para Tabla Madre
export const fetchDataPagos = async (periodo, cbu, codigo, convenio, ExB) => {
  try {
    let url = `https://cobranza.2.us-1.fl0.io/clientes/cobranzaSocios?periodo=${periodo}`;

    if (cbu) {
      url += `&cbu=${cbu}`;
    }

    if (codigo) {
      url += `&codigo=${codigo}`;
    }

    if (convenio) {
      url += `&convenio=${convenio}`;
    }

    if (ExB) {
      url += `&ExB=${ExB}`;
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

//Obtener Importes Enviados y Cobrados
export const fetchImportes = async (periodo, bco) => {
  try {
    let url = `https://cobranza.2.us-1.fl0.io/clientes/importes?periodo=${periodo}`;

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
    console.error('Error al obtener los importes:', error);
    throw error;
  }
};

export const fetchCuiles = async (periodo) => {
  try {
    let url = `https://cobranza.2.us-1.fl0.io/clientes/cuiles?periodo=${periodo}`;

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

//Obtener Filtros para Tabla Madre
export const fetchFiltrosPagos = async () => {
  try {
    const res = await axios.get('https://cobranza.2.us-1.fl0.io/filtros/filtrosPagos');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Obtener Datos de Socio individual
export const fetchSocioData = async (numeroSocio) => {
  try {
    // Realizar la solicitud GET al servidor
    const response = await axios.get(
      `https://cobranza.2.us-1.fl0.io/clientes/socio?numeroSocio=${numeroSocio}`,
    );

    // Devolver los datos obtenidos
    return response.data;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los datos del socio:', error);
    return null;
  }
};

//Obtener Datos para Historial de DNI
export const fetchHistorialDNI = async (banco, periodo) => {
  try {
    // Realizar la solicitud GET al servidor con los parámetros banco y periodo
    const response = await axios.get(
      `https://cobranza.2.us-1.fl0.io/clientes/historialDNI?banco=${banco}&periodo=${periodo}`,
    );

    // Verificar si la respuesta tiene datos
    if (response.data && response.data.data) {
      return response.data; // Devuelve tanto el count como los datos
    } else {
      // Si la respuesta está vacía o no tiene datos, devuelve un objeto vacío
      return { count: 0, data: [] };
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los datos del historial:', error);
    return { count: 0, data: [] }; // Devuelve un objeto vacío en caso de error
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
