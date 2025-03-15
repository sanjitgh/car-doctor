import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function ServiceDetailsPage({ params }) {
  const data = await dbConnect(collectionNameObj.servicesCollection).findOne({
    _id: new ObjectId(params.id),
  });
  console.log(data);
  return (
    <div className="py-10">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-9">
            <Image
              src={data.img}
              alt="img"
              width={1000}
              height={1000}
              className="w-full"
            />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.facility.map((item, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 card-xs shadow-sm shadow-orange-200"
                >
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* sidebar */}
          <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-5">Price : $ {data.price}</h1>
            <button className="btn bg-orange-600 text-white ">
              Proceed Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
