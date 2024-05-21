import './Register.css';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const handleOnClick = () => {
        location.href = "/";
    }

    const handleOnClickRegis = () => {
        location.href = "/login";


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
                        <h3 className="text-login">Register</h3>
                    </div>
                </header>

                <div className="head-content">
                    <img src="/src/assets/anya.png" alt="" />
                    <div className="content">
                        <div className="form-login">
                            <h3 className="text-welcome">Register</h3>
                            <div>
                                <label>Username</label>
                                <input type="text" name="txtUserName" />
                            </div>

                            <div>
                                <label>Password</label>
                                <input type="password" name="txtPassword" />
                            </div>
                            <div>
                                <label>Re-password</label>
                                <input type="password" name="txtPassword" />
                            </div>
                            <input className="button-register" type="submit" name="btAction" value="Register" onClick={() => handleOnClickRegis()} />

                            <p>You don’t have account ?
                                {/* <a href="./Regi">Register</a> */}
                                <Link to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>

                <div className='footer-register'>
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
                                <li>
                                    About
                                </li>
                                <li>
                                    Contact us
                                </li>
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

    )
}

export default Register;