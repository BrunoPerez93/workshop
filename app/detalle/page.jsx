import SelectBrand from "@/components/detalle/SelectBrand";
import SelectModel from "@/components/detalle/SelectModel";

const DetalleTrabajo = () => {
  return (
    <section className="flex flex-col justify-start items-center h-screen w-full bg-white p-5">
      <h1 className="m-5 text-5xl font-bold">Detalle de Trabajo</h1>
      <div className="flex mb-5">
        <div className="mr-2">
          <SelectBrand name="Marca" />
        </div>
        <div className="ml-2">
          <SelectModel name="Modelo" />
        </div>
      </div>
    </section>
  );
};

export default DetalleTrabajo;
