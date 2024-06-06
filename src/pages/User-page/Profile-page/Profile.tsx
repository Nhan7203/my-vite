import { Navbar, Footer } from "../../../import/import-router";
import { refreshToken } from "../../../apiServices/refreshTokenServices";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import swal from "sweetalert";
import "./Profile.css";
import BoxMenuUser from "../components/BoxMenuUser";
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

  const decodedToken: any = jwtDecode(token);

  const userIdIdentifier =
    decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  const userName =
    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const userMail =
    decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];
  const phone =
    decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
    ];
  const userAddress =
    decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/streetaddress"
    ];
  const role =
    decodedToken[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  const [name, setName] = useState(userName);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [address, setAddress] = useState(userAddress);
  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  })
  const userToken = {
    UserId: userIdIdentifier,
    Name: userName,
    Email: userMail,
    PhoneNumber: phone,
    Role: role,
    Address: userAddress,
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //check valid
    let error = {
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
      email: userMail,
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
        swal("Success", "User information updated successfully!", "success");
        // window.location.reload();
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
                    <td>{userToken.Email}</td>
                  </tr>

                  <tr style={{ background: "white" }}>
                    <td>Full name</td>
                    <td>
                      <input
                        type="text"
                        name="txtName"
                        value={name}
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
                        value={phoneNumber}
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
                        value={address}
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
