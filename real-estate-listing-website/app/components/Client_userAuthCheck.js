"use client"
import { authClient } from "@/_lib/betterauth/client-auth";
function isUserSignedInHook() {
    const { data: session, isPending, error, refetch } = authClient.useSession()
    if (session) {
        return true
    }
    return false
}

export { isUserSignedInHook }

