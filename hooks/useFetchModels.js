import { useEffect, useState, useCallback } from "react";

const useFetchModels = (selectedBrand) => {
  const [models, setModels] = useState([]);

  const fetchModels = useCallback(async () => {
    if (!selectedBrand) return; 

    try {
      const response = await fetch(`/api/modelos?brand_id=${selectedBrand}`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models", error);
    }
  }, [selectedBrand]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]); 

  return { models, fetchModels };
};

export default useFetchModels;
