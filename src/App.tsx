import {
  Forgetpassword,
  Navbar,
  Login,
  Adress,
  Notification,
  Product,
  ProductDetails,
  Cart,
  Payment,
  User,
  Customer,
  Account,
  Order,
  Main,
  Footer,
  Admin,
  Blog,
  Voucher,
  Register,
  SecurityCode,
  ChangePassword,
  Profile,
  Complete,
  Cancelled,
  Giveback,
  Processing,
  Processed

} from "./import/import-router";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { CartProvider } from "./pages/Cart-page/CartContext";
import { StickyBox, ToastContainer } from "./import/import-libary";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";



// const Home = () => {
//   return (
//     <div>
//       <StickyBox offsetTop={0}>
//         <Navbar />
//       </StickyBox>
//       <Main />
//       <Footer />
//     </div>
//   );
// };

const Home = () => {
  return (
    <div>
      <Navbar />

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
      <Route path="/admin" element={<Admin />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/account" element={<Account />} />
      <Route path="/order" element={<Order />} />

      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/securitycode" element={<SecurityCode />} />
      <Route path="/changepassword" element={<ChangePassword />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/productDetails" element={<ProductDetails />}>
        <Route path=":productId" element={<ProductDetails />} />
      </Route>
      <Route path="/blog" element={<Blog />} />
      <Route path="/voucher" element={<Voucher />} />
      <Route path="/register" element={<Register />} />

      <Route path="/complete" element={<Complete />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/processed" element={<Processed />} />
      <Route path="/cancelled" element={<Cancelled />} />
      <Route path="/giveback" element={<Giveback />} />
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
