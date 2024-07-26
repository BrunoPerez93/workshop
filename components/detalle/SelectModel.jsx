import { useEffect, useState } from "react";
import ModalModel from "@/modals/ModalModel";
import useFetchBrands from "@/hooks/useFetchBrands";
import useFetchModels from "@/hooks/useFetchModels";

const SelectModel = ({ selectedBrand, selectedModel, setSelectedModel, name }) => {
  const { brands } = useFetchBrands();
  const { models, fetchModels } = useFetchModels(selectedBrand);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [messages, setMessages] = useState({ success: "", error: "" });
  const [editModelName, setEditModelName] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);

  useEffect(() => {
    if (selectedBrand) {
      fetchModels();
    }
  }, [selectedBrand, fetchModels]);

  useEffect(() => {
    if (Array.isArray(models) && models.length > 0) {
      setSelectedModelId(models[0]._id);
    }
  }, [models]);

  const handleAgregarClick = () => setCreateModalOpen(true);

  const handleEditClick = () => {
    if (selectedModelId === null) {
      alert("Por favor, seleccione un modelo para editar.");
      return;
    }

    const selectedModel = models.find((model) => model._id === selectedModelId);
    if (selectedModel) {
      setEditModelName(selectedModel.name);
      setEditModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setEditModelName("");
  };

  const showMessage = (message, type) => {
    setMessages({ ...messages, [type]: message });
    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [type]: "" }));
    }, 3000);
  };

  const handleCreateModel = async (newModelName, brandId) => {
    try {
      const response = await fetch("/api/modelos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newModelName, brand_id: brandId }),
      });

      const result = await response.json();
      if (response.ok) {
        showMessage("Modelo Creado Con Éxito", "success");
        handleCloseModal();
        fetchModels();
      } else {
        showMessage(result.error || "Error creando modelo", "error");
      }
    } catch (error) {
      console.error("Error creating model", error);
      showMessage("Error creando modelo", "error");
    }
  };

  const handleEditModel = async (editedModelName, modelId, brandId) => {
    try {
      const response = await fetch(`/api/modelos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: modelId,
          name: editedModelName,
          brand_id: brandId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        showMessage("Modelo Editado Con Éxito", "success");
        handleCloseModal();
        fetchModels();
      } else {
        showMessage(result.error || "Error editando modelo", "error");
      }
    } catch (error) {
      console.error("Error editing model", error);
      showMessage("Error editando modelo", "error");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full flex-col md:flex-row">
          <div className="relative w-full h-10 md:mr-5">
            <select
              value={selectedModelId || ""}
              onChange={(e) => {
                const modelId = e.target.value;
                setSelectedModelId(modelId);
                setSelectedModel(modelId); 
              }}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            >
              <option value="" disabled>
                Seleccione un modelo...
              </option>
              {Array.isArray(models) &&
                models.map((model) => (
                  <option key={model._id} value={model._id}>
                    {model.name}
                  </option>
                ))}
            </select>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              {name} *
            </label>
          </div>

          <div className="flex w-full">
            <button
              type="button"
              className="mr-2 btn-style"
              onClick={handleAgregarClick}
            >
              Agregar
            </button>

            <button
              type="button"
              className="btn-style"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
        </div>

        {isCreateModalOpen && (
          <ModalModel
            onClose={handleCloseModal}
            onSubmit={(newModelName, selectedBrandId) =>
              handleCreateModel(newModelName, selectedBrandId || selectedBrand)
            }
            brands={brands}
            titleModel="Agregar Nuevo Modelo"
            nameButton="Crear Modelo"
            messageError={messages.error}
          />
        )}

        {isEditModalOpen && selectedModelId !== null && (
          <ModalModel
            onClose={handleCloseModal}
            onSubmit={(editedModelName, selectedBrandId) =>
              handleEditModel(editedModelName, selectedModelId, selectedBrandId || selectedBrand)
            }
            brands={brands}
            titleModel="Editar Modelo"
            nameButton="Editar Modelo"
            initialModelName={editModelName}
            initialBrandId={selectedBrand}
            isEdit={true}
          />
        )}
      </div>
      {messages.success && (
        <div className="message-success text-green-500">{messages.success}</div>
      )}
      {messages.error && (
        <div className="message-error text-red-500">{messages.error}</div>
      )}
    </div>
  );
};

export default SelectModel;
