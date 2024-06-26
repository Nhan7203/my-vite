import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import swal from 'sweetalert';
import { changePassword } from '../../apiServices/AccountServices/accountServices';

const ChangePassword = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);


    const handleOnClick = () => {
        navigate("/");
    };

    const handleOnContinue = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      
        if (newPassword !== confirmPassword) {
          setPasswordMismatch(true);
          return;
        }
      
        try {

          const response = await changePassword(email, newPassword)
      
          if (response) {
            swal({
              title: "Password Reset!",
              text: "Your password has been reset! Please login again!",
              icon: "success",
              buttons: {
                ok: {
                  text: "OK",
                  value: true,
                  className: "swal-ok-button",
                },
              },
            }).then((value) => {
              if (value) {
                navigate("/login");
              }
            });
          } else {
            throw new Error('Failed to change password');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const handleBtCancel = () => {
        navigate("/securitycode");
    };
    localStorage.removeItem("hasAccessedForgetPassword");
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
                        <h3 className="text-login">ChangePassword</h3>
                    </div>
                </header>

                <div className="head-content">
                    <img src="/src/assets/anya.png" alt="" />
                    <div className="content">
                        <form className="form-change" onSubmit={handleOnContinue}>
                            <h3 className="text-welcome">New Password</h3>
                            <div>
                                <label>Please enter your  new password !</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                    required
                                />
                            </div>

                            <div>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                {passwordMismatch && <p className="text-msg">Password does not match</p>}
                            </div>


                            <div className="two-button">
                                <input
                                    className="button-continue"
                                    type="submit"
                                    name="btAction"
                                    value="Continue"
                                    onClick={(e) => handleOnContinue(e)}
                                />


                                <input
                                    className="button-cancel"
                                    type="submit"
                                    name="btAction"
                                    value="Cancel"
                                    onClick={() => handleBtCancel()}
                                />


                            </div>

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

export default ChangePassword;
