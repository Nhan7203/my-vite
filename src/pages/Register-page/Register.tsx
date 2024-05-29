import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleRegistration = async () => {
        if (!username || !password || !confirmPassword) {

            toast.error('Please fill in all the fields');
            return;
        }

        if (password !== confirmPassword) {

            toast.error('Password and confirm password do not match');
            return;
        }

        try {

            const response = await axios.post('https://localhost:7030/api/Account/Register', {
                email: username,
                password: password,
            });

            if (response.status === 200) {
                toast.done('Registration successful');
                window.location.href = '/login';
            }

        } catch (error) {

            toast.error('Registration failed');
            console.error(error);
        }
    };

    return (
        <>
            <body>
                <header>
                    <div>
                        <div
                            className="logo-mandb"
                            onClick={() => (window.location.href = '/')}
                        >
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
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="txtUserName"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>

                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="txtPassword"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="txtConfirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <input
                                className="button-register"
                                type="submit"
                                name="btAction"
                                value="Register"
                                onClick={handleRegistration}
                            />

                            <p>
                                You already had an account?{' '}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-register">
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
                        <h5>Copyright&copy;: m&b@gmail.com</h5>
                    </div>
                </div>
            </body>
        </>
    );
};

export default Register;