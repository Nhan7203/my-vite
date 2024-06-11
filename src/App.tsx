import {
  Forgetpassword,
  Home,
  Login,
  Adress,
  Product,
  ProductDetails,
  Cart,
  Payment,
  User,
  Customer,
  Account,
  Order,
  Admin,
  Blog,
  Voucher,
  Register,
  SecurityCode,
  ChangePassword,
  Profile,
  BlogDetails,
  Complete,
  Cancelled,
  Giveback,
  Processing,
  Processed,
  ProductManage,
  AddProduct,
  UpdateProduct,
  OrderDetails,
  SecurityCodeRegister,
} from "./import/import-router";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { CartProvider } from "./pages/Cart-page/CartContext";
import { ToastContainer } from "./import/import-libary";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/securityCodeRegister" element={<SecurityCodeRegister />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/securitycode" element={<SecurityCode />} />
      <Route path="/changepassword" element={<ChangePassword />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/manage-product" element={<ProductManage />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/updateproduct" element={<UpdateProduct />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/account" element={<Account />} />

      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/order" element={<Order />} />
      <Route path="/orderdetails" element={<OrderDetails />}>
        <Route path=":orderId" element={<OrderDetails />} />
      </Route>
      
      <Route path="/complete" element={<Complete />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/processed" element={<Processed />} />
      <Route path="/cancelled" element={<Cancelled />} />
      <Route path="/giveback" element={<Giveback />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />

      <Route path="/product" element={<Product />} />
      <Route path="/productDetails" element={<ProductDetails />}>
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="/blog" element={<Blog />} />
      <Route path="/blogdetails" element={<BlogDetails />}>
        <Route path=":blogId" element={<BlogDetails />} />
      </Route>

      <Route path="/voucher" element={<Voucher />} />
      <Route path="/adress" element={<Adress />} />
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
