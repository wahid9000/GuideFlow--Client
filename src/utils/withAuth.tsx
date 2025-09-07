import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  const AuthWrapper = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data;

    if (!isLoading && !user?.email) {
      return <Navigate to="/login"></Navigate>;
    }

    if (requiredRole && !isLoading && requiredRole !== user?.role) {
      return <Navigate to="/unauthorized"></Navigate>;
    }

    return <Component />;
  };

  return AuthWrapper;
};
