import { useAuth } from "@/context/auth.context";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { Loader2 } from "lucide-react";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  const AuthWrapper = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && requiredRole !== user?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };

  return AuthWrapper;
};
