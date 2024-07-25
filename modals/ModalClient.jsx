'use client';

import { useState, useEffect } from "react";

const ModalClient = ({
  onClose,
  onSubmit,
  title,
  buttonLabel,
  initialClient = { name: "", lastname: "", ci: "", cellphone: "" },
}) => {
  const [client, setClient] = useState(initialClient);

  useEffect(() => {
    setClient(initialClient);
  }, [initialClient]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(client);
    setClient({ name: "", lastname: "", ci: "", cellphone: "" });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 z-5">
      <div className="back_modal rounded-md w-full max-w-md mb-5 border p-5">
        <div className="flex p-5 justify-between">
          <h3 className="text-2xl font-semibold">{title}</h3>
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
            name="name"
            placeholder="Nombre"
            value={client.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900 mb-2"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={client.lastname}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900 mb-2"
          />
          <input
            type="text"
            name="ci"
            placeholder="CI"
            value={client.ci}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900 mb-2"
          />
          <input
            type="text"
            name="cellphone"
            placeholder="Celular"
            value={client.cellphone}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-blue-gray-700 border border-blue-gray-200 rounded-md focus:outline-none focus:border-gray-900 mb-2"
          />
        </div>
        <div className="p-4 flex justify-end">
          <button type="button" className="btn-style" onClick={handleSubmit}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalClient;
