"use client";
import MyBookingTable from "@/components/bookingTable/MyBookingTable";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMyBookingData = async () => {
      const res = await fetch("http://localhost:3000/api/service");
      const d = await res.json();
      setData(d);
    };
    fetchMyBookingData();
  }, []);
  return <MyBookingTable data={data} />;
}
