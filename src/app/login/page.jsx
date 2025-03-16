"use client";

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const a = e.target;
    const email = a.email.value;
    const password = a.password.value;
    const userInfo = { email, password };
    console.log(userInfo);
  };
  return (
    <div className="py-10">
      <div className="container mx-auto px-3">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">

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
      </div>
    </div>
  );
}
