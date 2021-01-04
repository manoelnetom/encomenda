import React, { useContext } from "react";
import { Context } from "../contexts/authContext/AuthContext";

import Layout from "../components/Layout/index";

import AdminRoutes from "./userRoutes/adminRoutes";
import UserRoutes from "./userRoutes/userRoutes";

// Rotas da aplicação estando autenticado!
export default function AppRoutes() {
  const { user, handleLogOut, isAdmin } = useContext(Context);
  const name = user.name !== undefined ? user.name.slice() : "";
  const userName =
    name !== "" ? name.split(" ").map((item) => item.toLowerCase()) : "";

  return (
    <Layout
      logout={handleLogOut}
      username={userName[0]}
      admin={isAdmin}
      photo_url={user.photo_url}
      name={name}
      perfil={user.user_type.description}
      email={user.email}
      scope={user.scopes[0].name}
    >
      {isAdmin ? <AdminRoutes /> : <UserRoutes />}
    </Layout>
  );
}
