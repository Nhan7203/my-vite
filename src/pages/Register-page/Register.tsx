/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import RegisterVallidation, { IRegisterValues } from './RegisterVallidation';
import { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert';
import emailjs from 'emailjs-com';
import { checkMail } from '../../apiServices/AccountServices/accountServices';

const Register = () => {
    const [registerValues, setRegisterValue] = useState({
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
        address: ""
    })
    const [errors, setErrors] = useState({} as IRegisterValues)
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    function handleInput(event: any) {
        const newObj = { ...registerValues, [event.target.name]: event.target.value }
        setRegisterValue(newObj)
    }

    const handleRegistration = async (event: any) => {
        event.preventDefault();
        setErrors(RegisterVallidation(registerValues))
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            if (errors.check) {
                toast.error('pls check your input', { autoClose: 500 });
            } else if (registerValues.password !== confirmPassword) {
                toast.error('Password and confirm password do not match', { autoClose: 500 });
            } else {
                registerUser();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    
    const registerUser = useCallback(async () => {
        try {
          const response = await checkMail(registerValues.email);
          if (response) {
            swal({
              title: "Email Sent!",
              text: "We have sent you an Email if this Email was linked with your account!",
              icon: "success",
              buttons: {
                ok: {
                  text: "OK",
                  value: true,
                  className: "swal-ok-button",
                }
              },
            }).then((value) => {
              if (value) {
                const code = Math.floor(10000000 + Math.random() * 90000000);
                const templateParams = {
                  from_name: 'MnB Shop <no-reply@mnbshop.com>',
                  to_email: registerValues.email,
                  subject: 'Send mail',
                  code: code,
                };
                emailjs
                  .send(
                    'service_4j0f6f9',
                    'template_pyes21y',
                    templateParams,
                    'Fm8U5RN0vDmjsIl4S'
                  )
                  .then(() => {
                    navigate('/securityCodeRegister', { state: { registerValues, code } });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
          } else {
            swal({
              title: "registered email!!!",
              text: "Email has been registered, you can log in",
              icon: "error",
              buttons: {
                ok: {
                  text: "OK",
                  value: true,
                  className: "swal-ok-button",
                }
              },
            });
          }
        } catch (error) {
          toast.error('some request fail');
          console.error(error);
        }
        
      }, [navigate, registerValues]);

      

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
                    <span className="content">
                        <div className="form-login">
                            <h3 className="text-welcome">Register</h3>
                            <div className='g'>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={registerValues.email}
                                        onChange={handleInput}
                                    />
                                    {errors.email && <p style={{ color: "red", marginLeft: "30px" }}>{errors.email}</p>}
                                </div>
                                <div>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={registerValues.name}
                                        onChange={handleInput}
                                    />
                                    {errors.name && <p style={{ color: "red", marginLeft: "30px" }}>{errors.name}</p>}
                                </div>
                                <div>
                                    <label>Phone</label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        value={registerValues.phoneNumber}
                                        onChange={handleInput}
                                    />
                                    {errors.phoneNumber && <p style={{ color: "red", marginLeft: "30px" }}>{errors.phoneNumber}</p>}
                                </div>
                                <div>
                                    <label>Adress</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={registerValues.address}
                                        onChange={handleInput}
                                    />
                                    {errors.address && <p style={{ color: "red", marginLeft: "30px" }}>{errors.address}</p>}
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={registerValues.password}
                                        onChange={handleInput}
                                    />
                                    {errors.password && <p style={{ color: "red", marginLeft: "30px" }}>{errors.password}</p>}
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                </div>
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
                    </span>
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