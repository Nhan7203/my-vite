import { Link } from "react-router-dom";


const StatusListOrder = () => {
  return (
    <div className="status-list-order">

    {[
      { to: '/user', label: 'All' },
      { to: '/processing', label: 'Processing' },
      { to: '/processed', label: 'Processed' },
      { to: '/complete', label: 'Completed' },
      { to: '/cancelled', label: 'Cancelled' },
      { to: '/preorder', label: 'Pre-Order' },
    ].map((link) => (
      <div key={link.to} >
        <Link
          to={link.to}
          style={{
            color: location.pathname === link.to ? '#ff469e' : 'black',
            fontWeight: location.pathname === link.to ? 'bold' : 'normal',
            // borderBottom: location.pathname === link.to ? '3px solid #b3b3b3' : 'normal',
            borderRadius: location.pathname === link.to ? '5px' : 'normal',
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
