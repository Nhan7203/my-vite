import vu from "../../assets/vu.jpg";
import box from "../../assets/box.png";
import adress from "../../assets/adress.png";
import voucher from "../../assets/voucher.png";
import { Link } from "../../import/import-libary";
import comment from "../../assets/comment.png";
import blog from "../../assets/blogging.png";
import watched from "../../assets/watched.png";
import "./User.css";

const BoxMenuUser = () => {
  return (
    <div className="box-menu-user">
      <div className="box-profile-avatar">
        <div className="avatar-img">
          <img src={vu} alt="" />
        </div>
        <div className="onlick-profile">
          <h5>Thanh Vu</h5>
          <p><Link to="/profile">Profile user</Link></p>
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
