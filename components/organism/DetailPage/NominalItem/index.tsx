import Image from "next/image";
import { NumericFormat } from "react-number-format";

interface NominalItemProps {
  coinQuantity: number;
  coinName: string;
  _id: string;
  price: number;
  onChange: () => void;
}
const NominalItem = (props: NominalItemProps) => {
  const { coinQuantity, coinName, _id, price, onChange } = props;
  return (
    <label
      className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10"
      htmlFor={_id}
      onChange={onChange}
    >
      <input
        className="d-none"
        type="radio"
        id={_id}
        name="topup"
        value={_id}
      />
      <div className="detail-card">
        <div className="d-flex justify-content-between">
          <p className="text-3xl color-palette-1 m-0">
            <span className="fw-medium">{`${coinQuantity}`}</span>
            {coinName}
          </p>
          <Image
            src="/icons/check.svg"
            width={20}
            height={20}
            id="icon-check"
          />
        </div>
        <p className="text-lg color-palette-1 m-0">
          <NumericFormat
            value={price}
            prefix="Rp"
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </p>
      </div>
    </label>
  );
};
export default NominalItem;
