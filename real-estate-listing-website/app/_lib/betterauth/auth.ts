import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {mongodbAdapter} from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb";
 
const client = new MongoClient(process.env.AUTH_DATABASE_URL);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 3, // TODO: Revert back to `8`.
        maxPasswordLength: 20,
    },
    socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    },
    facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    } 
  }, 
});