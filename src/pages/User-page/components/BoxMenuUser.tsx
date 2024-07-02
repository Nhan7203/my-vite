import { avatar, box, adress, voucher, comment, iblog, watched } from "../../../import/import-assets";
import { getNameFromToken } from "../../../utils/jwtHelper";
import { useMemo, swal2 } from "../../../import/import-another";
import { Link } from "../../../import/import-libary";

const BoxMenuUser = () => {
  const token = localStorage.getItem("token");

//---------------- Get User Name ------------------------------------------------

  const userName = useMemo(() => {
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const usernameIdentifier = getNameFromToken(token);

    return usernameIdentifier;
  }, [token]);

//---------------- Handle Click Unavailable Feature ------------------------------

  const handleClickUnavailableFeature = () => {
    swal2.fire({
      icon: "info",
      title: "Feature Unavailable",
      text: "This feature is currently being updated. Please check back later!",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="box-menu-user">
      <div className="box-profile-avatar">
        <div className="avatar-img">
          <img src={avatar} alt="" />
        </div>
        <div className="onlick-profile">
          <h5>{userName}</h5>
          <Link to="/profile" className="profile-user">
            <p>
              Profile user {`>>`}
            </p>
          </Link>
        </div>
      </div>
      <div className="box-oder-adress-voucher">
        <Link to="/user" className="purchased-order">
          <img src={box} alt="" />
          <p>Purchase order</p>
        </Link>
        <div className="my-adress" onClick={handleClickUnavailableFeature}>
          <img src={adress} alt="" />
          <p>Address</p>
        </div>
        <div className="my-voucher" onClick={handleClickUnavailableFeature}>
          <img src={voucher} alt="" />
          <p>My Voucher</p>
        </div>
      </div>

      <div className="box-oder-adress-voucher">
        <div
          className="purchased-order"
          onClick={handleClickUnavailableFeature}
        >
          <img src={comment} alt="" />
          <p>My review</p>
        </div>
        <div className="my-adress" onClick={handleClickUnavailableFeature}>
          <img src={iblog} alt="" />
          <p>blog viewed</p>
        </div>
        <div className="my-voucher" onClick={handleClickUnavailableFeature}>
          <img src={watched} alt="" />
          <p>Viewed products</p>
        </div>
      </div>
    </div>
  );
};

export default BoxMenuUser;
