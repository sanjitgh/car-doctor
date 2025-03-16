"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = dbConnect(collectionNameObj.usersCollection);
  const user = await userCollection.findOne({ email });
  const isPasswordOk = bcrypt.compare(user.password, password);
  if (!user && isPasswordOk) {
    return null;
  }

  return user;
};
