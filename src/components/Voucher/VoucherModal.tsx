import React, { useEffect, useState } from "react";
import "./CustomModal.css";

interface Voucher {
  id: number;
  name: string;
  code: string;
  discountType: string;
  discountValue: number;
  minimumTotal: number;
  createdDate: string;
  expDate: string;
  isActive: boolean;
  productId: number | null;
}

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  cart: Array<any>;
  totalAmount: number;
  onVoucherSelect: (voucher: Voucher) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  cart,
  totalAmount,
  onVoucherSelect,
}) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch("https://localhost:7030/api/Voucher/GetAllVouchers")
        .then((response) => response.json())
        .then((data) => setVouchers(data))
        .catch((error) => console.error("Error fetching vouchers:", error));
    }
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const checkVoucherValidity = (voucher: Voucher) => {
    const currentDate = new Date();
    const expirationDate = new Date(voucher.expDate);

    if (currentDate <= expirationDate) {
      if (voucher.productId === null) {
        return totalAmount >= voucher.minimumTotal;
      } else {
        return (
          cart.some((product) => product.productId === voucher.productId) &&
          totalAmount >= voucher.minimumTotal
        );
      }
    }

    return false;
  };

  const sortedVouchers = [...vouchers].sort((a, b) => {
    const aIsValid = checkVoucherValidity(a);
    const bIsValid = checkVoucherValidity(b);
    return aIsValid === bIsValid ? 0 : aIsValid ? -1 : 1;
  });

  const handleVoucherSelect = (voucher: Voucher) => {
    onVoucherSelect(voucher);
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={(e) => {
            e.stopPropagation();
            onRequestClose();
          }}
        >
          ×
        </button>
        <h2 className="modal-header">Available Vouchers</h2>
        <div className="voucher-list">
          {sortedVouchers.map((voucher) => {
            const isValid = checkVoucherValidity(voucher);
            return (
              <div
                key={voucher.id}
                className={`voucher ${isValid ? "" : "invalid"}`}
              >
                <div className="voucher-info">
                  <div className="amount-condition">
                    <span className="amount">
                      {voucher.discountValue}
                      {voucher.discountType}
                    </span>
                    <span className="condition">
                      cho đơn từ {voucher.minimumTotal}
                    </span>
                  </div>
                  <div className="code-box">
                    <span className="code">{voucher.code}</span>
                  </div>
                </div>
                <div className="voucher-footer">
                  <span className="validity">
                    Valid until: {formatDate(voucher.expDate)}
                  </span>
                  <button
                    className="claim-button"
                    disabled={!isValid}
                    onClick={() => handleVoucherSelect(voucher)}
                  >
                    Lấy mã
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
