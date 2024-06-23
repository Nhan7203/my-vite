import { useEffect, useNavigate } from "../import/import-another";

const PaymentWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // Kiểm tra nếu người dùng đã truy cập trang "cart" trước đó
  const hasAccessedCart = localStorage.getItem("hasAccessedCart");
  console.log("hiiii", hasAccessedCart)
  // Nếu chưa truy cập trang "cart", chuyển hướng về trang "cart"

  useEffect(() => {
    if (hasAccessedCart === null) {
        navigate("/cart");
        return;
      }
  }, [hasAccessedCart, navigate]);
  

  return children;
};

export default PaymentWrapper;
