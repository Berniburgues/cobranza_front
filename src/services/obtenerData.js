import axios from 'axios';

// Obtener Datos para Tabla de Cobranza
export const fetchData = async (page, limit, periodo, codigo, cbu) => {
  try {
    let url = `https://cobranza-hent-dev.fl0.io/clientes/pagos?page=${page}&limit=${limit}&periodo=${periodo}`;

    if (codigo) {
      url += `&codigo=${codigo}`;
    }

    if (cbu) {
      url += `&CBU=${cbu}`;
    }

    const response = await axios.get(url);
    const {
      data: responseData,
      totalPages: responseTotalPages,
      totalCount: responseTotalCount,
    } = response.data;
    return { responseData, responseTotalPages, responseTotalCount };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener Datos de Socio individual
export const fetchSocioData = async (numeroSocio) => {
  try {
    // Realizar la solicitud GET al servidor
    const response = await axios.get(
      `https://cobranza-hent-dev.fl0.io/clientes/socio?numeroSocio=${numeroSocio}`,
    );

    // Devolver los datos obtenidos
    return response.data.data[0];
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al obtener los datos del socio:', error);
    return null;
  }
};

//Servicio para el Login
export const loginService = async (email, password) => {
  try {
    const res = await axios.post('https://cobranza-hent-dev.fl0.io/users/login', {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
