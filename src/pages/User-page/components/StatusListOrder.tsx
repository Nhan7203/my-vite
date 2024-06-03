import {  Link} from "react-router-dom";
import "../User.css"
const StatusListOrder = () => {
  return (
    <div className="status-list-order">
    {[
      { to: '/user', label: 'All' },
      { to: '/processing', label: 'Processing' },
      { to: '/processed', label: 'Processed' },
      { to: '/complete', label: 'Completed' },
      { to: '/cancelled', label: 'Cancelled' },
      { to: '/giveback', label: 'Give back' },
    ].map((link) => (
      <div key={link.to}>
        <Link
          to={link.to}
          style={{
            color: location.pathname === link.to ? '#ff469e' : 'black',
            fontWeight: location.pathname === link.to ? 'bold' : 'normal',
          }}
        >
          {link.label}
        </Link>
      </div>
    ))}
  </div>
  );
};

export default StatusListOrder;
