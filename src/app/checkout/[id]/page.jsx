import CheckoutForm from "@/components/forms/CheckoutForm";

export default async function page({ params }) {
  const res = await fetch(`http://localhost:3000/api/service/${params.id}`);
  const data = await res.json();
  return (
    <div className="py-10">
      <div className="container mx-auto px-3">
        <h1 className="text-center text-4xl">Checkout Page</h1>
        <CheckoutForm data={data} />
      </div>
    </div>
  );
}
