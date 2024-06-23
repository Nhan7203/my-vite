import { useEffect, useState } from "../../../import/import-another";
import { getNameFromToken, getRoleFromToken } from "../../../utils/jwtHelper";
import { avatar } from "../../../import/import-assets";

interface HeaderMainProps {
  searchQuery: string;
  displayed: string[];
  setSearchQuery: (value: React.SetStateAction<string>) => void;
}

const HeaderMain: React.FC<HeaderMainProps> = ({
  displayed,
  searchQuery,
  setSearchQuery,
}) => {
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    if (!token) {
      return;
    }
    const roleIdentifier = getRoleFromToken(token);
    setRole(roleIdentifier)
    const usernameIdentifier = getNameFromToken(token);
    setUserName(usernameIdentifier);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="header-main">
      <h2>
        <label htmlFor="nav-toggle">
          <span className="las la-bars"></span>
        </label>
        Dashboard
      </h2>
      {displayed.includes("search") && (
        <div className="search-wrapper">
          <span className="las la-search"></span>
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="user-wrapper">
        <div className="avatar-admin">
          <img src={avatar} width="40px" height="40px" alt="" />
          <div className="name-role">
            <p>{userName}</p>
            <small>{(role)}</small>
          </div>
        </div>

        <div className="menu-box">
          {/* <a href="/">View Home</a> */}
          <a href="/login" onClick={handleLogout} style={{ border: "none" }}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
