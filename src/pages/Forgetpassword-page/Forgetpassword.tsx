/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from "emailjs-com";
import "./Forgetpassword.css";
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkMailExist } from "../../apiServices/AccountServices/accountServices";

const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleBtContinue = async (e: any) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Missing Email");
      return;
    }

    try {
      const emailExists = await checkMailExist(email);

      swal({
        title: "Email Sent!",
        text: "We have sent you an Email if this Email was linked with your account!",
        icon: "success",
        buttons: {
          ok: {
            text: "OK",
            value: true,
            className: "swal-ok-button",
          },
        },
      }).then(async (value) => {
        if (value) {
          const code = Math.floor(10000000 + Math.random() * 90000000);

          if (emailExists) {
            const templateParams = {
              from_name: "MnB Shop <no-reply@mnbshop.com>",
              to_email: email,
              subject: "Reset Password",
              code: code,
            };

            await emailjs.send(
              "service_4j0f6f9", // Replace with your EmailJS service ID
              "template_pyes21y", // Replace with your EmailJS template ID
              templateParams,
              "Fm8U5RN0vDmjsIl4S" // Replace with your EmailJS user ID
            );
          }

          localStorage.setItem("hasAccessedForgetPassword", "true");
          navigate("/securitycode", { state: { email, code } });
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Some request failed");
    }
  };

  const handleBtCancel = () => {
    location.href = "/login";
  };

  const handleOnClick = () => {
    location.href = "/";
  };

  return (
    <>
      <body>
        <header>
          <div>
            <div className="logo-mandb" onClick={() => handleOnClick()}>
              <h3>M</h3>
              <h3 id="and">&</h3>
              <h3>B.COM</h3>
            </div>

            <div className="line"></div>
            <h3 className="text-forget-password">Forget Password</h3>
          </div>
        </header>

        <div className="head-content">
          <img src="/src/assets/anya.png" alt="" />
          <div className="content">
            <form className="form-forget">
              <h3 className="title-form-forget">Forget Password</h3>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/*<p className="text-msg">Email is invalid</p>*/}
              </div>

              <div className="two-button">
                <input
                  className="button-continue"
                  type="submit"
                  name="btAction"
                  value="Continue"
                  onClick={(e) => handleBtContinue(e)}
                />

                <input
                  className="button-cancel"
                  type="submit"
                  name="btAction"
                  value="Cancel"
                  onClick={() => handleBtCancel()}
                />
              </div>

              <p>
                Don't have an account? <a href="/register">Register</a>
              </p>
            </form>
          </div>
        </div>

        <div className="footer-login">
          <div>
            <h2></h2>
            <div>
              <ul>
                <h3>Reach us</h3>
                <li>
                  <img src="/src/assets/phone.svg" alt="" />
                  <span>+843899999999</span>
                </li>
                <li>
                  <img src="/src/assets/email.svg" alt="" />
                  <span>m&b@gmail.com</span>
                </li>
                <li>
                  <img src="/src/assets/location.svg" alt="" />
                  <span>Long Thanh My, Thu Duc, Ho Chi Minh, Viet Nam</span>
                </li>
              </ul>
              <ul>
                <h3>Company</h3>
                <li>About</li>
                <li>Contact us</li>
              </ul>
              <ul>
                <h3>Legal</h3>
                <li>Privacy Policy</li>
                <li>Terms & Services</li>
                <li>Terms Of Use</li>
              </ul>
              <ul>
                <h3>Useful links</h3>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <img src="/src/assets/face.svg" alt="" />
              <img src="/src/assets/insta.svg" alt="" />
              <img src="/src/assets/twitter.svg" alt="" />
            </div>
            <div className="line-end"></div>
            <h5>Copyright&copy : m&b@gmail.com</h5>
          </div>
        </div>
      </body>
    </>
  );
};

export default Forgetpassword;
