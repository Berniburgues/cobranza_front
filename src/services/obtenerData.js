import axios from 'axios';

export const fetchData = async (page, limit) => {
  try {
    const response = await axios.get(
      `https://cobranza-back.onrender.com/clientes/pagos?page=${page}&limit=250`,
    );
    const { data: responseData, totalPages: responseTotalPages } = response.data;
    console.log(response.data);
    return { responseData, responseTotalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
