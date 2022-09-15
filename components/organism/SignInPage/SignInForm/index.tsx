import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signinPlayer } from "../../../../services/auth";
import Input from "../../../atoms/Input";
import LogoStore from "../../../atoms/LogoStore";
import Cookies from "js-cookie";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    if (!email || !password) {
      toast.error("Email dan Password wajib diisi!!!");
    } else {
      const response = await signinPlayer(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Login Berhasil");
        const { token } = response;
        const tokenBase64 = btoa(token);
        Cookies.set("token", tokenBase64, { expires: 1 });
        router.push("/");
      }
    }
  };
  return (
    <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
      <div className="container mx-auto">
        <div className="pb-50">
          <LogoStore width={60} height={60} />
        </div>
        <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
        <p className="text-lg color-palette-1 m-0">
          Masuk untuk melakukan proses top up
        </p>
        <Input
          type="email"
          label="Email Addres"
          placeholder="Enter your email address"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Your password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="button-group d-flex flex-column mx-auto pt-50">
          <button
            onClick={handleLogin}
            className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          >
            Continue to Sign In
          </button>
          <Link href="/sign-up">
            <a
              className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
              role="button"
            >
              Sign Up
            </a>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default SignInForm;
