import { getRoleFromToken } from "../../utils/jwtHelper";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { loginApi } from '../../apiServices/AccountServices/loginServices';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import swal from 'sweetalert';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!captchaValue) {
      toast.error("Please complete the captcha.");
      return;
    }

    if (!email || !password) {
      toast.error("Missing Email or Password");
      return;
    }

    try {
      const response = await loginApi(email, password);

      if (response) {
        // Login successful
        //Lay-Luu token vao local storage
        const { token, refreshToken} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        const role = getRoleFromToken(token);

        if (role === "User") {
          alert("Oke bạn nay User ne");
          //Redirect to 'User' page
          navigate("/");
        }
        else if (role === "Staff") {
          alert("Oke bạn nay Staff ne");
          navigate("/admin");

        } else if (role === "Admin") {

          alert("Oke bạn nay Admin ne");
          navigate("/admin");
        }
      } else {
        // Login failed
        console.error("Login failed");
        swal({
          title: "Incorrect Account or Password ",
          text: "Please click 'Forgot password?' to reset your password or 'Register' to create a new account.",
          icon: "error",
          buttons: {
            ok: {
              text: "OK",
              value: true,
              className: "swal-ok-button",
            },
            forgot: {
              text: "Forgot?",
              value: "forgot",
              className: "swal-forgot-button",
            },
            register: {
              text: "Register",
              value: "register",
              className: "swal-register-button",
            },
          },
        }).then((value) => {
          if (value === "forgot") {
            // Redirect the user to the password reset page
            window.location.href = "/forgetpassword";
          } else if (value === "register") {
            // Redirect the user to the registration page
            window.location.href = "/register";
          }
        });
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("An error occurred:", error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleOnClick = () => {
    location.href = "/";
  };

  return (
    <>
      <body>
        <header>

          <div >

            <div className="logo-mandb" onClick={() => handleOnClick()}>
              <h3>M</h3>
              <h3 id="and">&</h3>
              <h3>B.COM</h3>
            </div>

            <div className="line"></div>
            <h3 className="text-login">Login</h3>
          </div>
        </header>

        <div className="head-content">
          <img src="/src/assets/anya.png" alt="" />
          <div className="content">
            <form className="form-login" onSubmit={handleLogin}>
              <h3 className="text-welcome">Welcome</h3>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="Recapcha">
                <ReCAPTCHA sitekey="6LeOW-gpAAAAAIjpbDvMlkseUc96hpxAWvxDofYQ"
                  onChange={(val) => setCaptchaValue(val)} />
              </div>
              <a href="/forgetpassword">Forgot password?</a>
              <input
                className="button-login"
                type="submit"
                name="btAction"
                value="Login"
              />

              <p>Don't have an account? <a href="/register">Register</a></p>
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

export default Login;
