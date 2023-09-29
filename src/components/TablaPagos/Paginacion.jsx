import React from 'react';

const Paginacion = ({
  handlePageChange,
  pageNumber,
  renderPageButtons,
  data,
  pageSize,
}) => {
  return (
    <div className="my-1">
      <div className="flex justify-between items-center">
        <div>
          <i
            className={`fas fa-chevron-circle-left text-blue-500 text-2xl  ${
              pageNumber === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'hover:text-green-500 cursor-pointer'
            }`}
            onClick={() => {
              if (pageNumber !== 1) {
                handlePageChange(pageNumber - 1);
              }
            }}
          ></i>
        </div>
        <div className="flex">{renderPageButtons()}</div>
        <div>
          <i
            className={`fas fa-chevron-circle-right text-blue-500 text-2xl ${
              pageNumber === Math.ceil(data.length / pageSize)
                ? 'text-gray-400 cursor-not-allowed'
                : 'hover:text-green-500 cursor-pointer'
            }`}
            onClick={() => {
              if (pageNumber !== Math.ceil(data.length / pageSize)) {
                handlePageChange(pageNumber + 1);
              }
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Paginacion;
