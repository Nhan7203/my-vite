import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { swal } from "../../import/import-another";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    swal({
      title: "Oops!",
      text: "You don't have access to this page!",
      icon: "warning",
      buttons: {
        ok: {
          text: "OK",
          value: true,
          className: "swal-ok-button",
        },
      },
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then(() => {
        navigate(-3); // Navigate back to the previous page
    });
  }, [navigate]);

  return <></>;
};

export default Unauthorized;
