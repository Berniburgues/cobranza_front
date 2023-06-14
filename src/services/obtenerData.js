import axios from 'axios';

export const fetchData = async (page, limit) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/clientes/pagos?page=${page}&limit=500`,
    );
    const { data: responseData, totalPages: responseTotalPages } = response.data;
    return { responseData, responseTotalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
