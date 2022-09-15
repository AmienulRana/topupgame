import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function NavbarLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    username: "",
  });
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);

      const payload: any = jwt_decode(jwtToken);
      // const userFromPayload: UserTypes = payload.player;
      setUser({ username: payload.username });
      setIsLogin(true);
    }
  }, []);
  if (isLogin) {
    return (
      <li className="nav-item my-auto d-flex">
        <div className="vertical-line d-lg-block d-none"></div>
        <Link href="/profile">
          <a className="ms-lg-40 navbar-profile" role="button">
            {user?.username?.split("")[0]}
          </a>
        </Link>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in">
        <a
          className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
          role="button"
        >
          Sign In
        </a>
      </Link>
    </li>
  );
}
