import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { UserTypes } from "../../../../datatypes";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: UserTypes = jwt_decode(jwtToken);
      setUser(payload);
    }
  }, []);

  return (
    <div className="user text-center pb-50 pe-30">
      <p
        className="ms-lg-40 m-auto navbar-profile"
        style={{ width: "60px", height: "60px", fontSize: "24px" }}
      >
        {user?.username?.split("")[0]}
      </p>
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user?.username}</h2>
      <p className="color-palette-2 m-0">{user?.email}</p>
    </div>
  );
};

export default Profile;
