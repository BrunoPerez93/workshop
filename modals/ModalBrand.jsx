import { useState, useEffect } from "react";

const ModalBrand = ({
  onClose,
  onSubmit,
  titleBrand,
  submitButtonText,
  initialBrandName = "",
  messageError,
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
        <div className="flex py-4 justify-between">
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
            className="w-full border border-blue-gray-200 rounded py-2"
            value={brandName}
            onChange={handleInputChange}
            placeholder="Nombre de la marca"
          />
          {messageError && <div className="my-4 p-5">{messageError}</div>}
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blue-gray-200 rounded-b">
          <button
            className="btn-style"
            type="button"
            onClick={handleSubmit}
          >
            {submitButtonText}
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default ModalBrand;
