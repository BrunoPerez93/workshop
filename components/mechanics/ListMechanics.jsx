"use client";

import PaginationButtons from "@/components/PaginationButtons";
import React, { useEffect, useState } from "react";
import TableMechanics from "./TableMechanics";

const ListMechanics = ({ refresh }) => {
  const [mechanics, setMechanics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mechanicsPerPage = 5;

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await fetch("/api/mechanic");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();

        data.sort((a, b) => b.id - a.id);

        setMechanics(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMechanics();
  }, [refresh]);

  const indexOfLastMechanic = currentPage * mechanicsPerPage;
  const indexOfFirstMechanic = indexOfLastMechanic - mechanicsPerPage;
  const currentMechanics = mechanics.slice(indexOfFirstMechanic, indexOfLastMechanic);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto w-full flex flex-col justify-center items-center">
     <TableMechanics currentMechanics={currentMechanics}/>

      <PaginationButtons
        currentPage={currentPage}
        itemsPerPage={mechanicsPerPage}
        totalItems={mechanics.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ListMechanics;
