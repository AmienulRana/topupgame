import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import CONFIG from "../../../../config";

interface Props {
  title: string;
  category: "Desktop" | "Mobile";
  item: string;
  price: number;
  status: "success" | "pending" | "failed";
  thumbnail: string;
  id: string;
}

const LastTransaction = (props: Props) => {
  const { title, category, item, price, status, thumbnail, id } = props;
  const classStatus = cx("float-start icon-status", status.toLowerCase());
  return (
    <tr className="align-middle">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3 radius-10 cover"
          src={`${CONFIG.ROOT_API_IMAGE}/${thumbnail}`}
          width={80}
          height={60}
          alt={title}
        />
        <div className="game-title-header">
          <Link href={`/profile/transactions/${id}`}>
            <p className="game-title fw-medium pointer text-start color-palette-1 m-0">
              {title}
            </p>
          </Link>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {category}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          <NumericFormat
            value={price}
            prefix="Rp"
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </p>
      </td>
      <td>
        <div>
          <span className={classStatus}></span>
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {status}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default LastTransaction;
