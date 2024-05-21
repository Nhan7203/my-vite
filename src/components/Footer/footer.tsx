
import './footer.css';


const Footer = () => {
    return (
        <>
            <footer>
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
                    <div className='line-under'></div>
                </div>
            </footer>



        </>
    )
}

export default Footer;