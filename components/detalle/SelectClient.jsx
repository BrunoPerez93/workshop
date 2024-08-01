"use client";

import { useState, useEffect } from "react";
import ModalClient from "@/modals/ModalClient";

const SelectClient = ({ selectedClient, setSelectedClient, name }) => {
  const [clients, setClients] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [messages, setMessages] = useState({ success: "", error: "" });
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleCreateClient = async (newClient) => {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      if (response.ok) {
        const newClientData = await response.json();
        setClients((prev) => [...prev, newClientData]);
        setMessages({ success: "Cliente creado con éxito", error: "" });
      } else {
        const errorData = await response.json();
        setMessages({ success: "", error: errorData.error });
      }
    } catch (error) {
      console.error("Error creating client:", error);
      setMessages({ success: "", error: "Error al crear cliente" });
    } finally {
      handleCloseModals();
      setTimeout(() => setMessages({ success: "", error: "" }), 3000);
    }
  };

  const handleEditClient = async (updatedClient) => {
    try {
      const response = await fetch(`/api/clients`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: updatedClient._id,
          name: updatedClient.name,
          lastname: updatedClient.lastname,
          ci: updatedClient.ci,
          cellphone: updatedClient.cellphone,
        }),
      });
      if (response.ok) {
        const updatedClientData = await response.json();
        setClients((prev) =>
          prev.map((client) =>
            client._id === updatedClientData._id ? updatedClientData : client
          )
        );
        setMessages({ success: "Cliente editado con éxito", error: "" });
      } else {
        const errorData = await response.json();
        setMessages({ success: "", error: errorData.error });
      }
    } catch (error) {
      console.error("Error editing client:", error);
      setMessages({ success: "", error: "Error al editar cliente" });
    } finally {
      handleCloseModals();
      setTimeout(() => setMessages({ success: "", error: "" }), 3000);
    }
  };

  const handleOpenCreateModal = () => {
    setEditClient(null);
    setCreateModalOpen(true);
  };

  const handleOpenEditModal = () => {
    if (!selectedClient) {
      alert("Por favor, seleccione un cliente para editar.");
      return;
    }

    const selectedClientObject = clients.find(
      (client) => client._id.toString() === selectedClient
    );

    if (selectedClientObject) {
      setEditClient(selectedClientObject);
      setEditModalOpen(true);
    } else {
      alert("El cliente seleccionado no es válido.");
    }
  };

  const handleCloseModals = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full  flex-col md:flex-row">
          <div className="relative w-full h-10 md:mr-5">
            <select
              value={selectedClient || ""}
              onChange={(e) => setSelectedClient(e.target.value)}
              name={name}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            >
              <option value="">Seleccionar Cliente</option>
              {Array.isArray(clients) ? (
                clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name} {client.lastname}
                  </option>
                ))
              ) : (
                <option value="">No clients available</option>
              )}
            </select>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              {name} *
            </label>
          </div>
          <div className="flex w-full">
            <button
              type="button"
              className="btn-style mr-2"
              onClick={handleOpenCreateModal}
            >
              Agregar
            </button>
            <button
              type="button"
              className="btn-style"
              onClick={handleOpenEditModal}
            >
              Editar
            </button>
          </div>
        </div>
        {messages.success && (
          <p className="mt-2 text-green-500">{messages.success}</p>
        )}
        {messages.error && (
          <p className="mt-2 text-red-500">{messages.error}</p>
        )}
      </div>
      {isCreateModalOpen && (
        <ModalClient
          title="Crear Cliente"
          buttonLabel="Guardar"
          onClose={handleCloseModals}
          onSubmit={handleCreateClient}
          initialClient={{ name: "", lastname: "", ci: "", cellphone: "" }}
        />
      )}
      {isEditModalOpen && (
        <ModalClient
          title="Editar Cliente"
          buttonLabel="Guardar Cambios"
          initialClient={editClient}
          onClose={handleCloseModals}
          onSubmit={handleEditClient}
        />
      )}
    </div>
  );
};

export default SelectClient;
