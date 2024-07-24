'use client'

import { useEffect, useState } from "react";

const ModalModel = ({
  onClose,
  onSubmit,
  brands,
  titleModel,
  nameButton,
  initialModelName = "",
  initialBrandId = "",
  isEdit = false,
  messageError,
}) => {
  const [modelName, setModelName] = useState(initialModelName);
  const [selectedBrandId, setSelectedBrandId] = useState(initialBrandId);

  useEffect(() => {
    setModelName(initialModelName);
    setSelectedBrandId(initialBrandId);
  }, [initialModelName, initialBrandId]);

  const handleInputChange = (e) => {
    setModelName(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrandId(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(modelName, selectedBrandId);
    setModelName("");
    setSelectedBrandId("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 z-5">
      <div className="bg-white rounded-md max-w-md mb-5 border p-5  w-full">
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold">{titleModel}</h3>
          <button
            type="button"
            className="py-3 ml-auto bg-transparent border-0 text-blue-gray-500 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={onClose}
          >
            <span className="text-blue-gray-500 opacity-5">×</span>
          </button>
        </div>
        <div className="relative flex-auto">
          <input
            type="text"
            placeholder="Nombre del modelo"
            value={modelName}
            onChange={handleInputChange}
            className="w-full py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900"
          />
          {messageError && <div className="my-4 p-5">{messageError}</div>}
          {!isEdit && (
            <select
              value={selectedBrandId}
              onChange={handleBrandChange}
              className="w-full mt-5 mb-5  py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900"
            >
              <option value="" disabled>
                Seleccione una marca...
              </option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="p-4 flex justify-end">
          <button
            type="button"
            className="btn-style"
            onClick={handleSubmit}
            disabled={!modelName || (!isEdit && !selectedBrandId)}
          >
            {nameButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalModel;
