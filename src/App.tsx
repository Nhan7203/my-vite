import {
  Forgetpassword,
  OrderInfo,
  Home,
  Login,
  Product,
  Chart,
  ProductDetails,
  Cart,
  Vouchers,
  AddVoucher,
  UpdateVoucher,
  Payment,
  User,
  Customer,
  Account,
  Order,
  Admin,
  Blog,
  AddBlog,
  UpdateBlog,
  Blogs,
  Register,
  SecurityCode,
  ChangePassword,
  Profile,
  BlogDetails,
  Complete,
  Cancelled,
  PreOrder,
  Processing,
  Processed,
  ProductManage,
  AddProduct,
  UpdateProduct,
  OrderDetails,
  SecurityCodeRegister,
  ProcessingInAdmin,
  CompleteInAdmin,
  ProcessedInAdmin,
  CancelledInAdmin,
  PreOrderInAdmin,
  Unauthorized,
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
import ProtectedRoute from "./utils/protectedRoute";
import PaymentWrapper from "./utils/protectedRoutePayment";
import ChangePasswordWrapper from "./utils/protectedRouteChangePassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/securityCodeRegister" element={<SecurityCodeRegister />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route
        path="/securitycode"
        element={
          <ChangePasswordWrapper>
            <SecurityCode />
          </ChangePasswordWrapper>
        }
      />
      <Route
        path="/changepassword"
        element={
          <ChangePasswordWrapper>
            <ChangePassword />
          </ChangePasswordWrapper>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/charts"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Chart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <Customer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-product"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <ProductManage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addproduct"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateproduct"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <Order />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orderinformation"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <OrderInfo />
          </ProtectedRoute>
        }
      >
        <Route
          path=":orderId/:userId"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/complete-staff"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <CompleteInAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/processing-staff"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <ProcessingInAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/processed-staff"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <ProcessedInAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cancelled-staff"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <CancelledInAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preorder-staff"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <PreOrderInAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <Blogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addblog"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <AddBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateblog"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <UpdateBlog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vouchers"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <Vouchers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addvoucher"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <AddVoucher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/updatevoucher"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <UpdateVoucher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Staff", "User"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/user" element={<User />} />
      
      <Route path="/complete" element={<Complete />} />
      <Route path="/processing" element={<Processing />} />
      <Route path="/processed" element={<Processed />} />
      <Route path="/cancelled" element={<Cancelled />} />
      <Route path="/preorder" element={<PreOrder />} />

      <Route path="/product" element={<Product />} />
      <Route path="/productDetails" element={<ProductDetails />}>
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="/orderdetails" element={<OrderDetails />}>
        <Route path=":orderId" element={<OrderDetails />} />
      </Route>

      <Route path="/cart" element={<Cart />} />
      <Route
        path="/payment"
        element={
          <PaymentWrapper>
            <Payment />
          </PaymentWrapper>
        }
      />

      <Route path="/blog" element={<Blog />} />
      <Route path="/blogdetails" element={<BlogDetails />}>
        <Route path=":blogId" element={<BlogDetails />} />
      </Route>
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
