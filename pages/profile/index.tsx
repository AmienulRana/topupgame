import { NextPage } from "next";
import OverviewContent from "../../components/organism/MemberPage/Overview/Content";
import Sidebar from "../../components/organism/MemberPage/Sidebar";
import jwt_decode from "jwt-decode";
const Overview: NextPage = () => {
  return (
    <section className="overview overflow-auto">
      <Sidebar />
      <OverviewContent />
    </section>
  );
};

export default Overview;
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
