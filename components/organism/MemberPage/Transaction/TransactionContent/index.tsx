import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { lastTransactionProps } from "../../../../../datatypes";
import { getMemberTransaction } from "../../../../../services/member";
import LastTransaction from "../../LastTransaction";
import ButtonFilter from "../ButtonFilter";

const TransactionContent = () => {
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterBy, setFilterBy] = useState("all");

  const getMemberTransactionAPI = useCallback(async () => {
    const response = await getMemberTransaction();
    if (response.error) {
      toast.error(response.message);
    } else {
      const totalTrx = response.reduce(
        (total: number, value: { value: number }) => total + value?.value,
        0
      );
      setTotalTransaction(totalTrx);
      setTransactions(response);
      setData(response);
    }
  }, []);

  useEffect(() => {
    getMemberTransactionAPI();
  }, []);

  const changeFilter = (value: string) => {
    setFilterBy(value);
    if (value === "all") {
      setTransactions(data);
      return;
    }
    setTransactions(data.filter((trx: any) => trx.status === value));
  };

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumericFormat
              value={totalTransaction}
              prefix="Rp"
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonFilter
                text="All Trx"
                onClick={() => changeFilter("all")}
                active={filterBy === "all"}
              />
              <ButtonFilter
                text="Success"
                onClick={() => changeFilter("success")}
                active={filterBy === "success"}
              />
              <ButtonFilter
                text="Pending"
                onClick={() => changeFilter("pending")}
                active={filterBy === "pending"}
              />
              <ButtonFilter
                text="Failed"
                onClick={() => changeFilter("failed")}
                active={filterBy === "failed"}
              />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {transactions.map((transaction: lastTransactionProps) => (
                  <LastTransaction
                    id={transaction?._id}
                    key={transaction?._id}
                    title={transaction?.historyVoucherTopup?.gameName}
                    category={transaction?.category?.name}
                    item={[
                      transaction?.historyVoucherTopup?.coinQuantity,
                      transaction?.historyVoucherTopup?.coinName,
                    ].join(" ")}
                    price={transaction?.value}
                    status={transaction?.status}
                    thumbnail={transaction?.historyVoucherTopup?.thumbnail}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransactionContent;
