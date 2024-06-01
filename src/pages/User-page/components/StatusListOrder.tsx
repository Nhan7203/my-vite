import { Link } from "../../../import/import-libary";
const StatusListOrder = () => {
  return (
    <div className="status-list-order">
      <div>
        <Link to="/user">All</Link>
      </div>
      <div>
        <Link to="/complete">Processing</Link>
      </div>
      <div>
        <Link to="/complete">Processed</Link>
      </div>
      <div>
        <Link to="/complete">Completed</Link>
      </div>
      <div>
        <Link to="/cancelled">Cancelled</Link>
      </div>
      <div>
        <Link to="/giveback">Give back</Link>
      </div>
    </div>
  );
};

export default StatusListOrder;
