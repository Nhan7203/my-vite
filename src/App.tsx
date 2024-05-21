import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Shop from "./pages/Shop-page/Shop";
import Login from "./pages/Login-page/Login";
import Adress from "./pages/Adress-page/Adress";
import Notification from "./pages/Notification-page/Notification";
import Cart from "./pages/Cart-page/Cart";
import Product from "./pages/Product-page/Product";
import Blog from "./pages/Blog-page/Blog";
import Voucher from "./pages/Voucher-page/Voucher";
import Main from "./components/main/main-home/Main";
import "./App.css"
import { CartProvider } from './pages/Cart-page/CartContext';
import Register from "./pages/Register-page/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>

      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/adress" element={<Adress />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/noti" element={<Notification />} />
      <Route path="/product" element={<Product />} />
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
      < ToastContainer />
    </CartProvider>
  );
}

export default App;