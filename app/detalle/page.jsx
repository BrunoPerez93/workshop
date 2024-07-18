"use client";

import { useState } from "react";
import SelectBrand from "@/components/detalle/SelectBrand";
import SelectModel from "@/components/detalle/SelectModel";

const DetalleTrabajo = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  return (
    <section className="flex flex-col justify-start items-center h-screen w-full bg-white p-5">
      <h1 className="m-5 text-5xl font-bold">Detalle de Trabajo</h1>
      <div className="flex mb-5">
        <div className="mr-2">
          <SelectBrand
            name="Marca"
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </div>
        <div className="ml-2">
          <SelectModel name="Modelo" selectedBrand={selectedBrand} />
        </div>
      </div>
    </section>
  );
};

export default DetalleTrabajo;
