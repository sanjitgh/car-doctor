import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export default function MyBookingTable({ data }) {
  console.log(data);
  return (
    <div className="py-10">
      <div className="conatiner mx-auto px-3">
        <h1 className="text-center text-4xl mb-5">My Bookings</h1>
        <div className="flex flex-col items-center p-8">
          {data?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center w-full max-w-4xl p-4 mb-4 bg-white rounded-lg shadow-md gap-3"
              >
                <p>{idx + 1}</p>
                <Image
                  src={item.service_img}
                  width={50}
                  height={50}
                  alt="img"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.service_name}</h3>
                </div>
                <p className="text-sm text-gray-600 mr-6">{item.email}</p>
                <p className="text-sm text-gray-600 mr-6">{item.date}</p>
                <div className="flex gap-3 items-center">
                  <button className="btn">
                    <FaEdit />
                  </button>
                  <button className="btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
