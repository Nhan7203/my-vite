
import './Login.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { loginApi } from './LoginServices';
import { toast } from 'react-toastify';
// import jwt, { JwtPayload } from 'jsonwebtoken';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Missing Email or Password");
      return;
    }

    try {
      const response = await loginApi(email, password);

      if (response.status === 200) {
        // Login successful
        //Lay-Luu token vao local storage
        const { token, user } = response.data;
        localStorage.setItem('token', token);

        // const decodedToken = jwt.decode(token) as JwtPayload;

        if (user.roleId === 1) {
          alert("Oke thg lon nay User ne");
          //Redirect to 'User' page
        }
        else if (user.roleId === 2) {
          alert("Oke thg lon nay Staff ne");
          // Redirect to 'Staff' page

        } else if (user.roleId === 3) {
          alert("Oke thg lon nay Admin ne");
          // Redirect to 'Admin' page

        }
      } else {
        // Login failed
        console.error('Login failed');
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('An error occurred:', error);
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

  }



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
                <input type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required />
              </div>

              <div>
                <label>Password</label>
                <input type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required />

              </div>
              <a href="">Forgot password?</a>
              <input
                className="button-login"
                type="submit"
                name="btAction"
                value="Login"
              />
              <p>
                You don’t have account ?{/* <a href="./Regi">Register</a> */}
                <Link to="/register">Register</Link>
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

export default Login;
