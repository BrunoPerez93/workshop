"use client";

import PaginationButtons from "@/components/PaginationButtons";
import InputSearch from "@/components/search/InputSearch";
import TableWorks from "@/components/search/TableWorks";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
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
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setWorks(data);
        setFilteredWorks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWorks();
  }, []);

  const handleSearchResults = (results) => {
    setFilteredWorks(results);
    setCurrentPage(1);
  };

  const indexOfLastWork = currentPage * worksPerPage;
  const indexOfFirstWork = indexOfLastWork - worksPerPage;
  const currentWorks = filteredWorks.slice(indexOfFirstWork, indexOfLastWork);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="relative overflow-x-auto w-full flex flex-col justify-center items-center h-screen bg-white">
      <div className="my-5">
        <h1 className="text-2xl md:text-5xl font-bold">Busqueda de Trabajos</h1>
      </div>
      <InputSearch onSearchResults={handleSearchResults} />

      <TableWorks currentWorks={currentWorks} />

      <PaginationButtons
        currentPage={currentPage}
        itemsPerPage={worksPerPage}
        totalItems={filteredWorks.length}
        paginate={paginate}
      />
    </section>
  );
};

export default SearchPage;