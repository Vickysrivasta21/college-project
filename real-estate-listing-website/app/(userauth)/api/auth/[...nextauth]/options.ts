import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { fetchData } from "../../../../../lib/api";

const CrendentialsProviderOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (credentials.username == "" || credentials.password == "") {
            throw new Error("No username/password found.")
          }
          var _currentUserDetails = {
            email: credentials.username,
            password: credentials.password,
          };
          const res = await fetchData("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_currentUserDetails),
          });
          const user = await res.json();
          console.log(user)
          if (res.ok && user) {
            return user;
          }
          throw new Error("User not found.");
        } catch (err) {
          console.log(err);
          
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }
    )
  ],

  //pages: { // this is for custom pages
  //  signIn: "/sign-in"
  //}
};

export default CrendentialsProviderOptions;
