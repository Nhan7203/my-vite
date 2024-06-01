import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecurityCode.css';

const SecurityCode = () => {
    const [otp, setOtp] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(true);
    const navigate = useNavigate();

    const handleOnContinue = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const code = urlParams.get('code');

        if (otp === code) {
            alert("oke");
            navigate(`/changepassword?email=${email}&code=${code}`);
        } else {
            setIsCodeValid(false);
            return;
        }
    };

    const handleBtCancel = () => {
        location.href = "/forgetpassword";
    }

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
                        <h3 className="text-login">ForgetPassword</h3>
                    </div>
                </header>

                <div className="head-content">
                    <img src="/src/assets/anya.png" alt="" />
                    <div className="content">
                        <form className="form-security" >
                            <h3 className="text-code">Enter the security code</h3>
                            <div>
                                <label>Please check your email for a message with the code. Your code has 8 characters</label>
                                <input
                                    type="text"
                                    id=" "
                                    placeholder="Insert your code here!"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                {!isCodeValid && <p className="text-msg">Your code is not valid!</p>}
                            </div>


                            <div className="two-button">
                                <input
                                    className="button-continue"
                                    type="submit"
                                    name="btAction"
                                    value="Continue"
                                    onClick={() => handleOnContinue()}
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

export default SecurityCode;
