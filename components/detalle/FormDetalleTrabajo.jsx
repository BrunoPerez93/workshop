"use client";

import { useState } from "react";
import SelectBrand from "./SelectBrand";
import SelectModel from "./SelectModel";
import SelectClient from "./SelectClient";
import InputForm from "../InputForm";
import SelectMechanic from "./SelectMechanic";

const FormDetalleTrabajo = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [manoDeObra, setManoDeObra] = useState(0);
  const [repuesto, setRepuesto] = useState(0);
  const [total, setTotal] = useState(0);

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

  return (
    <form className="w-full flex flex-col justify-center items-center">
      <div className="flex mb-5 flex-wrap w-full justify-center items-center">
        <div className="mr-2 w-full ">
          <SelectBrand
            name="Marca"
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </div>
        <div className="mr-2 w-full">
          <SelectModel name="Modelo" selectedBrand={selectedBrand} />
        </div>
      </div>
      <div className="flex mb-5 flex-wrap w-full justify-center items-center">
        <InputForm name="Matricula" asterisco="*" />
        <InputForm name="KM" />
      </div>
      <div className="flex mb-5 flex-wrap w-full justify-center items-center">
        <div className="mr-2 mb-5 w-full">
          <SelectClient
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            name="Cliente"
          />
        </div>
        <InputForm name="Año" />
      </div>

      <InputForm name="Fallo segun reclamacion del cliente" asterisco="*" />
      <InputForm name="Repuestos: nuevo, alternativo, original o suministrado por el cliente" />
      <InputForm name="Observaciones" />
      <SelectMechanic name="Tecnico" />

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
  );
};

export default FormDetalleTrabajo;
