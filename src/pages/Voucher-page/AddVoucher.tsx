import { useLocation, useNavigate } from "react-router-dom";
import { useState, swal, useEffect } from "../../import/import-another";
import Sidebar from "../Admin-page/components/Sidebar";
import HeaderMain from "../Admin-page/components/Header-main";

const AddVoucher = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [productId, setProductId] = useState<number>(0);
  const [createdDate, setCreatedDate] = useState("");
  const [minimumTotal, setMinimumTotal] = useState("");
  const [expDate, setExpDate] = useState("");
  const { state } = useLocation();
  const { voucherId } = state;
  const [errors, setErrors] = useState({
    name: "",
    code: "",
    productId: "",
    voucherId: "",
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
      productId: "",
      discountType: "",
      minimumTotal: "",
      discountValue: "",
      voucherId: "",
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

    if (discountValue === "") {
      error.discountValue = "DiscountValue is Required!";
      error.check = true;
    }

    if (minimumTotal === "") {
      error.minimumTotal = "MinimumTotal is Required!";
      error.check = true;
    }

    if (productId === 0) {
      error.productId = "ProductId must be greater than 0.";
      error.check = true;
    }

    if (voucherId === 0) {
      error.voucherId = "VoucherId must be greater than 0.";
      error.check = true;
    }

    if (expDate === "") {
      error.expDate = "ExpDate is Required!";
      error.check = true;
    }



    setErrors(error);
    if (error.check) {
      return;
    }

    const requestData = {
      voucherId: voucherId.toString(),
      name: name,
      code: code,
      discountType: discountType,
      discountValue: discountValue,
      productId: productId.toString(),
      minimumTotal: minimumTotal,
      expDate: expDate,
      createdDate: createdDate,
    };

    try {
      const response = await fetch(
        `https://localhost:7030/api/Voucher/CreateVoucher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.status === 200) {
        swal("Success", "Voucher information created successfully!", "success");
        navigate("/vouchers");
      } else {
        swal("Error", `Failed to create voucher information.${response.status}`, "error");
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
                    type="text"
                    name="txtDiscountValue"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                  />
                  {errors.discountValue && (
                    <p style={{ color: "red" }}>{errors.discountValue}</p>
                  )}

                  <h4>MinimumTotal</h4>
                  <input
                    type="text"
                    name="txtMinimumTotal"
                    value={minimumTotal}
                    onChange={(e) => setMinimumTotal(e.target.value)}
                  />
                  {errors.minimumTotal && (
                    <p style={{ color: "red" }}>{errors.minimumTotal}</p>
                  )}

                  <h4>Exp Date</h4>
                  <input
                    type="date"
                    name="txtExpDate"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
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
