import React from "react";
import { roleOptions } from "../../../interfaces";

interface UserHeadTableProps {
  roleId: number;
  activeTab: string;
  activeOrder: string;
  displayed: string[];
  handleClickView: () => void;
  handleOrderChange: (value: string) => void;
  setRoleId: (value: React.SetStateAction<number>) => void;
}

const UserHeadTable: React.FC<UserHeadTableProps> = ({
  roleId,
  displayed,
  setRoleId,
  activeTab,
  activeOrder,
  handleClickView,
  handleOrderChange,
}) => {
  return (
    <div className="head-table">
      <ul>
        <li
          className={activeTab === "customer" ? "active" : ""}
          onClick={handleClickView}
        >
          View All
        </li>

        <li
          className={activeOrder === "id" ? "active" : ""}
          onClick={() => handleOrderChange("id")}
        >
          Sort by UserId
        </li>

        <li
          className={activeOrder === "name" ? "active" : ""}
          onClick={() => handleOrderChange("name")}
        >
          Sort by Name
        </li>

        {displayed.includes("SortByEmail") && (
          <li
            className={activeOrder === "email" ? "active" : ""}
            onClick={() => handleOrderChange("email")}
          >
            Sort by Email
          </li>
        )}

        {displayed.includes("SortByRole") && (
          <li
            className={activeOrder === "role" ? "active" : ""}
            onClick={() => handleOrderChange("role")}
          >
            Sort by Role
          </li>
        )}

        {displayed.includes("SortByAdress") && (
          <li
            className={activeOrder === "address" ? "active" : ""}
            onClick={() => handleOrderChange("address")}
          >
            Sort by Adress
          </li>
        )}

        {displayed.includes("select-role") && (
          <li className="select-role">
            <select
              defaultValue={roleId}
              onChange={(e) => setRoleId(Number(e.target.value))}
            >
              <option value="">Select Role</option>
              {roleOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.role}
                </option>
              ))}
            </select>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserHeadTable;
