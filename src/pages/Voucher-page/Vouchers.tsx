
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import HeaderMain from "../Admin-page/components/Header-main";
import Sidebar from "../Admin-page/components/Sidebar";
import { aVoucher } from "../../interfaces";
import UserVoucherData from "../Admin-page/components/userVoucherData";
import { deleteVoucher } from "../../apiServices/VoucherServices/voucherServices";
const Vouchers = () => {
  // const { allVoucher } = useAllProduct();
  // const [products, setProducts] = useState<aProduct[]>(allProduct);
  const navigate = useNavigate();
  const { voucherData, setVoucherData } = UserVoucherData();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };
  //---------------------------------------------------------------------------
  const handleDelete = async (voucherId: number) => {
    try {
      swal({
        title: "Are you sure you want to delete this voucher?",
        text: "This action cannot be undone!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await deleteVoucher(voucherId);

          if (response) {
            swal("Success!", "Blog was deleted!", "success").then(() => {
              setVoucherData(voucherData.filter((voucher) => voucher.voucherId !== voucherId));
            });
          } else {
            throw new Error("Failed to delete blog");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  //---------------------------------------------------------------------------
  const handleUpdate = (voucher: aVoucher) => {
    navigate("/updatevoucher", { state: { voucherId: voucher.voucherId } });
  };

  const handleAdd = () => {
    const newVoucherId = Math.max(...voucherData.map((voucher) => voucher.voucherId)) + 1;
    navigate("/addvoucher", { state: { voucherId: newVoucherId } });
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
            <div>
              <div className="head-table">
                <ul>
                  <li
                    className="add-product"
                    onClick={() => handleAdd()}
                  >
                    Add Voucher
                  </li>
                </ul>
              </div>
              <table className="table-custome">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>VoucherId</th>
                    <th>ProductId</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Discount Type</th>
                    <th>Discount Value</th>
                    <th>Minimum Total</th>
                    <th>Created Date</th>
                    <th>ExpDate</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {voucherData.map((voucher, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{voucher.voucherId}</td>
                      <td>{voucher.productId}</td>
                      <td>{voucher.name}</td>
                      <td>{voucher.code}</td>
                      <td>{voucher.discountType}</td>
                      <td>{voucher.discountValue}</td>
                      <td>{voucher.minimumTotal}</td>
                      <td>{formatDate(voucher.createdDate)}</td>
                      <td>{formatDate(voucher.expDate)}</td>
                      <td>
                        <button
                          className="Edit"
                          onClick={() => handleUpdate(voucher)}
                        >
                          Update
                        </button>
                      </td>

                      <td>
                        <button
                          className="Delete-product"
                          onClick={() => handleDelete(voucher.voucherId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>




                  ))}


                </tbody>
              </table>
            </div>
          </main >
        </div >
      </div >
    </>
  );
};

export default Vouchers;
