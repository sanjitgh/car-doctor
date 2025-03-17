import { authOptions } from "@/lib/authOption";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
  const result = await bookingCollection.insertOne(body);
  console.log(result);

  return NextResponse.json(result);
};

export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (session) {
    const email = session?.user?.email;
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
    const result = await bookingCollection.find({ email }).toArray();

    return NextResponse.json(result);
  }
  return NextResponse.json({});
};
