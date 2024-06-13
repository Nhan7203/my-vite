import {
  avatar,
  box,
  adress,
  voucher,
  comment,
  iblog,
  watched,
} from "../../../import/import-assets";
import { getNameFromToken } from "../../../utils/jwtHelper";
import { useMemo } from "../../../import/import-another";
import { Link } from "../../../import/import-libary";
import "../User.css";

const BoxMenuUser = () => {
  const token = localStorage.getItem("token");

  const userName = useMemo(() => {
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const usernameIdentifier = getNameFromToken(token);

    return usernameIdentifier;
  }, [token]);

  return (
    <div className="box-menu-user">
      <div className="box-profile-avatar">
        <div className="avatar-img">
          <img src={avatar} alt="" />
        </div>
        <div className="onlick-profile">
          <h5>{userName}</h5>
          <p>
            <Link to="/profile">Profile user</Link>
          </p>
        </div>
      </div>
      <div className="box-oder-adress-voucher">
        <Link to="/user" className="purchased-order">
          <img src={box} alt="" />
          <p>Purchase order</p>
        </Link>
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
          <img src={iblog} alt="" />
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
