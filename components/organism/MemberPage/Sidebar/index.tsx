import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuItem from "./MenuItem";
import Profile from "./Profile";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Overview"
            href="/profile"
            active={router.pathname === "/profile"}
          />
          <MenuItem
            title="Transactions"
            href="/profile/transactions"
            active={router.pathname === "/profile/transactions"}
          />
          <MenuItem title="Message" href="/profile/message" />
          <MenuItem title="Card" href="/profile/card" />
          <MenuItem title="Rewards" href="/profile/reward" />
          <MenuItem title="Setting" href="/profile/edit" />
          <MenuItem title="Logout" href="/" onClick={handleLogout} />
        </div>
        <div className="sidebar-footer pt-73 pe-30">
          <div className="footer-card">
            <div className="d-flex justify-content-between mb-20">
              <Image src="/icons/step3.svg" width={80} height={80} />
              <p className="fw-medium color-palette-1">
                Top Up &<br />
                Be The Winner
              </p>
            </div>
            <Link href="/">
              <a
                className="btn btn-get-started w-100 fw-medium text-xs text-center text-white rounded-pill"
                role="button"
              >
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
