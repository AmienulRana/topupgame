import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Input from "../components/atoms/Input";
import LogoStore from "../components/atoms/LogoStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupPlayer } from "../services/auth";
const SignUp: NextPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async () => {
    const userForm = {
      email,
      username,
      password,
    };
    const response = await signupPlayer(userForm);
    if (response?.error) {
      toast.error(response?.message);
    } else {
      toast.success("Register Berhasil");
      router.push("/sign-up-success");
    }
  };
  return (
    <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
      <div className="container mx-auto">
        <div className="pb-50">
          <LogoStore width={60} height={60} />
        </div>
        <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
        <p className="text-lg color-palette-1 m-0">
          Daftar dan bergabung dengan kami
        </p>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your name"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label="Email Address"
          type="text"
          placeholder="Enter your email address"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="button-group d-flex flex-column mx-auto pt-50">
          <button
            type="button"
            className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
            onClick={handleSubmit}
          >
            Continue
          </button>
          <Link href="/sign-in">
            <a
              className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
              role="button"
            >
              Sign In
            </a>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignUp;
