import { useLocation, useNavigate } from "react-router-dom";
import { useState, swal, useEffect, useAllProduct } from "../../../import/import-another";
import Sidebar from "../../Admin-page/components/Sidebar";
import HeaderMain from "../../Admin-page/components/Header-main";
import { createVoucher } from "../../../apiServices/VoucherServices/voucherServices";

const AddVoucher = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [productId, setProductId] = useState<number>(0);
  const [createdDate, setCreatedDate] = useState("");
  const [minimumTotal, setMinimumTotal] = useState<number>(0);
  const [expDate, setExpDate] = useState(new Date);
  const currentDate = new Date();
  const { state } = useLocation();
  const { voucherId } = state;
  const { allProduct } = useAllProduct();
  const [errors, setErrors] = useState({
    name: "",
    code: "",
    voucherId: "",
    productId: "",
    discountType: "",
    minimumTotal: "",
    discountValue: "",
    expDate: "",
  });

  useEffect(() => {
    setCreatedDate(new Date().toISOString());
  }, []);
  //-----------------------------------------------------------------------


  const handleCancel = () => {
    navigate("/vouchers");
  };

  //-----------------------------------------------------------------------------

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const error = {
      name: "",
      code: "",
      discountType: "",
      minimumTotal: "",
      discountValue: "",
      voucherId: "",
      productId: "",
      expDate: "",
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

    if (discountValue === 0) {
      error.discountValue = "DiscountValue is Required!";
      error.check = true;
    }

    if (discountType === "%") {
      if (discountValue <= 0 || discountValue > 80) {
        error.discountValue = "DiscountValue(%) must be greater than 0 and less than or equal to 80.";
        error.check = true;
      }
    }

    if (minimumTotal === 0) {
      error.minimumTotal = "MinimumTotal is Required!";
      error.check = true;
    }

    if (voucherId === 0) {
      error.voucherId = "VoucherId must be greater than 0.";
      error.check = true;
    }

    if (!expDate || isNaN(expDate.getTime())) {
      error.expDate = "ExpDate is Required!";
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
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const expirationDateOnly = new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate());
    
    if(currentDateOnly > expirationDateOnly) {
      error.expDate = "ExpDate must be greater than or equal to the current date!";
      error.check = true;
    }

    setErrors(error);
    if (error.check) {
      return;
    }

    const requestData = {
      voucherId: voucherId,
      name: name,
      code: code,
      discountType: discountType,
      discountValue: discountValue,
      productId: productId === 0 ? null : productId,
      minimumTotal: minimumTotal,
      expDate: expDate,
      createdDate: createdDate,
    };

    try {
      const response = await createVoucher(requestData);

      if (response) {
        swal("Success", "Voucher information created successfully!", "success");
        navigate("/vouchers");
      } else {
        swal("Error", `Failed to create voucher information.${response}`, "error");
      }
    } catch (error) {
      console.log(error);
      swal(
        "Error",
        "Error occurred during creating blog information.",
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
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name}</p>
                  )}

                  <h4>Code</h4>
                  <input
                    type="text"
                    name="txtCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  {errors.code && (
                    <p style={{ color: "red" }}>{errors.code}</p>
                  )}


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
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                  />
                  {errors.discountValue && (
                    <p style={{ color: "red" }}>{errors.discountValue}</p>
                  )}

                  <h4>MinimumTotal</h4>
                  <input
                    type="number"
                    name="txtMinimumTotal"
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
                    value={new Date (expDate).toISOString().slice(0, 10)}
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
                </div>
              </div>
              <div className="both-button">
                <button type="submit" className="bt-add" onClick={handleSubmit}>
                  Add
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

export default AddVoucher;
