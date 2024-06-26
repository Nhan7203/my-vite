import { useEffect, useNavigate } from "../import/import-another";

const ChangePasswordWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // Kiểm tra nếu người dùng đã truy cập trang "cart" trước đó
  const hasAccessedForgetPassword = localStorage.getItem("hasAccessedForgetPassword");
  // Nếu chưa truy cập trang "cart", chuyển hướng về trang "cart"

  useEffect(() => {
    if (hasAccessedForgetPassword === null) {
        navigate("/forgetpassword");
        return;
      }
  }, [hasAccessedForgetPassword, navigate]);
  

  return children;
};

export default ChangePasswordWrapper;