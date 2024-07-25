import { useEffect, memo, useState } from "react";

const SelectMechanic = ({ name, selectedMechanic, setSelectedMechanic }) => {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await fetch("/api/mechanic");
        const data = await response.json();
        if (Array.isArray(data)) {
          setMechanics(data);
        } else {
          console.error("Data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching mechanics", error);
      }
    };
    fetchMechanics();
  }, []);

  return (
    <div className="relative w-full h-10 mr-5">
      <select
        value={selectedMechanic}
        onChange={(e) => setSelectedMechanic(e.target.value)}
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      >
        <option value="" disabled>
          Seleccione un técnico...
        </option>
        {mechanics.map((mechanic) => (
          <option key={mechanic._id} value={mechanic._id}>
            {mechanic.username}
          </option>
        ))}
      </select>
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] peer-focus:text-gray-900 peer-focus:before:border-gray-900 peer-focus:after:border-gray-900">
        {name}
      </label>
    </div>
  );
};

export default SelectMechanic;