import { useState } from "react";
import FormFields from "./FormFields";
import { useRouter } from "next/navigation";

const FormDetalleTrabajo = () => {
  const router = useRouter();

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
      router.push(`/search`);
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
        <FormFields
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          selectedMechanic={selectedMechanic}
          setSelectedMechanic={setSelectedMechanic}
          manoDeObra={manoDeObra}
          handleManoDeObraChange={handleManoDeObraChange}
          repuesto={repuesto}
          handleRepuestoChange={handleRepuestoChange}
          total={total}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <button type="submit" className="btn-style">
          Crear Trabajo
        </button>
      </form>
    </>
  );
};

export default FormDetalleTrabajo;
