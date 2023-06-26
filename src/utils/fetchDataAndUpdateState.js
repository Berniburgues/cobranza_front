export const fetchDataAndUpdateState = async () => {
  setIsLoading(true);
  try {
    const response = await fetchData(currentPage);
    const { responseData, responseTotalPages } = response;

    // Verificar si es la primera página
    if (currentPage === 1) {
      setData(responseData);
      setPrimerCarga(false);
    } else {
      // Verificar si la página ya ha sido cargada previamente
      const hasPageBeenLoaded = responseData.some((item) =>
        data.some((existingItem) => existingItem.Socio === item.Socio),
      );

      if (!hasPageBeenLoaded) {
        setData((prevData) => [...prevData, ...responseData]);
      }
    }

    // Verificar si hay más páginas para cargar
    if (currentPage >= responseTotalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  } catch (error) {
    console.error(error);
  }

  setIsLoading(false);
};