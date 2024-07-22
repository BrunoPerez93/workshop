"use client";

import FormDetalleTrabajo from "@/components/detalle/FormDetalleTrabajo";

const DetalleTrabajo = () => {
  return (
    <section className="flex flex-col justify-start items-center h-screen w-full bg-white p-5">
      <h1 className="m-5 text-5xl font-bold">Detalle de Trabajo</h1>

      <FormDetalleTrabajo />
    </section>
  );
};

export default DetalleTrabajo;
