import React, { useState } from "react";

const TableWorks = ({ currentWorks }) => {
    const [expandedRows, setExpandedRows] = useState({});

    const handleRowClick = (id) => {
        setExpandedRows((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-500 dark:text-gray-400 mt-5 text-center flex flex-col">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full text-center">
          <tr>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Celular</th>
            <th className="px-6 py-3">Matricula</th>
          </tr>
        </thead>
        <tbody>
          {currentWorks.map((work) => (
            <React.Fragment key={work._id}>
              <tr
                onClick={() => handleRowClick(work._id)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              >
                <td className="px-6 py-4">{`${work.client?.name}` || "na"}</td>
                <td className="px-6 py-4">{work.client?.cellphone || "na"}</td>
                <td className="px-6 py-4">{work.matricula}</td>
              </tr>
              {expandedRows[work._id] && (
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td colSpan="3">
                    <div className="p-4">
                      <p><strong>Brand:</strong> {work.brand?.name || "na"}</p>
                      <p><strong>Model:</strong> {work.model?.name || "na"}</p>
                      <p><strong>KM:</strong> {work.km}</p>
                      <p><strong>Año:</strong> {work.anio}</p>
                      <p><strong>Fallo:</strong> {work.fallo}</p>
                      <p><strong>Repuestos Utilizados:</strong> {work.repuestosInfo}</p>
                      <p><strong>Observaciones:</strong> {work.observaciones}</p>
                      <p><strong>Mecanico:</strong> {work.tecnico?.username || "na"}</p>
                      <p><strong>Mano De Obra:</strong> {`$ ${work.manoDeObra}`}</p>
                      <p><strong>Repuesto:</strong> {`$ ${work.repuesto}`}</p>
                      <p><strong>Total:</strong> {`$ ${work.total}`}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWorks;
