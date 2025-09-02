"use client"
import { authClient } from "@/_lib/betterauth/client-auth";
function isUserSignedIn() {
    const { data: session, isPending, error, refetch } = authClient.useSession()
    if (session) {
        return true
    }
    return false
}

export { isUserSignedIn }

