import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "@/app/api/auth/loginUser";
import dbConnect, { collectionNameObj } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        console.log("user", user);
        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        const { provider, providerAccountId } = account;
        const { name, email: user_email, image } = user;
        const userCollection = dbConnect(collectionNameObj.usersCollection);
        const isExist = await userCollection.findOne({ email: user_email });
        if (!isExist) {
          const payload = {
            providerAccountId,
            provider,
            email: user_email,
            image,
            name,
          };
          await userCollection.insertOne(payload);
        }
      }

      return true;
    },
  },
};
