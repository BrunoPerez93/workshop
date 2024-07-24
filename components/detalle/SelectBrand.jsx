'use client';

import { useEffect, useState } from "react";
import ModalBrand from "@/modals/ModalBrand";

const SelectBrand = ({ selectedBrand, setSelectedBrand, name }) => {
  const [brands, setBrands] = useState([]);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
  });
  const [messages, setMessages] = useState({
    success: "",
    error: "",
  });
  const [editBrandName, setEditBrandName] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        if (!response.ok) throw new Error("Failed to fetch brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        setMessages((prev) => ({
          ...prev,
          error: "Error fetching brands",
        }));
      }
    };
    fetchBrands();
  }, []);

  const openModal = (type) => setModalState((prev) => ({ ...prev, [type]: true }));
  const closeModals = () => setModalState({ create: false, edit: false });

  const handleCreateBrand = async (newBrandName) => {
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrandName }),
      });

      if (!response.ok) {
        throw new Error("Error creating brand");
      }

      const result = await response.json();
      setBrands((prev) => [...prev, result]);
      setMessages({ success: "Marca Creada Correctamente", error: "" });
    } catch (error) {
      setMessages({ success: "", error: error.message });
    } finally {
      setTimeout(() => setMessages((prev) => ({ ...prev, success: "", error: "" })), 3000);
      closeModals();
    }
  };

  const handleEditBrand = async (newBrandName) => {
    if (!selectedBrand) {
      alert("Por favor selecione una marca para editar.");
      return;
    }

    try {
      const response = await fetch("/api/brands", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedBrand, name: newBrandName }),
      });

      if (!response.ok) throw new Error("Failed to edit brand");

      const updatedBrand = await response.json();
      setBrands((prev) =>
        prev.map((brand) => (brand._id === updatedBrand._id ? updatedBrand : brand))
      );
      setMessages({ success: "Marca Editada Correctamente", error: "" });
    } catch (error) {
      setMessages({ success: "", error: error.message });
    } finally {
      setTimeout(() => setMessages((prev) => ({ ...prev, success: "", error: "" })), 3000);
      closeModals();
    }
  };

  const handleSelectBrand = (e) => setSelectedBrand(e.target.value);

  const handleEditClick = () => {
    if (selectedBrand) {
      const selectedBrandObject = brands.find(
        (brand) => brand._id.toString() === selectedBrand.toString()
      );
      if (selectedBrandObject) {
        setEditBrandName(selectedBrandObject.name);
        openModal('edit');
      } else {
        alert("La marca selecionada no es valida.");
      }
    } else {
      alert("Por favor selecione una marca para editar.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full min-w-[200px] h-10 mr-5">
            <select
              value={selectedBrand}
              onChange={handleSelectBrand}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            >
              <option value="" disabled>Seleccione una marca...</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              {name}
            </label>
          </div>
          <button
            className="btn-style mr-2"
            type="button"
            onClick={() => openModal('create')}
          >
            Agregar
          </button>
          <button
            className="btn-style"
            type="button"
            onClick={handleEditClick}
          >
            Editar
          </button>
        </div>
        {messages.success && <p className="mt-2 text-green-500">{messages.success}</p>}
        {messages.error && <p className="mt-2 text-red-500">{messages.error}</p>}
      </div>
      {modalState.create && (
        <ModalBrand
          onClose={closeModals}
          onSubmit={handleCreateBrand}
          titleBrand="Agregar Nueva Marca"
          submitButtonText="Crear Marca"
        />
      )}
      {modalState.edit && (
        <ModalBrand
          onClose={closeModals}
          onSubmit={(name) => handleEditBrand(name)}
          titleBrand="Editar Marca"
          submitButtonText="Editar Marca"
          initialValues={{ name: editBrandName }}
        />
      )}
    </div>
  );
};

export default SelectBrand;
