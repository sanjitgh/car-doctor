"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import SocialLogin from "./components/SocialLogin";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response.ok) {
        form.reset();
        router.push("/");
      } else {
        alert("login faild");
      }
    } catch (error) {
      console.log(error);
      alert("faild");
    }
  };
  return (
    <div className="py-10">
      <div className="container mx-auto px-3">
        <form onSubmit={handleLogin} className="max-w-2xl mx-auto">
          <label className="fieldset-label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="fieldset-label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />

          <div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </div>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
}
