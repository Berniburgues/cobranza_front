import axios from 'axios';

export const fetchData = async (page, limit, periodo) => {
  try {
    const response = await axios.get(
      `https://cobranza-back.onrender.com/clientes/pagos?page=${page}&limit=${limit}&periodo=${periodo}`,
    );
    const { data: responseData, totalPages: responseTotalPages } = response.data;
    return { responseData, responseTotalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
