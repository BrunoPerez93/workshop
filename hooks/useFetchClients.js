'use client';

import { useEffect, useState } from "react";

const useFetchClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`/api/clients`);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };
    fetchBrands();
  }, []);

  return { clients };
};

export default useFetchClients;
