import { NextPage } from "next";
import Sidebar from "../../../components/organism/MemberPage/Sidebar";
import { HistoryTransactionTypes } from "../../../datatypes";
import { getTransactionDetail } from "../../../services/member";
import CONFIG from "../../../config";
import { NumericFormat } from "react-number-format";
interface TranscationsDetailProps {
  detail: HistoryTransactionTypes;
}

const TransactionsDetail = ({ detail }: TranscationsDetailProps) => {
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">
            Detail Transaction
          </h2>
          <div className="details">
            <div className="main-content main-content-card overflow-auto">
              <section className="checkout mx-auto">
                <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                  <div className="game-checkout d-flex flex-row align-items-center">
                    <div className="pe-4">
                      <div className="cropped">
                        <img
                          src={`${CONFIG.ROOT_API_IMAGE}/${detail?.historyVoucherTopup?.thumbnail}`}
                          width="200"
                          height="130"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <p className="fw-bold text-xl color-palette-1 mb-10">
                        {detail?.historyVoucherTopup?.gameName}
                      </p>
                      <p className="color-palette-2 m-0">
                        Category: {detail?.historyVoucherTopup?.category}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className={[
                        "fw-medium text-center label m-0 rounded-pill ",
                        detail?.status,
                      ].join(" ")}
                    >
                      {detail?.status}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="purchase pt-30">
                  <h2 className="fw-bold text-xl color-palette-1 mb-20">
                    Purchase Details
                  </h2>
                  <p className="text-lg color-palette-1 mb-20">
                    Your Game ID{" "}
                    <span className="purchase-details">
                      {detail?.accountUser}
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Username{" "}
                    <span className="purchase-details">
                      {detail?.usernameGame}
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Item{" "}
                    <span className="purchase-details">
                      {detail?.historyVoucherTopup?.coinQuantity}
                      {detail?.historyVoucherTopup?.coinName}
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Price{" "}
                    <span className="purchase-details">
                      <NumericFormat
                        value={detail?.historyVoucherTopup?.price}
                        prefix="Rp"
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Tax (10%){" "}
                    <span className="purchase-details">
                      <NumericFormat
                        value={detail?.tax}
                        prefix="Rp"
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Total{" "}
                    <span className="purchase-details color-palette-4">
                      <NumericFormat
                        value={detail?.value}
                        prefix="Rp"
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </span>
                  </p>
                </div>
                <div className="payment pt-10 pb-10">
                  <h2 className="fw-bold text-xl color-palette-1 mb-20">
                    Payment Informations
                  </h2>
                  <p className="text-lg color-palette-1 mb-20">
                    Your Account Name{" "}
                    <span className="purchase-details">{detail?.name}</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Type{" "}
                    <span className="payment-details">
                      {detail?.historyPayment?.type}
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Bank Name{" "}
                    <span className="payment-details">
                      {detail?.historyPayment?.bankName}
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Bank Account Name{" "}
                    <span className="payment-details">
                      {detail?.historyPayment?.name}
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Bank Number{" "}
                    <span className="payment-details">
                      {detail?.historyPayment?.noRekening}
                    </span>
                  </p>
                </div>
                <div className="d-md-block d-flex flex-column w-100">
                  {detail?.status !== "success" ? (
                    <a
                      className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                      href="#"
                      role="button"
                    >
                      WhatsApp ke Admin
                    </a>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default TransactionsDetail;

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    id: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { id } = params;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  //   const jwtToken = Buffer.from(token, "base64").toString("ascii");
  //   const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const response = await getTransactionDetail(id);
  return {
    props: {
      detail: response,
    },
  };
}
