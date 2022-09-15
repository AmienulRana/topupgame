import Image from "next/image";
import { useRouter } from "next/router";
import LogoStore from "../../atoms/LogoStore";
import MenuNavbar from "./Menu";
import NavbarLogin from "./NavbarLogin";

const Navbar = () => {
  const router = useRouter();
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white pt-lg-40 pb-lg-40 pt-30 pb-50">
        <div className="container-fluid">
          <LogoStore width={60} height={60} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
              <MenuNavbar title="Home" active={router.pathname === "/"} />
              <MenuNavbar title="Games" />
              <MenuNavbar title="Rewards" />
              <MenuNavbar title="Discover" />
              <MenuNavbar title="Global Rank" />
              <NavbarLogin />
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
