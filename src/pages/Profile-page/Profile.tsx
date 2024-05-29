import { Navbar, Footer } from "../../import/import-router";
import './Profile.css'
const Profile = () => {

    return (
        <>
            <Navbar />
            <div className="container-profile">
                <div className="user-profile-nav">
                    <div className="user-avatar">
                        <div className="_img"></div>
                        <span>nhanntse123@fpt.edu.vn</span>
                    </div>
                    <div></div>
                    <ul className="nav-account">
                        <li className="active" >

                            <img src="/src/assets/user-account.svg" alt="" className="red" />
                            <a>My Account</a>
                        </li>

                        <li id="bt-purchase" >
                            <img src="/src/assets/purchase.svg" alt="" className="non-red" />

                            <a>Purchase Order</a>
                        </li>
                    </ul>
                </div>

                <div className="content" id="content">
                    <div className="head-content">
                        <ul>
                            <li>
                                <a>COMPLETE</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="account active" id="account">
                    <div className="main-profile">
                        <h1>My profile</h1>
                        <p>Manage profile information for account security</p>
                        <div></div>
                        <form>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Email</td>
                                        <td>nhanntse123@fpt.edu.vn</td>
                                    </tr>

                                    <tr>
                                        <td>Full name</td>
                                        <td>
                                            <input type="text" name="txtName" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Phone number</td>
                                        <td>
                                            <input type="number" name="txtPhone" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Address</td>
                                        <td>
                                            <input type="text" name="txtAddress" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td>
                                            <input type="submit" name="btAction" value="Save" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>


            </div>
            <Footer />
        </>


    )
}

export default Profile;