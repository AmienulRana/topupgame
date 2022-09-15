import Link from "next/link";
import Input from "../../../atoms/Input";
import NominalItem from "../NominalItem";
import PaymentItem from "../PaymentItem";
import { useState } from "react";
import { checkUsername } from "../../../../services/player";
import { Loading } from "../../../atoms/Loading";
import Image from "next/image";
import {
  BanksTypes,
  NominalsTypes,
  PaymentTypes,
  TopUpFormProps,
} from "../../../../datatypes";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

const TopUpForm = (props: TopUpFormProps) => {
  const { nominals, payments } = props;

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [idPlayer, setIdPlayer] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const [loading, setLoading] = useState(false);

  const getValueNominal = (data: NominalsTypes) => {
    setNominalItem(data);
  };

  const getValuePayment = (payment: PaymentTypes, bank: BanksTypes) => {
    const data = { payment, bank };
    setPaymentItem(data);
  };

  const handleCheckUsername = async (e: any) => {
    const idPlayer = e.target.value;
    setIdPlayer(idPlayer);
    if (idPlayer.length > 7 && idPlayer.length <= 12) {
      setLoading(true);
      const response = await checkUsername(idPlayer, "freefire");
      response.status
        ? setUsername(response.data?.username)
        : alert(`Username dengan id ${idPlayer} tidak ditemukan`);
      return setLoading(false);
    }
  };

  const handleToCheckout = () => {
    if (
      idPlayer === "" ||
      bankAccountName === "" ||
      nominalItem === {} ||
      paymentItem === {}
    ) {
      toast.error("Opps!!! Ada data yang belum diisi");
    } else {
      const data = {
        idPlayer,
        bankAccountName,
        nominalItem,
        paymentItem,
        username,
      };
      localStorage.setItem("data-topup", JSON.stringify(data));
      router.push("/checkout");
    }
  };
  return (
    <>
      <div className="pt-md-50 pt-30">
        <div>
          <Input
            label="Verify Id"
            placeholder="Enter Your ID"
            type="text"
            onChange={handleCheckUsername}
          />
        </div>
        {loading ? (
          <Loading />
        ) : username !== "" ? (
          <div className="flex align-center mt-2">
            <p className="me-2 mb-0">
              {" "}
              username anda adalah: <span className="fw-bold">{username}</span>
            </p>
            <Image
              src="/icons/check.svg"
              width={20}
              height={30}
              alt="checklist icon"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {nominals.map((nominal) => (
            <NominalItem
              key={nominal._id}
              _id={nominal._id}
              coinName={nominal.coinName}
              coinQuantity={nominal.coinQuantity}
              price={nominal.price}
              onChange={() => getValueNominal(nominal)}
            />
          ))}
          <div className="col-lg-4 col-sm-6"></div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  key={bank._id}
                  bankID={bank._id}
                  type={payment.type}
                  name={bank.bankName}
                  onChange={() => getValuePayment(payment, bank)}
                />
              ))
            )}
            <div className="col-lg-4 col-sm-6"></div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <Input
          type="text"
          placeholder="Enter your Bank Account Name"
          label="Bank Account Name"
          onChange={(e) => setBankAccountName(e.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          onClick={handleToCheckout}
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
        >
          Continue
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default TopUpForm;
