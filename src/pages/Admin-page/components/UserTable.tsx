import { AllUsers, User } from "../../../interfaces";

interface UserTableProps {
  displayedColumns: string[];
  displayedRows: string[];
  allUsers: AllUsers[];
  editingUser?: User;
  action: boolean;
  errors: {
    name: string;
  };
  handleEdit: (
    event: {
      preventDefault: () => void;
    },
    user: AllUsers
  ) => Promise<void>;
  handleSave: (
    event: {
      preventDefault: () => void;
    },
    user: AllUsers
  ) => Promise<void>;
  handleDelete: (user: AllUsers) => void;
  handleOnChangeEditName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeEditIsActive: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  allUsers,
  action,
  editingUser,
  handleEdit,
  handleSave,
  handleDelete,
  errors,
  handleOnChangeEditName,
  handleOnChangeEditIsActive,
  displayedColumns,
}) => {
  return (
    <table className="table-custome">
      <thead>
        <tr>
          {/* <th>No</th> */}

          <th>UserID</th>
          <th>FUll Name</th>
          {displayedColumns.includes("email") && <th>Email</th>}
          {displayedColumns.includes("phoneNumber") && <th>Phone</th>}
          {displayedColumns.includes("address") && <th>Address</th>}
          {displayedColumns.includes("roleId") && <th>RoleID</th>}
          <th>Password</th>
          <th>Is Active</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => (
          <tr key={user.userId}>
            {/* <td>{index + 1}</td> */}

            <td>
              <span>{user.userId}</span>
            </td>

            <td>
              {action === true && editingUser?.userId === user.userId ? (
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={editingUser?.name}
                    onChange={handleOnChangeEditName}
                  />
                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
              ) : (
                <span>{user.name}</span>
              )}
            </td>

            {displayedColumns.includes("email") && <td>{user.email}</td>}
            {displayedColumns.includes("phoneNumber") && (
              <td>{user.phoneNumber}</td>
            )}
            {displayedColumns.includes("address") && <td>{user.address}</td>}
            {displayedColumns.includes("roleId") && (
              <td>
                <span>{user.roleId}</span>
              </td>
            )}

            <td>
              <span>***</span>
            </td>

            <td>
              {action === true && editingUser?.userId === user.userId ? (
                <div>
                  <input
                    type="checkbox"
                    checked={editingUser.isActive}                
                    onChange={handleOnChangeEditIsActive}
                  />
                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
              ) : (
                <span>{user.isActive.toString()}</span>
              )}
            </td>

            <td>
              {action === false ? (
                <button className="Edit" onClick={(e) => handleEdit(e, user)}>
                  Edit
                </button>
              ) : (
                <button className="Save" onClick={(e) => handleSave(e, user)}>
                  Save
                </button>
              )}
            </td>
            <td>
              <button className="Delete" onClick={() => handleDelete(user)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
