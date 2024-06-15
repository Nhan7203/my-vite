import { Navbar, Footer, BoxMenuUser } from "../../../import/import-components";
import { useEffect, useState, swal } from "../../../import/import-another";
import { refreshToken } from "../../../apiServices/AccountServices/refreshTokenServices";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./Profile.css";

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

    return;
  }

  const [user, setUser] = useState({} as IUser);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });
  const decodedToken: any = jwtDecode(token);
  const userIdIdentifier = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userIdIdentifier);
        setUser(userData);
      } catch (error) {
        throw new Error('User not found');
      }
    };

    fetchUser();
  }, [userIdIdentifier]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
    }
  }, [user]);

  const getUser = async (id: any) => {
    try {
      const response = await axios.get(`https://localhost:7030/api/User/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user', error);
      throw error;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //check valid
    const error = {
      name: '',
      phoneNumber: '',
      address: '',
      check: false
    };
    const name_parttern = /^[^\d!@#$%^&*(),.?":{}|<>]+$/u

    if (name === "") {
      error.name = "Name is Required!"
      error.check = true
    } else if (!name_parttern.test(name.trim())) {
      error.name = "The name should not have special characters"
      error.check = true
    }

    if (phoneNumber === "") {
      error.phoneNumber = "phoneNumber is Required!"
      error.check = true
    } else if (!(phoneNumber.charAt(0) == "0") || !(phoneNumber.length == 10)) {
      error.phoneNumber = "PhoneNumber is wrong"
      error.check = true
    }

    if (address === "") {
      error.address = "address is Required!"
      error.check = true
    } else if (address.length < 3) {
      error.address = "Address must be at least 3 characters"
      error.check = true
    }

    setErrors(error)
    if (error.check) {
      return
    }

    const payload = {
      name: name,
      email: user.email,
      phoneNumber: phoneNumber,
      address: address,
    };

    console.log(payload)

    try {
      const response = await fetch(
        `https://localhost:7030/api/User/Update?id=${parseInt(userIdIdentifier)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 200) {
        const updatedUser = await response.json(); // Chuyển đổi response thành JSON
        swal("Success", "User information updated successfully!", "success");
        setUser(updatedUser); // Cập nhật state user với dữ liệu mới
      } else if (response.status === 401) {
        await refreshToken();
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
              <table >
                <tbody >
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
                      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
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
                      {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
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
                      {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
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
