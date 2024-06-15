import { useLocation } from "react-router-dom";

const StatusListOrder = () => {
  const location = useLocation();

  return (
    <div className="head-table">
      <ul>
        {[
          { to: "/Order", label: "All" },
          { to: "/processing-staff", label: "Processing" },
          { to: "/processed-staff", label: "Processed" },
          { to: "/complete-staff", label: "Completed" },
          { to: "/cancelled-staff", label: "Cancelled" },
          { to: "/preorder-staff", label: "Pre-Order" },
        ].map((link) => (
          <li
            key={link.to}
            style={{
              color: location.pathname === link.to ? "#ff469e" : "black",
              fontWeight: location.pathname === link.to ? "bold" : "normal",
              borderRadius: location.pathname === link.to ? "5px" : "normal",
              cursor: "pointer",
            }}
            onClick={() => window.location.href = link.to}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusListOrder;
