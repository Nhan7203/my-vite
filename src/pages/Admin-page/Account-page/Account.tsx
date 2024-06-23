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

const Account = () => {
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [action, setAction] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleId, setRoleId] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("");
  const [activeOrder, setActiveOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [errors, setErrors] = useState({
    name: "",
  });

//--------------------------------------------------------------------=

  useEffect(() => {
    const fetchProductsByFilter = async () => {
      const queryParams = new URLSearchParams();

      if (roleId !== 0) {
        queryParams.append("roleId", roleId.toString());
      }

      if (orderBy === "name") {
        queryParams.append("orderBy", "name");
      } else if (orderBy === "role") {
        queryParams.append("orderBy", "role");
      } else if (orderBy === "id") {
        queryParams.append("orderBy", "id");
      }

      if (searchQuery) {
        queryParams.append("searchName", searchQuery);
      }

      const response = await searchUser(queryParams);
      setAllUsers(response);
    };
    fetchProductsByFilter();
  }, [orderBy, roleId, searchQuery]);

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
        swal(
          "Success",
          "Account information updated successfully!",
          "success"
        ).then(() => {
          setAction(false);
          window.location.reload();
        });
      } else {
        swal("Error", "Failed to update account information.", "error");
      }
    } catch (error) {
      console.log(error);
      swal(
        "Error",
        "Error occurred during updating account information.",
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
        title: "Are you sure you want to delete this account?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteCustomer(user.userId);

          if (response) {
            swal("Success!", "Account was deleted!", "success");
            setAllUsers(
              allUsers.filter((allUser) => allUser.userId !== user.userId)
            );
          } else {
            throw new Error("Failed to  delete account");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

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

  const handleClickView = () => {
    setActiveTab("view-account");
    window.location.reload();
  };

  const handleOrderChange = (value: string) => {
    if (value === "name") {
      setOrderBy("name");
      setActiveOrder("name");
    } else if (value === "role") {
      setOrderBy("role");
      setActiveOrder("role");
    } else if (value === "id") {
      setOrderBy("id");
      setActiveOrder("id");
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
                roleId={roleId}
                activeTab={activeTab}
                activeOrder={activeOrder}
                displayed={["SortByRole", "select-role"]}
                setRoleId={setRoleId}
                handleClickView={handleClickView}
                handleOrderChange={handleOrderChange}
              />

              <UserTable
                action={action}
                errors={errors}
                allUsers={allUsers}
                editingUser={editingUser}
                displayedRows={["roleId"]}
                displayedColumns={["roleId"]}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleOnChangeEdit={handleOnChangeEditName}
              />
            </div>
          </main>
        </div>
      </body>
    </>
  );
};

export default Account;
