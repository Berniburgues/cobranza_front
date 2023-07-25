import axios from 'axios';

export const fetchData = async (page, limit, periodo) => {
  try {
    const response = await axios.get(
      `https://cobranza-back.onrender.com/clientes/pagos?page=${page}&limit=${limit}&periodo=${periodo}`,
    );
    const {
      data: responseData,
      totalPages: responseTotalPages,
      totalCount: responseTotalCount,
    } = response.data; // Agregar totalCount a la desestructuración
    return { responseData, responseTotalPages, responseTotalCount }; // Incluir totalCount en el objeto de retorno
  } catch (error) {
    console.error(error);
    throw error;
  }
};
