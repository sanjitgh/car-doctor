"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutForm({ data }) {
  const { data: session } = useSession();
  console.log(session?.user.name);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const date = form.date.value;
    const message = form.message.value;
    const amount = form.amount.value;

    const payload = {
      // session data
      name,
      email,

      phone,
      address,
      date,
      amount,
      message,
      // extra info
      service_id: data._id,
      service_name: data.title,
      service_img: data.img,
    };

    const res = await fetch("http://localhost:3000/api/service", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const postedRespones = await res.json();
    if (postedRespones.insertedId) {
      toast.success("Order confirem!");
      redirect("/");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-8 rounded-lg w-full max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            defaultValue={session?.user?.name}
            name="name"
            type="text"
            placeholder="First Name"
            className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            readOnly
          />
          <input
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            type="date"
            className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="phone"
            type="number"
            placeholder="Your Phone"
            className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            defaultValue={session?.user?.email}
            name="email"
            type="email"
            placeholder="Your Email"
            className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            readOnly
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            value={`$${data?.price}`}
            name="amount"
            type="text"
            placeholder="Due Amount"
            className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            readOnly
          />
          <input
            name="address"
            type="text"
            placeholder="Your Address"
            className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your Message"
          className="p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
        >
          Order Confirm
        </button>
      </form>
    </div>
  );
}
