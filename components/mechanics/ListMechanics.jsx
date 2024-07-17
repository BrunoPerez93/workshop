import React, { useEffect, useState } from "react";

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
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {currentMechanics.map((mechanic) => (
            <tr
              key={mechanic.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {mechanic.username}
              </td>
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
          disabled={currentMechanics.length < mechanicsPerPage || currentMechanics.length === 0}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm text-gray-700 dark:text-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListMechanics;
