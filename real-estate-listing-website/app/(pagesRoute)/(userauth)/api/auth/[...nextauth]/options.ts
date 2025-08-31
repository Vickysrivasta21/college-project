import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { fetchData } from "@/lib/api";

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
          var data = {"id": user["user"]["id"],"user": user["user"]["name"] } // temp
          console.log(user,data) // temp
          if (res.ok && user) {
            return data;
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
  callbacks: {
/*   
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    
    
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    } */
   /*async session({ session, user, token }) {
     session.accessToken = token.accessToken
    session.user.name = user.name
    
    
      return session
    }, */
    async redirect({ url, baseUrl }) {
      return "/dashboard"
    }
  },
  events: {
    /*signIn({user,account,profile,isNewUser}) {
      //user.id
      console.log("AccessToken: " + account.access_token)
    } */
  },
  

  //pages: { // this is for custom pages
  //  signIn: "/sign-in"
  //}
};

export default CrendentialsProviderOptions;
