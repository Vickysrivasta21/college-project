import NextAuth from "next-auth"
import CrendentialsProviderOptions from "./options"

const handler = NextAuth(CrendentialsProviderOptions)

export { handler as GET, handler as POST }