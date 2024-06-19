import { useMemo } from "react";
import { avatar } from "../../../import/import-assets";
import { getNameFromToken } from "../../../utils/jwtHelper";

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

  const userName = useMemo(() => {
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const usernameIdentifier = getNameFromToken(token);

    return usernameIdentifier;
  }, [token]);

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
        <img src={avatar} width="40px" height="40px" alt="" />
        <div>
          <h4>{userName}</h4>
          <small>Super admin</small>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
