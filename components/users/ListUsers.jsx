"use client";

import PaginationButtons from "@/components/PaginationButtons";
import React, { useEffect, useState } from "react";
import TableUsers from "./TableUsers";

const ListUsers = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        data.sort((a, b) => b.id - a.id);

        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, [refresh]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto w-full flex flex-col justify-center items-center">
      <TableUsers currentUsers={currentUsers}/>

      <PaginationButtons
        currentPage={currentPage}
        itemsPerPage={usersPerPage}
        totalItems={users.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ListUsers;
