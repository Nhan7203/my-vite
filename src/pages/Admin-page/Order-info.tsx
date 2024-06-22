/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrderDetails } from "./components/useOrderDetails";
import "./Admin.css";
import Sidebar from "./components/Sidebar";
import HeaderMain from "./components/Header-main";
import { useLocation } from "react-router-dom";
import {
  useHandleCancelOrder,
  useHandleConfirmOrder,
} from "./components/HandleOrder";
import {
  ageOptions,
  categoryOptions,
  shippingMethodOptions,
} from "../../interfaces";

const OrderInfo = () => {
  const {
    orderDetails,
    products,
    orderId,
    userData,
    order,
    brandList,
    orderVoucher,
  } = useOrderDetails();
  const location = useLocation();
  const { orderStatus } = location.state;
  const { handleCancelOrder } = useHandleCancelOrder();
  const { handleConfirmOrder } = useHandleConfirmOrder();

  const getBrandOptionName = (brandId: any) => {
    const brandOption = brandList.find((option) => option.brandId === brandId);
    return brandOption ? brandOption.name : "";
  };

  const getAgeOptionName = (ageId: any) => {
    const ageOption = ageOptions.find((option) => option.id === ageId);
    return ageOption ? ageOption.name : "";
  };

  const getCategoryOptionName = (categoryId: any) => {
    const categoryOption = categoryOptions.find(
      (option) => option.id === categoryId
    );
    return categoryOption ? categoryOption.name : "";
  };

  const getShippingMethodOption = (shippingMethodId: any) => {
    const shippingMethodOption = shippingMethodOptions.find(
      (option) => option.id === shippingMethodId
    );
    return shippingMethodOption ? shippingMethodOption.price : 0;
  };

  const handleCancelClick = (
    orderId: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleCancelOrder(orderId);
  };

  const handleConfirmClick = (
    orderId: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleConfirmOrder(orderId);
  };

  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content">
          <HeaderMain
            searchQuery={""}
            displayed={[]}
            setSearchQuery={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <main>
            <form id="boder-form">
              <div className="spacing"></div>
              <div className="form-content">
                <h4>ORDER INFORMATION</h4>
                <div className="head-info">
                  <div>
                    <p>Full Name</p>
                    <p>Phone Number</p>
                    <p>Email</p>
                    <p>Address</p>
                  </div>
                  <div className="value-info">
                    <p>{userData?.name}</p>
                    <p>{userData?.phoneNumber}</p>
                    <p>{userData?.email}</p>
                    <p>{userData?.address}</p>
                  </div>
                </div>

                <div className="product-info">
                  <table>
                    <tr>
                      <td>Image</td>
                      <td>Product</td>
                      <td>Age</td>
                      <td>Brand</td>
                      <td>Category</td>
                      {/* <div className="spacing-td"></div> */}
                      <td style={{ width: 100 }}></td>
                      <td>Quantity</td>
                      <td>Price</td>
                    </tr>
                    <tr className="line-row"></tr>
                    {orderDetails.map((orderDetail) => {
                      const product = products.find(
                        (p) => p.productId === orderDetail.productId
                      );
                      return (
                        <tr key={orderDetail.productId}>
                          <td>
                            <div className="img-table">
                              <img
                                className="img-product"
                                src={product?.imageProducts[0].imageUrl}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>{product?.name}</td>
                          <td>{getAgeOptionName(product?.forAgeId)}</td>
                          <td>{getBrandOptionName(product?.brandId)}</td>
                          <td>{getCategoryOptionName(product?.categoryId)}</td>
                          <div className="spacing-td"></div>
                          <td style={{ textAlign: "center" }}>
                            {orderDetail.quantity}
                          </td>
                          <td>${product?.price.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    <tr className="line-row"></tr>
                  </table>

                  <div className="total-discount">
                    <div className="parameter-total">
                      <p>Subtotal</p>
                      <p>Voucher</p>
                      <p style={{ fontWeight: 700 }}>Total</p>
                    </div>

                    <div className="value-total">
                      <p>${getShippingMethodOption(order?.shippingMethodId)}</p>
                      <p>
                        {orderVoucher?.discountValue}
                        {orderVoucher?.discountType}
                      </p>
                      <p style={{ fontWeight: 700 }}>
                        ${order?.total.toLocaleString()}
                        {/* {orderDetails
                          .reduce((total, order) => total + order.total, 0)
                          .toLocaleString()} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-content">
                <h4>PAYMENT</h4>
                <div className="payment-info">
                  <div>
                    <p>Payment Method</p>
                    <p>Shipping Method</p>
                    <p>Payment Date</p>
                  </div>

                  <div className="value-info">
                    <p>{order?.paymentMethod}</p>
                    <p>
                      {order?.shippingMethodId
                        ? [
                            "Economical delivery",
                            "Regular delivery",
                            "Express delivery",
                          ][order.shippingMethodId - 1]
                        : ""}
                    </p>
                    <p>{order?.orderDate}</p>
                  </div>
                </div>

                <div className="button-payment">
                  {orderStatus === "Pending" && (
                    <div
                      className="add-product"
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      <button
                        onClick={(event) =>
                          handleCancelClick(parseInt(orderId ?? ""), event)
                        }
                      >
                        Cancel Order
                      </button>
                      <button
                        onClick={(event) =>
                          handleConfirmClick(parseInt(orderId ?? ""), event)
                        }
                      >
                        Confirm Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};
export default OrderInfo;
