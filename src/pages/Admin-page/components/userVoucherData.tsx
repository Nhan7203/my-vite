import { useEffect, useState, swal } from "../../../import/import-another";
import { aVoucher } from "../../../interfaces";
import { getAllVouchers } from "../../../apiServices/VoucherServices/voucherServices";

const UserVoucherData = () => {
    const [voucherData, setVoucherData] = useState<aVoucher[]>([]);

    useEffect(() => {
        const fetchVoucherData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    await swal({
                        title: "Oops!",
                        text: "You haven't logged in yet! Redirecting to Login Page...",
                        icon: "warning",
                        buttons: {
                            ok: {
                                text: "OK",
                                value: true,
                                className: "swal-ok-button",
                            },
                        },
                    });
                    window.location.href = "/login";
                    return;
                }

                const response = await getAllVouchers();

                if (response) {
                    setVoucherData(response);
                } else {
                    console.error("Failed to retrieve vouchers data:", response);
                }
            } catch (error) {
                console.error("Failed to retrieve vouchers data:", error);
            }
        };

        fetchVoucherData();
    }, []);

    return { voucherData, setVoucherData };
};

export default UserVoucherData;
