"use client";

import FormMechanics from "@/components/mechanics/FormMechanics";
import ListMechanics from "@/components/mechanics/ListMechanics";
import { useState } from "react";

const MechanicPage = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <section className="flex flex-col h-screen justify-start items-center p-5 bg-white">
      <h1 className="md:text-5xl text-2xl p-5 font-bold">Administrar Mecanicos</h1>
      <FormMechanics triggerRefresh={triggerRefresh} />

      <ListMechanics refresh={refresh} />
    </section>
  );
};

export default MechanicPage;
