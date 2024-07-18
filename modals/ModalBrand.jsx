import { useState, useEffect } from "react";

const ModalBrand = ({
  onClose,
  onSubmit,
  titleBrand,
  nameButton,
  initialBrandName = "",
}) => {
  const [brandName, setBrandName] = useState(initialBrandName);

  useEffect(() => {
    setBrandName(initialBrandName);
  }, [initialBrandName]);

  const handleInputChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(brandName);
    setBrandName("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 z-5 ">
      <div className="bg-white rounded-md w-full max-w-md mb-5 border p-5">
        <div className="flex p-5 justify-between">
          <h3 className="text-2xl font-semibold">{titleBrand}</h3>
          <button
            type="button"
            className="p-1 ml-auto bg-transparent border-0 text-blue-gray-500 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={onClose}
          >
            <span className="text-blue-gray-500 opacity-5">×</span>
          </button>
        </div>
        <div className="relative p-6 flex-auto">
          <input
            type="text"
            placeholder="Nombre de la marca"
            value={brandName}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900"
          />
        </div>
        <div className="p-4 flex justify-end">
          <button type="button" className="btn-style" onClick={handleSubmit}>
            {nameButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBrand;
