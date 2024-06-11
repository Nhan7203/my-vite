import { getTotalUser, getAllUsers } from "../../apiServices/AdminServices/adminServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AllUsers } from "../../interfaces";
import "./Admin.css";

const Customer = () => {

  // console.log('check empty: ', isEmptyObj);
  const handleDelete = (user: AllUsers) => {
    console.log('check user ', user);
    let currentUser = allUsers;
    currentUser = allUsers.filter(users => users.userId !== user.userId);
    setAllUsers(currentUser);
    toast.success(`Delete Success!`, {
      position: "top-left",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  }
  const [totalUser, setTotalUser] = useState<number>();
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [editUser, seteditUser] = useState<AllUsers | undefined>();
  const handleEdit = (user: AllUsers) => {
    let isEmptyObj = !editUser || Object.keys(editUser).length === 0;


    //save
    if (isEmptyObj === false && editUser?.userId === user.userId) {
      let allUsersCopy = [...allUsers];
      let objIndex = allUsersCopy.findIndex((item => item.userId === user.userId));
      allUsersCopy[objIndex].name = editUser.name;
      allUsersCopy[objIndex].email = editUser.email;
      setAllUsers(allUsersCopy);
      seteditUser(undefined);

      toast.success(`Update Success!`, {
        position: "top-left",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return;
    }
    seteditUser(user);

  }

  let isEmptyObj = !editUser || Object.keys(editUser).length === 0;
  console.log('check empty: ', isEmptyObj);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalUser();
      setTotalUser(result);
      const result2 = await getAllUsers();
      setAllUsers(result2);

    };
    fetchData();
  }, []);

  const handleOnChangeEditName = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!editUser) return;
    const editUserCopy = { ...editUser };
    editUserCopy.name = e.target.value;
    seteditUser(editUserCopy);
  }

  const handleOnChangeEditEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!editUser) return;
    const editUserCopy = { ...editUser };
    editUserCopy.email = e.target.value;
    seteditUser(editUserCopy);
  }

  return (
    <>
      <body>

        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2><span className="lab la-accusoft"></span> <span>M&B</span>
            </h2>
          </div>

          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/admin" className="active"><span className="las la-igloo"></span>
                  <span>Dashboard</span></a>
              </li>
              <li>
                <a href="/customer"><span className="las la-users"></span>
                  <span>Customers</span></a>
              </li>
              <li>
                <a href="/manage-product"><span className="las la-clipboard-list"></span>
                  <span>Products</span></a>
              </li>
              <li>
                <a href="/order"><span className="las la-shopping-bag"></span>
                  <span>Orders</span></a>
              </li>

              <li>
                <a href="/account"><span className="las la-user-circle"></span>
                  <span>Accounts</span></a>
              </li>
              <li>
                <a href=""><span className="las la-clipboard-list"></span>
                  <span>Tasks</span></a>
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
              <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
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
                    <th>No</th>
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

                  {allUsers.map((user, index) => (

                    <tr key={user.userId}>
                      <td>{index + 1}</td>
                      <td>
                        <span>{user.userId}</span>
                      </td>
                      <td>

                        {isEmptyObj === true ?
                          <span>{user.name}</span>
                          :
                          <>
                            {editUser?.userId === user.userId ?
                              <input type="text" name="fullName" value={editUser.name}
                                onChange={handleOnChangeEditName}
                              />
                              :
                              <span>{user.name}</span>
                            }
                          </>
                        }

                      </td>
                      <td>

                        {isEmptyObj === true ?
                          <span>{user.email}</span> :

                          <>
                            {editUser?.userId === user.userId ?
                              <input type="email" name="email" value={editUser.email}
                                required
                                onChange={handleOnChangeEditEmail}
                              />
                              :
                              <span>{user.email}</span>
                            }
                          </>

                        }

                      </td>

                      <td>

                        {isEmptyObj === true ?
                          <span>{user.phoneNumber}</span> :

                          <>
                            {editUser?.userId === user.userId ?
                              <input type="text" name="phoneNumber" value={editUser.phoneNumber} />
                              :
                              <span>{user.phoneNumber}</span>
                            }
                          </>

                        }

                      </td>

                      <td>

                        {isEmptyObj === true ?
                          <span>{user.address}</span> :

                          <>
                            {editUser?.userId === user.userId ?
                              <input type="text" name="address" value={editUser.address} />
                              :
                              <span>{user.address}</span>
                            }
                          </>

                        }

                      </td>

                      <td>
                        <span>{user.password}</span>
                      </td>




                      <td>
                        <button className="Edit"
                          onClick={() => handleEdit(user)}


                        >
                          {isEmptyObj === false && editUser?.phoneNumber === user.phoneNumber
                            ? 'Save' : 'Edit'
                          }
                        </button>
                      </td>

                      <td>
                        <button className="Delete"
                          onClick={() => handleDelete(user)}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}



                </tbody>

              </table>
            </div>

          </main>
        </div >

      </body >




    </>
  )
}

export default Customer