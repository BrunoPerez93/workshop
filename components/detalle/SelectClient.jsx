import { useState, useEffect } from "react";
import ModalClient from "@/modals/ModalClient";

const SelectClient = ({ selectedClient, setSelectedClient, name }) => {
  const [clients, setClients] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };
    fetchClients();
  }, []);

  const handleAgregarClick = () => {
    setEditClient(null);
    setCreateModalOpen(true);
  };

  const handleEditClick = () => {
    if (selectedClient) {
      const selectedClientObject = clients.find(
        (client) => client.id.toString() === selectedClient.toString()
      );
      if (selectedClientObject) {
        setEditClient(selectedClientObject);
        setEditModalOpen(true);
      } else {
        alert("El cliente seleccionado no es válido.");
      }
    } else {
      alert("Por favor, seleccione un cliente para editar.");
    }
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
  };

  const handleCreateClient = async (newClient) => {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      if (response.ok) {
        const newClientData = await response.json();
        setClients([...clients, newClientData]);
        handleCloseModal();
        setMessageSuccess("Cliente Creado Con Exito");
        setTimeout(() => {
          setMessageSuccess("");
        }, 3000);
      } else {
        console.error("Failed to create client");
      }
    } catch (error) {
      console.error("Error creating client", error);
    }
  };

  const handleEditClient = async (updatedClient) => {
    try {
      const response = await fetch(`/api/clients`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClient),
      });
      if (response.ok) {
        const updatedClientData = await response.json();
        setClients(
          clients.map((client) =>
            client.id === updatedClientData.id ? updatedClientData : client
          )
        );
        handleCloseModal();
        setMessageSuccess("Cliente Editado Con Exito");
        setTimeout(() => {
          setMessageSuccess("");
        }, 3000);
      } else {
        console.error("Failed to edit client");
      }
    } catch (error) {
      console.error("Error editing client", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full min-w-[200px] h-10 mr-5">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              name={name}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            >
              <option value="">Seleccionar Cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} {client.lastname}
                </option>
              ))}
            </select>
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              {name} *
            </label>
          </div>
          <button
            type="button"
            className="btn-style mr-2"
            onClick={handleAgregarClick}
          >
            Agregar
          </button>
          <button type="button" className="btn-style" onClick={handleEditClick}>
            Editar
          </button>
        </div>

        {isCreateModalOpen && (
          <ModalClient
            title="Crear Cliente"
            buttonLabel="Guardar"
            onClose={handleCloseModal}
            onSubmit={handleCreateClient}
            initialClient={{ name: "", lastname: "", ci: "", cellphone: "" }}
          />
        )}
        {isEditModalOpen && (
          <ModalClient
            title="Editar Cliente"
            buttonLabel="Guardar Cambios"
            initialClient={editClient}
            onClose={handleCloseModal}
            onSubmit={handleEditClient}
          />
        )}
      </div>
      {messageSuccess && (
        <p className="text-green-600 mt-3 text-sm font-semibold">
          {messageSuccess}
        </p>
      )}
    </div>
  );
};

export default SelectClient;
