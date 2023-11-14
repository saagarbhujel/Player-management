import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Unauthorized from "./Unauthorized";

type RequireAuthProps = {
  roles: string[];
};

const RequireAuth = ({ roles }: RequireAuthProps) => {
  const { user } = useAuth();
  const location = useLocation();

  return roles.includes(user?.role) ? (
    <Outlet />
  ) : user?.id ? (
    <Unauthorized />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
