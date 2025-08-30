import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { fetchData } from "../../../../../lib/api";

const CrendentialsProviderOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentialsprovider-1",
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

          if (res.ok && user) {
            return user;
          }
          throw new Error("User not found.");
        } catch (err) {
          console.log(err);
          throw new Error("Something Went Wrong, Logs in console!");
        }
      },
    }),
  ],
  //pages: { // this is for custom pages
  //  signIn: "/sign-in"
  //}
};

export default CrendentialsProviderOptions;
