import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AllUsers,
  AllVouchers,
  Order,
  OrderDetail,
  User,
  Voucher,
  aProduct,
} from "../../../interfaces";
import { getUserIdFromToken } from "../../../utils/jwtHelper";
import { getOrderDetails } from "../../../apiServices/UserServices/userServices";
import { getProductId } from "../../../apiServices/ProductServices/productServices";
import useOrderData from "../components/useOrderData";
import { getAllUsers } from "../../../apiServices/StaffServices/staffServices";
import { Brand } from "../AddProduct";
import { getBrand } from "../../../apiServices/BrandServices/brandServices";
import { getAllVouchers } from "../../../apiServices/VoucherServices/voucherServices";

export const useOrderDetails = () => {
  const navigate = useNavigate();
  const { orderData } = useOrderData();
  const { orderId } = useParams<{ orderId?: string }>();
  const { userId } = useParams<{ userId?: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<aProduct[]>([]);
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [allVouchers, setAllVouchers] = useState<AllVouchers[]>([]);
  const [orderVoucher, setOrderVoucher] = useState<Voucher>();
  
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [userData, setUserData] = useState<User>();
  const [order, setOrder] = useState<Order>();
  const token = localStorage.getItem("token");
  const roleId = 0;
  
  const currentUserId = useMemo(() => {
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const userId = getUserIdFromToken(token);
    return typeof userId === "string" ? parseInt(userId) : userId;
  }, [token]);

  //-------------------------------------------------------------------------------------------------

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await getAllUsers(roleId);

      if (response) {
        setAllUsers(response);
      } else {
        console.error("Failed to retrieve user data:", response);
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }
  }, [roleId]);

  //--------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (userId) {
      const user = allUsers.find((u) => u.userId === parseInt(userId ?? ""));
      if (user) {
        setUserData(user);
      }
    }
  }, [userId, allUsers]);

  useEffect(() => {
    if (orderId) {
      const order = orderData.find(
        (od) => od.orderId === parseInt(orderId ?? "")
      );
      if (order) {
        setOrder(order);
      }
    }
  }, [orderId, orderData]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

  //-------------------------------------------------------------------------------------------------

  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) {
      navigate("/user");
      return;
    }
    const queryParams = new URLSearchParams();
    queryParams.append("orderId", orderId.toString());
    setOrderDetails(await getOrderDetails(queryParams));
  }, [orderId, navigate]);

  //-----------------------------------------------------------------------------------------------------

  const fetchProducts = useCallback(async () => {
    const queryParams = new URLSearchParams();
    const productIds = orderDetails.map((orderDetail) => orderDetail.productId);
    if (productIds != null) {
      queryParams.append("", productIds.toString());
    }
    setProducts(await getProductId(queryParams));
  }, [orderDetails]);

//---------------------------------------------------------

const fetchAllVouchers = useCallback(async () => {
  try {
    const response = await getAllVouchers();

    if (response) {
      setAllVouchers(response);
    } else {
      console.error("Failed to retrieve voucher data:", response);
    }
  } catch (error) {
    console.error("Failed to retrieve voucher data:", error);
  }
}, []);

//-----------------------------------------------------------------------

const fetchOrderVoucher = useCallback(async () => {
  if (order) {
    const orderVoucher = allVouchers.find((v) => v.voucherId === order?.voucherId);
    if (orderVoucher) {
      setOrderVoucher(orderVoucher);
    }
  }
}, [allVouchers, order]);


//------------------------------------------------------------------------
  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    fetchOrderVoucher();
  }, [fetchOrderVoucher]);

  useEffect(() => {
    fetchAllVouchers();
  }, [fetchAllVouchers]);

  //----------------------------------------------------------------------------------------


  return {
    orderDetails,
    userData,
    products,
    currentUserId,
    orderData,
    orderId,
    token,
    order,
    brandList,
    orderVoucher
  };
};
