"use client"
import { authClient } from "@/_lib/betterauth/client-auth";
function isUserSignedInHook() {
    const { data: session, isPending, error, refetch } = authClient.useSession()
    if (session) {
        return true
    }
    return false
}

function fetchUserbyAPI()  {
      try {
        fetch("/api/auth/get-session").then((res) => res.json()).then((data) => {
            if (data === null) {
                return null
            }
            return data
          });
       
      } catch (err) {
        return `ERROR: ${err}`
      }
    };

export { fetchUserbyAPI,isUserSignedInHook } // unused function: "isUserSignedInHook"

