import { NextPage } from "next";
import LogoStore from "../../components/atoms/LogoStore";
import CheckoutConfirm from "../../components/organism/CheckoutPage/CheckoutConfirm";
import CheckoutItem from "../../components/organism/CheckoutPage/CheckoutItem";
import DetailCheckoutItem from "../../components/organism/CheckoutPage/DetailCheckoutItem";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface CheckoutProps {
  _id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
const Checkout = (props: CheckoutProps) => {
  const router = useRouter();
  useEffect(() => {
    const dataFromLocal = JSON.parse(localStorage.getItem("data-topup")!);
    if (!dataFromLocal) {
      router.push("/");
    }
  }, []);
  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <LogoStore width={70} height={70} />
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <CheckoutItem />
        <hr />
        <DetailCheckoutItem />
        <CheckoutConfirm />
      </div>
    </section>
  );
};

export default Checkout;

interface getServerSidePropsType {
  req: {
    cookies: { token: string };
  };
}
export async function getServerSideProps({ req }: getServerSidePropsType) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload = jwt_decode(jwtToken);
  return {
    props: {
      user: payload,
    },
  };
}
