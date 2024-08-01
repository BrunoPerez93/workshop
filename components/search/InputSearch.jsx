import React, { useState } from "react";
import InputForm from "../InputForm";

const InputSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("matricula");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let query = "";
    if (searchTerm) {
      query =
        searchBy === "matricula"
          ? `matricula=${searchTerm}`
          : `clientName=${searchTerm}`;
    }
    fetch(`/api/works?${query}`)
      .then((response) => response.json())
      .then((data) => {
        onSearchResults(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-center items-center"
    >
      <div className="mb-5 flex w-1/2 justify-center items-center">
        <p className="text-xl font-semibold">Buscar:</p>
        <select
          className="ml-5 peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
          value={searchBy}
          onChange={handleSearchByChange}
        >
          <option value="matricula">Matrícula</option>
          <option value="clientName">Nombre del Cliente</option>
        </select>
      </div>
      <div className="w-1/2">
        <InputForm
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          label={searchBy === "matricula" ? "Matrícula" : "Nombre del Cliente"}
        />
        <button type="submit" className="btn-style">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default InputSearch;
