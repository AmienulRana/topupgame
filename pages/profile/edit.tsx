import { NextPage } from "next";
import Input from "../../components/atoms/Input";
import Sidebar from "../../components/organism/MemberPage/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/member";

interface UserStateTypes {
  username: string;
  email: string;
}

const EditProfile: NextPage = () => {
  const [user, setUser] = useState<UserStateTypes>({
    username: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const { username, email }: UserStateTypes = jwtDecode(jwtToken);
      setUser({ username, email });
    }
  }, []);

  const handleToUpdate = async () => {
    const response = await updateProfile(user);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };
  return (
    <section className="edit-profile overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              type="text"
              value={user.username}
              onChange={(event) =>
                setUser({
                  ...user,
                  username: event.target.value,
                })
              }
            />
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              disabled={true}
              value={user.email}
            />
            <div className="button-group d-flex flex-column pt-50">
              <button
                onClick={handleToUpdate}
                type="button"
                className="btn btn-save fw-medium text-lg text-white rounded-pill"
                role="button"
              >
                Save My Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
export default EditProfile;
