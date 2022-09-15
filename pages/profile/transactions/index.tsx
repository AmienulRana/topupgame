import { NextPage } from "next";
import Sidebar from "../../../components/organism/MemberPage/Sidebar";
import jwt_decode from "jwt-decode";
import TransactionContent from "../../../components/organism/MemberPage/Transaction/TransactionContent";
const Transactions: NextPage = () => {
  return (
    <section className="transactions overflow-auto">
      <Sidebar />
      <TransactionContent />
    </section>
  );
};

export default Transactions;

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
