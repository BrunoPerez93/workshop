import { useState } from "react";
import SelectBrand from "./SelectBrand";
import SelectModel from "./SelectModel";
import SelectClient from "./SelectClient";
import InputForm from "../InputForm";
import SelectMechanic from "./SelectMechanic";

const FormDetalleTrabajo = () => {
  const initialFormData = {
    matricula: "",
    km: "",
    year: "",
    fallo: "",
    repuestos: "",
    observaciones: "",
  };

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [manoDeObra, setManoDeObra] = useState(0);
  const [repuesto, setRepuesto] = useState(0);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [messages, setMessages] = useState({
    success: "",
    error: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleManoDeObraChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setManoDeObra(value);
    setTotal(value + repuesto);
  };

  const handleRepuestoChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setRepuesto(value);
    setTotal(manoDeObra + value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedModel || !selectedMechanic) {
      console.error("Model and Mechanic are required");
      return;
    }

    const dataToSend = {
      ...formData,
      brand: selectedBrand,
      model: selectedModel,
      client: selectedClient,
      tecnico: selectedMechanic,
      manoDeObra,
      repuesto,
      total,
    };

    try {
      const response = await fetch("/api/works", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Failed to create work:", errorResponse);
        throw new Error(errorResponse.error || "Failed to create work");
      }

      const result = await response.json();
      setFormData(initialFormData);
      setSelectedBrand("");
      setSelectedModel("");
      setSelectedClient("");
      setSelectedMechanic("");
      setManoDeObra(0);
      setRepuesto(0);
      setTotal(0);

      setTimeout(() => {
        setMessages({ success: "", error: "" });
      }, 3000);
      setMessages({ success: "Trabajo Ingresado Correctamente", error: "" });
    } catch (error) {
      setTimeout(() => {
        setMessages({ success: "", error: "" });
      }, 3000);
      setMessages({ success: "", error: error.message });
      console.error("Error creating work:", error);
    }
  };

  return (
    <>
      {messages.success && (
        <p className="mt-2 text-green-500">{messages.success}</p>
      )}
      {messages.error && <p className="mt-2 text-red-500">{messages.error}</p>}
      <form
        className="w-full flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex mb-5 flex-wrap w-full justify-center items-center">
          <div className="mr-2 w-full ">
            <SelectBrand
              name="Marca"
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
          </div>
          <div className="mr-2 w-full">
            <SelectModel
              name="Modelo"
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </div>
        </div>
        <div className="flex mb-5 flex-wrap w-full justify-center items-center">
          <InputForm
            name="matricula"
            asterisco="*"
            label="Matricula"
            value={formData.matricula}
            onChange={handleInputChange}
          />
          <InputForm
            name="km"
            label="KM"
            value={formData.km}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex mb-5 flex-wrap w-full justify-center items-center">
          <div className="mr-2 mb-5 w-full">
            <SelectClient
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              name="Cliente"
            />
          </div>
          <InputForm
            name="year"
            label="Año"
            value={formData.year}
            onChange={handleInputChange}
          />
        </div>

        <InputForm
          name="fallo"
          asterisco="*"
          label="Fallo segun reclamacion del cliente"
          value={formData.fallo}
          onChange={handleInputChange}
        />
        <InputForm
          name="repuestos"
          label="Repuestos: nuevo, alternativo, original o suministrado por el cliente"
          value={formData.repuestos}
          onChange={handleInputChange}
        />
        <InputForm
          name="observaciones"
          label="Observaciones"
          value={formData.observaciones}
          onChange={handleInputChange}
        />
        <SelectMechanic
          name="Tecnico"
          selectedMechanic={selectedMechanic}
          setSelectedMechanic={setSelectedMechanic}
        />

        <h2 className="my-3 font-bold text-2xl">Precios</h2>
        <InputForm
          name="Mano de obra"
          type="number"
          value={manoDeObra || ""}
          onChange={handleManoDeObraChange}
        />
        <InputForm
          name="Repuesto"
          type="number"
          value={repuesto || ""}
          onChange={handleRepuestoChange}
        />
        <InputForm name="Total" type="number" value={total || ""} readOnly />

        <button type="submit" className="btn-style">
          Crear Trabajo
        </button>
      </form>
    </>
  );
};

export default FormDetalleTrabajo;
