import {
  deleteCustomer,
  searchUser,
} from "../../../apiServices/AdminServices/adminServices";
import { useState, useEffect, swal } from "../../../import/import-another";
import { AllUsers, User } from "../../../interfaces";
import { userUpdate } from "../../../apiServices/UserServices/userServices";
import UserHeadTable from "../components/UseHeadTable";
import HeaderMain from "../components/Header-main";
import UserTable from "../components/UserTable";
import Sidebar from "../components/Sidebar";
import "../Admin.css";

const Customer = () => {
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [action, setAction] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [activeOrder, setActiveOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const [errors, setErrors] = useState({
    name: "",
  });

  //---------------------------------------fetchUsersByFilter-----------------------------

  useEffect(() => {
    const fetchUsersByFilter = async () => {
      const queryParams = new URLSearchParams();

      if (orderBy === "name") {
        queryParams.append("orderBy", "name");
      } else if (orderBy === "email") {
        queryParams.append("orderBy", "email");
      } else if (orderBy === "id") {
        queryParams.append("orderBy", "id");
      } else if (orderBy === "address") {
        queryParams.append("orderBy", "address");
      }

      if (searchQuery) {
        queryParams.append("searchName", searchQuery);
      }

      const response = await searchUser(queryParams);
      setAllUsers(response);
    };
    fetchUsersByFilter();
  }, [orderBy, searchQuery]);

  //---------------------------------------handleSave-----------------------------

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
      isActive: editingUser?.isActive
    };

    console.log(payload);

    try {
      const response = await userUpdate(String(user.userId), payload);

      if (response) {
        swal(
          "Success",
          "User information updated successfully!",
          "success"
        ).then(() => {
          setAction(false);
          window.location.reload();
        });
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

  //---------------------------------------handleEdit-----------------------------

  const handleEdit = async (
    event: { preventDefault: () => void },
    user: AllUsers
  ) => {
    event.preventDefault();
    setEditingUser(user);
    setAction(true);
  };

  //---------------------------------------handleDelete-----------------------------

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
            swal("Success!", "Customer was deleted!", "success").then(() => {
              setAllUsers(
                allUsers.filter((allUser) => allUser.userId !== user.userId)
              );
            });
          } else {
            throw new Error("Failed to  delete customer");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  //---------------------------------------handleEditName-----------------------------

  const handleOnChangeEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            name: e.target.value,
          }
        : undefined
    );
  };


  const handleOnChangeEditIsActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            isActive: e.target.checked,
          }
        : undefined
    );
  };

  //---------------------------------------handleClickView-----------------------------

  const handleClickView = () => {
    setActiveTab("view-customer");
    window.location.reload();
  };

  //---------------------------------------handleOrderChange-----------------------------

  const handleOrderChange = (value: string) => {
    if (value === "name") {
      setOrderBy("name");
      setActiveOrder("name");
    } else if (value === "email") {
      setOrderBy("email");
      setActiveOrder("email");
    } else if (value === "id") {
      setOrderBy("id");
      setActiveOrder("id");
    } else if (value === "address") {
      setOrderBy("address");
      setActiveOrder("address");
    } else {
      setOrderBy("");
      setActiveOrder("");
      setActiveTab("");
    }
  };

  return (
    <>
      <body>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content">
          <HeaderMain
            displayed={["search"]}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <main>
            <div>
              <UserHeadTable
                roleId={0}
                displayed={["SortByEmail", "SortByAdress"]}
                activeTab={activeTab}
                activeOrder={activeOrder}
                handleClickView={handleClickView}
                handleOrderChange={handleOrderChange}
                setRoleId={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />

              <UserTable
                allUsers={allUsers.filter((user) => user.roleId === 1)}
                action={action}
                editingUser={editingUser}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                errors={errors}
                handleOnChangeEditName={handleOnChangeEditName}
                handleOnChangeEditIsActive={handleOnChangeEditIsActive}
                displayedColumns={["email", "phoneNumber", "address"]}
                displayedRows={["email", "phoneNumber", "address"]}
              />
            </div>
          </main>
        </div>
      </body>
    </>
  );
};

export default Customer;
