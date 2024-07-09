import { useLocation, useNavigate } from "react-router-dom";
import UserVoucherData from "../../Admin-page/components/userVoucherData";
import { useEffect, useState, swal, useAllProduct } from "../../../import/import-another";
import Sidebar from "../../Admin-page/components/Sidebar";
import HeaderMain from "../../Admin-page/components/Header-main";
import { updateVoucher } from "../../../apiServices/VoucherServices/voucherServices";
const UpdateVoucher = () => {
  const navigate = useNavigate();
  const { voucherData } = UserVoucherData();
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [productId, setProductId] = useState<number>(0);
  const [minimumTotal, setMinimumTotal] = useState<number>(0);
  const currentDate = new Date();
  const [expDate, setExpDate] = useState(new Date);
  const { state } = useLocation();
  const { allProduct } = useAllProduct();
  const { voucherId } = state;
  const [errors, setErrors] = useState({
    name: "",
    code: "",
    discountType: "",
    minimumTotal: "",
    discountValue: "",
    productId: "",
    expDate: "",
    isActive: "",
  });

  useEffect(() => {
    if (voucherId) {
      const selectedVoucher = voucherData.find(
        (e) => e.voucherId === voucherId
      );
      if (selectedVoucher) {
        setName(selectedVoucher.name);
        setCode(selectedVoucher.code);
        setDiscountType(selectedVoucher.discountType);
        setDiscountValue(selectedVoucher.discountValue);
        setProductId(selectedVoucher.productId);
        setMinimumTotal(selectedVoucher.minimumTotal);
        setExpDate(new Date (selectedVoucher.expDate));
        setIsActive(selectedVoucher.isActive);
      }
    }
  }, [voucherId, voucherData]);
  //-----------------------------------------------------------------------

  const handleCancel = () => {
    navigate("/vouchers");
  };

  //-----------------------------------------------------------------------------

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = {
      name: "",
      code: "",
      discountType: "",
      minimumTotal: "",
      discountValue: "",
      productId: "",
      expDate: "",
      isActive: "",
      check: false,
    };

    if (name === "") {
      error.name = "Name is Required!";
      error.check = true;
    }

    if (code === "") {
      error.code = "Code is Required!";
      error.check = true;
    }

    if (discountType === "") {
      error.discountType = "DiscountType is Required!";
      error.check = true;
    }

    if (discountType !== "%" && discountType !== "K") {
      error.discountType = "DiscountType is '%' or 'K'";
      error.check = true;
    }

    if (minimumTotal === 0) {
      error.minimumTotal = "MinimumTotal must be greater than 0.";
      error.check = true;
    }

    if (discountValue === 0) {
      error.discountValue = "DiscountValue must be greater than 0.";
      error.check = true;
    }

    if (discountValue === 0) {
      error.discountValue = "DiscountValue must be greater than 0.";
      error.check = true;
    }

    if (discountType === "%") {
      if (discountValue <= 0 || discountValue > 100) {
        error.discountValue = "DiscountValue(%) must be greater than 0 and less than or equal to 100.";
        error.check = true;
      }
    }

    if (!expDate || isNaN(expDate.getTime())) {
      error.expDate = "ExpDate is Required!";
      error.check = true;
    }

    if(currentDate > new Date(expDate)) {
      error.expDate = "ExpDate must be greater than or equal to the current date!";
      error.check = true;
    }

    if (productId) {
      const product = allProduct.find(
        (e) => e.productId === productId 
      );
      if (!product) {
        error.productId = "ProductId does not exist.";
        error.check = true;
      }
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    try {
      const dataVoucher = {
        voucherId: voucherId,
        name: name,
        code: code,
        discountType: discountType,
        discountValue: discountValue,
        minimumTotal: minimumTotal,
        productId: productId === 0 ? null : productId,
        createdDate: currentDate, // Check if this is needed in the API
        expDate: expDate,
        isActive: isActive,
      };

      const response = await updateVoucher(voucherId,dataVoucher)

      if (response) {
        swal("Success", "Voucher information updated successfully!", "success");
        navigate("/vouchers");
      } else {
        swal("Error", "Failed to update voucher information.", "error");
        console.log("Dataaaaa", response);
      }
    } catch (error) {
      console.error("Error:", error);
      swal(
        "Error",
        "Error occurred during updating voucher information.",
        "error"
      );
    }
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
            <form onSubmit={handleSubmit} id="boder-form">
              <div className="form-add ">
                <div>
                  <h4>Voucher: {voucherId}</h4>
                  <h4>Name</h4>
                  <input
                    type="text"
                    name="txtName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                  <h4>Code</h4>
                  <input
                    type="text"
                    name="txtCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  {errors.code && <p style={{ color: "red" }}>{errors.code}</p>}

                  <h4>Discount Type</h4>
                  <input
                    type="text"
                    name="txtDiscountType"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                  />
                  {errors.discountType && (
                    <p style={{ color: "red" }}>{errors.discountType}</p>
                  )}

                  <h4>Discount Value</h4>
                  <input
                    type="number"
                    name="txtDiscountValue"
                    min={0}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                  />
                  {errors.discountValue && (
                    <p style={{ color: "red" }}>{errors.discountValue}</p>
                  )}

                  <h4>Minimum Total</h4>
                  <input
                    type="number"
                    name="txtMinimumTotal"
                    min={0}
                    value={minimumTotal}
                    onChange={(e) => setMinimumTotal(Number(e.target.value))}
                  />
                  {errors.minimumTotal && (
                    <p style={{ color: "red" }}>{errors.minimumTotal}</p>
                  )}

                  <h4>Exp Date</h4>
                  <input
                    type="date"
                    name="txtExpDate"
                    value={expDate.toISOString().slice(0, 10)}
                    onChange={(e) => setExpDate(new Date (e.target.value))}
                  />
                  {errors.expDate && (
                    <p style={{ color: "red" }}>{errors.expDate}</p>
                  )}

                  <h4>ProductId</h4>
                  <input
                    type="number"
                    name="txtProductId"
                    min={0}
                    value={productId}
                    onChange={(e) => setProductId(Number(e.target.value))}
                  />
                  {errors.productId && (
                    <p style={{ color: "red" }}>{errors.productId}</p>
                  )}

                  <h4>Is Active</h4>
                  <select
                    id="isActive"
                    name="isActive"
                    value={isActive.toString()}
                    onChange={(e) => setIsActive(e.target.value === "true")}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  {errors.isActive && (
                    <p style={{ color: "red" }}>{errors.isActive}</p>
                  )}
                </div>
              </div>
              <div className="both-button">
                <button type="submit" className="bt-add">
                  Update
                </button>
                <button className="bt-cancel" onClick={() => handleCancel()}>
                  Cancel
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default UpdateVoucher;
