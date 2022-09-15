import GameCategory from "../GameCategory";
import LastTransaction from "../../LastTransaction";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMemberOverview } from "../../../../../services/member";
import { lastTransactionProps } from "../../../../../datatypes";

const OverviewContent = () => {
  const [lastTransaction, setLastTransaction] = useState([]);

  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message);
    } else {
      setLastTransaction(response);
    }
  }, []);

  useEffect(() => {
    getMemberOverviewAPI();
  }, []);
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Top Up Categories
          </p>
          <div className="main-content">
            <div className="row">
              <GameCategory total="-" title="Game Desktop" icon="desktop" />
              <GameCategory total="-" title="Game Mobile" icon="mobile" />
              <GameCategory total="-" title="Other Category" icon="desktop" />
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
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {lastTransaction?.map((transaction: lastTransactionProps) => (
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
export default OverviewContent;
