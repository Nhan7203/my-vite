import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDetail, aProduct } from "../../../interfaces";
import { getUserIdFromToken } from "../../../utils/jwtHelper";
import { getOrderDetails } from "../../../apiServices/UserServices/userServices";
import { getProductId } from "../../../apiServices/ProductServices/productServices";
import useOrderData from "../components/useOrderData";

export const useOrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId?: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<aProduct[]>([]);
  const { orderData } = useOrderData();
  const token = localStorage.getItem("token");
  
  const currentUserId = useMemo(() => {
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const userId = getUserIdFromToken(token);
    return typeof userId === "string" ? parseInt(userId) : userId;
  }, [token]);

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

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { orderDetails, products, currentUserId, orderData, orderId, token };
};