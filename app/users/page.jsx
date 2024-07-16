import FormUsers from "@/components/users/FormUsers";
import UserList from "@/components/users/UserList";

const UserPage = () => {
  return (
    <section className="flex flex-col h-screen justify-center items-center p-5 bg-white">
      <h1 className="text-5xl p-5 font-bold">Administrar Usuarios</h1>
      <FormUsers />

      {/* <UserList /> */}
    </section>
  );
};

export default UserPage;
