import InputField from "./InputField";
import SelectBrand from "./SelectBrand";
import SelectClient from "./SelectClient";
import SelectMechanic from "./SelectMechanic";
import SelectModel from "./SelectModel";

const FormFields = ({
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  selectedClient,
  setSelectedClient,
  selectedMechanic,
  setSelectedMechanic,
  manoDeObra,
  handleManoDeObraChange,
  repuesto,
  handleRepuestoChange,
  total,
  formData,
  handleInputChange,
}) => {
  return (
    <>
      <div className="flex mb-5 flex-wrap w-full justify-center items-center">
        <div className="mr-2 w-full">
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
        <InputField
          name="matricula"
          asterisco="*"
          label="Matricula"
          value={formData.matricula}
          onChange={handleInputChange}
        />
        <InputField
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
        <InputField
          name="year"
          label="Año"
          value={formData.year}
          onChange={handleInputChange}
        />
      </div>
      <InputField
        name="fallo"
        asterisco="*"
        label="Fallo segun reclamacion del cliente"
        value={formData.fallo}
        onChange={handleInputChange}
      />
      <InputField
        name="repuestos"
        label="Repuestos: nuevo, alternativo, original o suministrado por el cliente"
        value={formData.repuestos}
        onChange={handleInputChange}
      />
      <InputField
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
      <InputField
        name="Mano de obra"
        type="number"
        value={manoDeObra || ""}
        onChange={handleManoDeObraChange}
        label="Mano de obra"
      />
      <InputField
        name="Repuesto"
        type="number"
        value={repuesto || ""}
        onChange={handleRepuestoChange}
        label="Repuesto"
      />
      <InputField
        name="Total"
        type="number"
        value={total || ""}
        readOnly
        label="Total"
      />
    </>
  );
};

export default FormFields;
