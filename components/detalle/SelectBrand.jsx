"use client";

import { useEffect, useState } from "react";
import ModalBrand from "@/modals/ModalBrand";

const SelectBrand = ({ name }) => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands", error);
      }
    };
    fetchBrands();
  }, []);

  const handleAgregarClick = () => {
    console.log("Agregar button clicked");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Modal close requested");
    setModalOpen(false);
  };

  const handleCreateBrand = async (newBrandName) => {
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newBrandName }),
      });
      if (response.ok) {
        const newBrand = await response.json();
        setBrands([...brands, newBrand]);
        handleCloseModal();
        setMessageSuccess("Marca Creada Con Exito");
        setTimeout(() => {
          setMessageSuccess("");
        }, 3000);
      } else {
        console.error("Faild to create brand");
      }
    } catch (error) {
      console.error("Error creating brand", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="relative w-full min-w-[200px] h-10 mr-5">
            <select
              defaultValue=""
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            >
              <option value="" disabled>
                Seleccione una marca...
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
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

          <button type="button" className="btn-style">
            Editar
          </button>
        </div>

        {isModalOpen && (
          <ModalBrand onClose={handleCloseModal} onSubmit={handleCreateBrand} />
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

export default SelectBrand;
