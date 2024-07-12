import { useEffect, useState } from "../../../import/import-another";
import { aVoucher } from "../../../interfaces";
import { getAllVouchers } from "../../../apiServices/VoucherServices/voucherServices";

const UserVoucherData = () => {
    const [voucherData, setVoucherData] = useState<aVoucher[]>([]);

    useEffect(() => {
        const fetchVoucherData = async () => {
            try {
                
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
