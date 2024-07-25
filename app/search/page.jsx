"use client";

import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [works, setWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const worksPerPage = 5;

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch("/api/works");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        data.sort((a, b) => b._id - a._id);

        setWorks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWorks();
  }, []);

  const indexOfLastWork = currentPage * worksPerPage;
  const indexOfFirstWork = indexOfLastWork - worksPerPage;
  const currentWorks = works.slice(indexOfFirstWork, indexOfLastWork);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <section className="relative overflow-x-auto w-full flex flex-col justify-center items-center h-screen">
        <div className="my-5">
          <h1 className="text-2xl md:text-5xl font-bold">Busqueda te Trabajos</h1>
        </div>
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 mt-5 text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">Matricula</th>
              <th className="px-6 py-3">KM</th>
              <th className="px-6 py-3">Año</th>
              <th className="px-6 py-3">Fallo</th>
              <th className="px-6 py-3">Repuestos Info</th>
              <th className="px-6 py-3">Observaciones</th>
              <th className="px-6 py-3">Mecanico</th>
              <th className="px-6 py-3">Mano De Obra $</th>
              <th className="px-6 py-3">Repuesto $</th>
              <th className="px-6 py-3">Total $</th>
              <th className="px-6 py-3">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {currentWorks.map((work) => (
              <tr
                key={work._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{work.brand?.name || "na"}</td>
                <td className="px-6 py-4">{work.model?.name || "na"}</td>
                <td className="px-6 py-4">{work.matricula}</td>
                <td className="px-6 py-4">{work.km}</td>
                <td className="px-6 py-4">{work.anio}</td>
                <td className="px-6 py-4">{work.fallo}</td>
                <td className="px-6 py-4">{work.repuestosInfo}</td>
                <td className="px-6 py-4">{work.observaciones}</td>
                <td className="px-6 py-4">{work.tecnico?.username || "na"}</td>
                <td className="px-6 py-4">{work.manoDeObra}</td>
                <td className="px-6 py-4">{work.repuesto}</td>
                <td className="px-6 py-4">{work.total}</td>
                <td className="px-6 py-4">{work.client?.name || "na"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="mt-5 flex justify-center items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mr-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm text-gray-700 dark:text-gray-300 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentWorks.length < worksPerPage}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm text-gray-700 dark:text-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </section>
  );
};

export default SearchPage;
