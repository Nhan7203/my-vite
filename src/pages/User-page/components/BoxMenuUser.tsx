import vu from "../../../assets/vu.jpg";
import box from "../../../assets/box.png";
import adress from "../../../assets/adress.png";
import voucher from "../../../assets/voucher.png";
import { Link } from "../../../import/import-libary";
import comment from "../../../assets/comment.png";
import blog from "../../../assets/blogging.png";
import watched from "../../../assets/watched.png";
import "../User.css";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
const BoxMenuUser = () => {


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


  const userName =
    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  
  const userToken = {
    Name: userName,
  };
  return (
    <div className="box-menu-user">
      <div className="box-profile-avatar">
        <div className="avatar-img">
          <img src={vu} alt="" />
        </div>
        <div className="onlick-profile">
          <h5>{userToken.Name}</h5>
          <p>
            <Link to="/profile">Profile user</Link>
          </p>
        </div>
      </div>
      <div className="box-oder-adress-voucher">
        <div className="purchased-order">
          <img src={box} alt="" />
          <p>Purchase order</p>
        </div>
        <div className="my-adress">
          <img src={adress} alt="" />
          <p>Address</p>
        </div>
        <div className="my-voucher">
          <img src={voucher} alt="" />
          <p>My Voucher</p>
        </div>
      </div>

      <div className="box-oder-adress-voucher">
        <div className="purchased-order">
          <img src={comment} alt="" />
          <p>My review</p>
        </div>
        <div className="my-adress">
          <img src={blog} alt="" />
          <p>blog viewed</p>
        </div>
        <div className="my-voucher">
          <img src={watched} alt="" />
          <p>Viewed products</p>
        </div>
      </div>
    </div>
  );
};

export default BoxMenuUser;
