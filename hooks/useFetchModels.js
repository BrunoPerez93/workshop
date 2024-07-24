import { useEffect, useState } from "react";

const useFetchModels = (selectedBrand) => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      const response = await fetch(`/api/modelos?brand_id=${selectedBrand}`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [selectedBrand]);

  return { models, fetchModels };
};

export default useFetchModels;
