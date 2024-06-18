import {
  getAllUsers,
  deleteCustomer,
} from "../../apiServices/AdminServices/adminServices";
import { useState, useEffect, swal } from "../../import/import-another";
import { AllUsers, User } from "../../interfaces";
import "./Admin.css";
import { userUpdate } from "../../apiServices/UserServices/userServices";

const Customer = () => {
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [action, setAction] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  // const [name, setName] = useState("");

  const [errors, setErrors] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result2 = await getAllUsers();
      setAllUsers(result2);
    };
    fetchData();
  }, []);
  //----------------------------------------------------------------------------------
  const handleSave = async (
    event: { preventDefault: () => void },
    user: AllUsers
  ) => {
    event.preventDefault();
    //check valid
    const error = {
      name: "",
      check: false,
    };
    const name_parttern = /^[^\d!@#$%^&*(),.?":{}|<>]+$/u;

    if (editingUser?.name === "") {
      error.name = "Name is Required!";
      error.check = true;
    } else if (
      editingUser?.name &&
      !name_parttern.test(editingUser.name.trim())
    ) {
      error.name = "The name should not have special characters";
      error.check = true;
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    const payload = {
      name: editingUser?.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };

    console.log(payload);

    try {
      const response = await userUpdate(String(user.userId), payload);

      if (response) {
        swal("Success", "User information updated successfully!", "success");

        setAction(false);
      } else {
        swal("Error", "Failed to update user information.", "error");
      }
    } catch (error) {
      console.log(error);
      swal(
        "Error",
        "Error occurred during updating user information.",
        "error"
      );
    }
  };

  const handleEdit = async (
    event: { preventDefault: () => void },
    user: AllUsers
  ) => {
    event.preventDefault();
    setEditingUser(user);
    setAction(true);
  };

  //---------------------------------------------------------------------------------------
  const handleDelete = (user: AllUsers) => {
    try {
      swal({
        title: "Are you sure you want to delete this customer?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteCustomer(user.userId);

          if (response) {
            swal("Success!", "Customer was deleted!", "success");
            setAllUsers(
              allUsers.filter((allUser) => allUser.userId !== user.userId)
            );
          } else {
            throw new Error("Failed to  delete customer");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleOnChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            name: e.target.value,
          }
        : undefined
    );
  };

  return (
    <>
      <body>
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2>
              <span className="lab la-accusoft"></span> <span>M&B</span>
            </h2>
          </div>

          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/admin" className="active">
                  <span className="las la-igloo"></span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/customer">
                  <span className="las la-users"></span>
                  <span>Customers</span>
                </a>
              </li>
              <li>
                <a href="/manage-product">
                  <span className="las la-clipboard-list"></span>
                  <span>Products</span>
                </a>
              </li>
              <li>
                <a href="/order">
                  <span className="las la-shopping-bag"></span>
                  <span>Orders</span>
                </a>
              </li>

              <li>
                <a href="/account">
                  <span className="las la-user-circle"></span>
                  <span>Accounts</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="las la-clipboard-list"></span>
                  <span>Tasks</span>
                </a>
              </li>
              <li>
                <a href="/charts">
                  <span className="las la-clipboard-list"></span>
                  <span>Đây nè Vũ chó điên</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <div className="header-main">
            <h2>
              <label htmlFor="nav-toggle">
                <span className="las la-bars"></span>
              </label>
              Dashboard
            </h2>

            <div className="search-wrapper">
              <span className="las la-search"></span>
              <input type="search" placeholder="Search here" />
            </div>

            <div className="user-wrapper">
              <img
                src="/src/assets/anya-cute.jpg"
                width="40px"
                height="40px"
                alt=""
              />
              <div>
                <h4>Datnt nt</h4>
                <small>Super admin</small>
              </div>
            </div>
          </div>

          <main>
            <div>
              <table className="table-custome">
                <thead>
                  <tr>
                    {/* <th>No</th> */}
                    <th>UserID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Password</th>
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
                        {action === true &&
                        editingUser?.userId === user.userId ? (
                          <div>
                            <input
                              type="text"
                              name="fullName"
                              value={editingUser?.name}
                              //
                              onChange={handleOnChangeEdit}
                            />
                            {errors.name && (
                              <p style={{ color: "red" }}>{errors.name}</p>
                            )}
                          </div>
                        ) : (
                          <span>{user.name}</span>
                        )}
                      </td>
                      <td>
                        {/* <input
                          type="email"
                          name="email"
                          value={user.email}
                          readOnly
                        /> */}
                        {user.email}
                      </td>

                      <td>
                        {/* <input
                          type="text"
                          name="phoneNumber"
                          value={user.phoneNumber}
                          readOnly
                        /> */}
                        {user.phoneNumber}
                      </td>

                      <td>
                        {/* <input
                          type="text"
                          name="address"
                          value={user.address}
                          readOnly
                        /> */}
                        {user.address}
                      </td>

                      <td>
                        <span>***</span>
                      </td>

                      <td>
                        {action === false ? (
                          <button
                            className="Edit"
                            onClick={(e) => handleEdit(e, user)}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            className="Save"
                            onClick={(e) => handleSave(e, user)}
                          >
                            Save
                          </button>
                        )}
                      </td>

                      <td>
                        <button
                          className="Delete"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </body>
    </>
  );
};

export default Customer;
