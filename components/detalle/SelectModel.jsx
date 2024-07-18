import ModalModel from "@/modals/ModalModel";
import { useEffect, useState } from "react";

const SelectModel = ({ selectedBrand, name, titleModel, nameButton }) => {
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [brands, setBrands] = useState([]);
  const [editModelName, setEditModelName] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`/api/brands`);
        const data = await response.json();
        console.log("Fetched Brands:", data);
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const fetchModels = async () => {
        try {
          const response = await fetch(`/api/modelos`);
          const data = await response.json();
          console.log("Fetched Models:", data);
          setAllModels(data);
        } catch (error) {
          console.error("Error fetching models", error);
        }
      };
      fetchModels();
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand) {
      const filteredModels = allModels.filter(
        (model) => model.brand_id === parseInt(selectedBrand)
      );
      setModels(filteredModels);
    }
  }, [selectedBrand, allModels]);

  const handleAgregarClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = () => {
    if (selectedModelId !== null) {
      const selectedModel = models.find((model) => model.id === parseInt(selectedModelId));
      if (selectedModel) {
        setEditModelName(selectedModel.name); // Update editModelName with selected model name
        setEditModalOpen(true);
      }
    } else {
      alert("Por favor, seleccione un modelo para editar.");
    }
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setEditModelName(""); // Clear editModelName when modal closes
  };

  const handleCreateModel = async (newModelName, brandId) => {
    try {
      const response = await fetch("/api/modelos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newModelName, brand_id: brandId }),
      });
      if (response.ok) {
        const newModel = await response.json();
        setModels([...models, newModel]);
        handleCloseModal();
        setMessageSuccess("Modelo Creado Con Éxito");
        setTimeout(() => {
          setMessageSuccess("");
        }, 3000);
      } else {
        console.error("Failed to create model");
      }
    } catch (error) {
      console.error("Error creating model", error);
    }
  };

  const handleEditModel = async (editedModelName, modelId, brandId) => {
    try {
      const response = await fetch(`/api/modelos/${modelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedModelName, brand_id: brandId }),
      });
      if (response.ok) {
        const updatedModel = await response.json();
        const updatedModels = models.map((model) =>
          model.id === updatedModel.id ? updatedModel : model
        );
        setModels(updatedModels);
        handleCloseModal();
        setMessageSuccess("Modelo Editado Con Éxito");
        setTimeout(() => {
          setMessageSuccess("");
        }, 3000);
      } else {
        console.error("Failed to edit model");
      }
    } catch (error) {
      console.error("Error editing model", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full min-w-[200px] h-10 mr-5">
            <select
              value={selectedModelId || ""}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            >
              <option value="" disabled>
                Seleccione un modelo...
              </option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              {name} *
            </label>
          </div>

          <button
            type="button"
            className="mr-2 btn-style"
            onClick={handleAgregarClick}
          >
            Agregar
          </button>

          <button type="button" className="btn-style" onClick={handleEditClick}>
            Editar
          </button>
        </div>

        {isCreateModalOpen && (
          <ModalModel
            onClose={handleCloseModal}
            onSubmit={handleCreateModel}
            brands={brands}
            titleModel="Agregar Nuevo Modelo"
            nameButton="Crear Modelo"
          />
        )}

        {isEditModalOpen && selectedModelId !== null && (
          <ModalModel
            onClose={handleCloseModal}
            onSubmit={(editedModelName, selectedBrandId) =>
              handleEditModel(editedModelName, selectedModelId, selectedBrandId)
            }
            brands={brands}
            titleModel="Editar Modelo"
            nameButton="Editar Modelo"
            initialModelName={editModelName} // Pass editModelName as initialModelName
            initialBrandId={selectedBrand} // Pass selectedBrand as initialBrandId
            isEdit={true}
          />
        )}
      </div>
      {messageSuccess && (
        <div className="text-center p-5 rounded-md bg-green-400 text-white font-bold">
          {messageSuccess}
        </div>
      )}
    </div>
  );
};

export default SelectModel;
