import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import UserService from "../../Services/UserService";
import useToast from "../../hooks/toast";
import { Role } from "../../types/Role";

/**
 * ProtectedRoute: Componente para proteger rotas.
 * @param {JSX.Element} children - Componente a ser renderizado.
 * @param {string[]} [roles] - Roles permitidas para acessar a rota.
 */
const ProtectedRoute = ({
  children,
  roles = [],
}: {
  children: JSX.Element;
  roles?: Role[];
}) => {
  const user = UserService.getCurrentUser();
  const showToast = useToast();

  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user?.role as Role)) {
    showToast("Você não tem permissão para acessar essa página.", "error");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
