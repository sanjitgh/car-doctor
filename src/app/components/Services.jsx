import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function ServicesSection() {
  const serviceCollection = dbConnect(collectionNameObj.servicesCollection);
  const data = await serviceCollection.find().toArray();

  return (
    <section className="py-10">
      <div className="container mx-auto px-3">
        <h1 className="text-center text-4xl mb-4">Our Service Area</h1>
        <p className="mb-10 text-center max-w-4xl mx-auto">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.map((single_data) => (
            <div key={single_data._id} className="card bg-base-100 shadow-sm">
              <figure className="max-h-[280px]">
                <Image
                  src={single_data.img}
                  alt="product-img"
                  width={800}
                  height={400}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{single_data.title}</h2>
                <p className="text-orange-600 font-semibold text-lg flex items-center justify-between">
                  Price : $ {single_data.price}
                  <span>
                    <Link href={`/service/${single_data._id}`} className="text-orange-600 text-2xl">
                      <FaArrowRightLong />
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
