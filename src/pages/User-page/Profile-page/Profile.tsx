import { Navbar, Footer, BoxMenuUser } from "../../../import/import-components";
import {
  useEffect,
  useState,
  swal,
  useMemo,
} from "../../../import/import-another";
import "./Profile.css";
import { getUserIdFromToken } from "../../../utils/jwtHelper";
import {
  getUserAPI,
  userUpdate,
} from "../../../apiServices/UserServices/userServices";
import { refreshToken } from "../../../apiServices/AccountServices/refreshTokenServices";

export interface IUser {
  userId: number;
  roleId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
}

const Profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({} as IUser);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const userId = useMemo(() => {
    if (!token) {
      swal({
        title: "Oops!",
        text: "You haven't logged in yet! Redirecting to Login Page...",
        icon: "warning",
        buttons: {
          ok: {
            text: "OK",
            value: true,
            className: "swal-ok-button",
          },
        },
      }).then((value) => {
        if (value) {
          window.location.href = "/login";
        }
      });

      return null;
    }
    const userId = getUserIdFromToken(token);
    return userId;
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        throw new Error("User not found");
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
    }
  }, [user]);

  const getUser = async (id: number) => {
    try {
      const response = await getUserAPI(id);
      return response;
    } catch (error) {
      console.error("Error fetching user", error);
      throw error;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //check valid
    const error = {
      name: "",
      phoneNumber: "",
      address: "",
      check: false,
    };
    const name_parttern = /^[^\d!@#$%^&*(),.?":{}|<>]+$/u;

    if (name === "") {
      error.name = "Name is Required!";
      error.check = true;
    } else if (!name_parttern.test(name.trim())) {
      error.name = "The name should not have special characters";
      error.check = true;
    }

    if (phoneNumber === "") {
      error.phoneNumber = "phoneNumber is Required!";
      error.check = true;
    } else if (!(phoneNumber.charAt(0) == "0") || !(phoneNumber.length == 10)) {
      error.phoneNumber = "PhoneNumber is wrong";
      error.check = true;
    }

    if (address === "") {
      error.address = "address is Required!";
      error.check = true;
    } else if (address.length < 3) {
      error.address = "Address must be at least 3 characters";
      error.check = true;
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    const payload = {
      name: name,
      email: user.email,
      phoneNumber: phoneNumber,
      address: address,
    };

    console.log(payload);

    try {
      const response = await userUpdate(userId, payload);

      if (response) {
        const updatedUser = response;
        swal("Success", "User information updated successfully!", "success").then(() => {
          setUser(updatedUser); // Cập nhật state user với dữ liệu mới
          
          window.location.reload();
        });
        refreshToken();
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

  return (
    <>
      <Navbar />
      <div className="container-profile">
        <BoxMenuUser />

        <div className="account active" id="account">
          <div className="main-profile">
            <h1>My profile</h1>
            <p>Manage profile information for account security</p>
            <div></div>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr style={{ background: "white" }}>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>

                  <tr style={{ background: "white" }}>
                    <td>Full name</td>
                    <td>
                      <input
                        type="text"
                        name="txtName"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                      )}
                    </td>
                  </tr>

                  <tr style={{ background: "white" }}>
                    <td>Phone number</td>
                    <td>
                      <input
                        type="number"
                        name="txtPhone"
                        value={phoneNumber || ""}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phoneNumber && (
                        <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                      )}
                    </td>
                  </tr>

                  <tr style={{ background: "white" }}>
                    <td>Address</td>
                    <td>
                      <input
                        type="text"
                        name="txtAddress"
                        value={address || ""}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && (
                        <p style={{ color: "red" }}>{errors.address}</p>
                      )}
                    </td>
                  </tr>

                  <tr style={{ background: "white" }}>
                    <td></td>
                    <td>
                      <input type="submit" name="btAction" value="Save" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
