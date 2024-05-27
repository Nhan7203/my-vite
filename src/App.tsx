import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { CartProvider } from "./pages/Cart-page/CartContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login-page/Login";
import Adress from "./pages/Adress-page/Adress";
import Notification from "./pages/Notification-page/Notification";
import Cart from "./pages/Cart-page/Cart";
import Product from "./pages/Product-page/Product";
import ProductDetails from "./pages/ProductDetails-page/productDetails";
import Blog from "./pages/Blog-page/Blog";
import Voucher from "./pages/Voucher-page/Voucher";
import Main from "./components/main/main-home/Main";
import Register from "./pages/Register-page/Register";
import Footer from "./components/Footer/footer";
import Admin from "./pages/Adim-page/Admin";
import StickyBox from "react-sticky-box";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Payment from "./pages/Payment-page/Payment";
import User from "./pages/User-page/User";

const Home = () => {
  return (
    <div>
     <StickyBox offsetTop={0}>
      <Navbar />
    </StickyBox> 
      <Main />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/user" element={<User />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/adress" element={<Adress />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/noti" element={<Notification />} />
      <Route path="/product" element={<Product />} />
      <Route path="/productDetails" element={<ProductDetails />}>
        <Route path=":productId" element={<ProductDetails />}/>
      </Route>  
      <Route path="/blog" element={<Blog />} />
      <Route path="/voucher" element={<Voucher />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
