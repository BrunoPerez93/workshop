'use client';

import { useEffect, useState } from "react";

const useFetchClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients`);
        const data = await response.json();
        console.log(data);
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };
    fetchClients();
  }, []);

  return { clients };
};

export default useFetchClients;
