import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../SecurityCode-page/SecurityCode.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const SecurityCodeRegister = () => {
    const [otp, setOtp] = useState('');

    const [isCodeValid, setIsCodeValid] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { registerValues, code: initialCode } = location.state || {};
    console.log(initialCode)
    console.log(registerValues)
    console.log(otp)

    useEffect(() => {
        if (!registerValues || !initialCode) {
            // Redirect to the registration page if registerValues or code is missing
            navigate('/register');
        }
    }, [registerValues, initialCode, navigate]);

    const handleOnContinue = async (event: any) => {
        event.preventDefault();
        // const urlParams = new URLSearchParams(window.location.search);
        // const code = urlParams.get('code');

        if (otp == initialCode) {
            try {
                const response = await axios.post('https://localhost:7030/api/Account/Register', registerValues);
                if (response.status === 200) {
                    toast.success('Registration successful');
                    navigate(`/login`);
                }
            } catch (error) {
                toast.error('Registration failed');
                console.error(error);
            }
        } else {
            setIsCodeValid(false);
        }
    };

    const handleBtCancel = () => {
        navigate("/register")
    }

    const handleOnClick = () => {
        navigate("/");
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
                                    type="number"
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
                                    onClick={handleOnContinue}
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

export default SecurityCodeRegister;
