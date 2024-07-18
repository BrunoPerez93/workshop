
import { useEffect, useState } from "react";

const useFetchModels = (selectedBrand) => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      const response = await fetch(`/api/modelos`);
      const data = await response.json();
      const filteredModels = selectedBrand
        ? data.filter((model) => model.brand_id === parseInt(selectedBrand))
        : data;
      setModels(filteredModels);
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
