import { useEffect } from "../import/import-another";
import { useNavigate } from "react-router-dom";
import { getRoleFromToken } from "./jwtHelper";

const ProtectedRoute = ({
  children,
  allowedRoles = ["Admin", "Staff", "User"],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const roleIdentifier = getRoleFromToken(token);
    if (!allowedRoles.includes(roleIdentifier)) {
      navigate("/unauthorized");
    }
  }, [navigate, allowedRoles]);

  return children;
};

export default ProtectedRoute;
