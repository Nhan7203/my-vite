import { useEffect, swal } from "../import/import-another";
import { useNavigate } from "react-router-dom";
import { getRoleFromToken } from "./jwtHelper";
  
  const ProtectedRoute = ({
    children,
    allowedRoles = ['Admin', 'Staff', 'User'],
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
      if (!allowedRoles.includes(roleIdentifier) ) {
        swal({
          title: "Oops!",
          text: "You don't have access to this page!",
          icon: "warning",
          buttons: {
            ok: {
              text: "OK",
              value: true,
              className: "swal-ok-button",
            },
          },
        }).then((value) => {
          if (value) {
            navigate(-1);
          }
        });
      }
    }, [navigate, allowedRoles]);
  
    return children;
  };
  
  export default ProtectedRoute;
