import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const data = await dbConnect(collectionNameObj.servicesCollection).findOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json(data);
};
