'use client';

import FormUsers from "@/components/users/FormUsers";
import ListUsers from "@/components/users/ListUsers";
import { useState } from "react";

const UserPage = () => {
const [refresh, setRefresh] = useState(false);

const triggerRefresh = () => {
  setRefresh(!refresh);
};

  return (
    <section className="flex flex-col h-screen justify-start items-center p-5 bg-white">
      <h1 className="md:text-5xl text-2xl p-5 font-bold">Administrar Usuarios</h1>
      <FormUsers triggerRefresh={triggerRefresh}/>

      <ListUsers refresh={refresh}/>
    </section>
  );
};

export default UserPage;
