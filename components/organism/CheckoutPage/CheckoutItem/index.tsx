import Image from "next/image";
import { useEffect, useState } from "react";
import CONFIG from "../../../../config";

const CheckoutItem = () => {
  const [voucherItem, setVoucherItem] = useState({
    name: "",
    thumbnail: "",
    category: {
      name: "",
    },
  });
  useEffect(() => {
    const data = localStorage.getItem("data-item");
    setVoucherItem(JSON.parse(data || ""));
  }, []);
  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          <Image
            src={`${CONFIG.ROOT_API_IMAGE}/${voucherItem?.thumbnail}`}
            className="img-fluid"
            alt={voucherItem?.name}
            width={200}
            height={150}
          />
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">
          {voucherItem?.name}
        </p>
        <p className="color-palette-2 m-0">
          {["Category: ", voucherItem?.category?.name].join(" ")}
        </p>
      </div>
    </div>
  );
};

export default CheckoutItem;
