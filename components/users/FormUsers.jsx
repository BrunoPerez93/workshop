"use client";

import { useState } from "react";
import FormFieldsUsers from "./FormFieldsUsers";

const FormUsers = ({ triggerRefresh }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rol: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        username: formData.username,
        password: formData.password,
        rol: formData.rol,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();
      triggerRefresh();
      setFormData({ username: "", password: "", rol: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-center items-center"
    >
      <FormFieldsUsers formData={formData} handleChange={handleChange} />

      <div className=" md:w-1/2 w-full">
        <button type="submit" className="btn-style">
          Agregar Usuario
        </button>
      </div>
    </form>
  );
};

export default FormUsers;
