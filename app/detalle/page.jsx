"use client";

import FormDetalleTrabajo from "@/components/detalle/FormDetalleTrabajo";

const DetalleTrabajo = () => {
  return (
    <section className="flex flex-col justify-start items-center h-full w-full bg-white p-5">
      <h1 className="m-5 md:text-5xl font-bold text-2xl">Detalle de Trabajo</h1>

      <FormDetalleTrabajo />
    </section>
  );
};

export default DetalleTrabajo;
