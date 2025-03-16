"use client";

import { registerUser } from "../actions/auth/registerUser";
import SocialLogin from "../login/components/SocialLogin";

export default function RegisterPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = e.target;
    const name = a.name.value;
    const email = a.email.value;
    const password = a.password.value;
    const userInfo = { name, email, password };
    await registerUser(userInfo);
  };
  return (
    <div className="py-10">
      <div className="container mx-auto px-3">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <label className="fieldset-label">Name</label>
          <input name="name" type="text" className="input" placeholder="Name" />

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
              Register
            </button>
          </div>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
}
