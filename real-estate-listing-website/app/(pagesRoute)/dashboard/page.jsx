"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchData } from "@/_lib/api";
import { authClient } from "@/_lib/betterauth/client-auth";
import { data } from "react-router-dom";
import styles from './page.module.css'

export default function DashboardPage() {
  const router = useRouter();
  const [userdata, setUser] = useState(null);
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    const token = cookieStore.get("better-auth.session_token")//localStorage.getItem("token");cookieStore.get("next")
    if (!token) {
      setMsg("Not logged in");
      router.push("/login");
      return;
    }

    const fetchUser =  () => {
      try {
        const { data: session, isPending, error, refetch } =  authClient.useSession()

        if (!error) {
          setUser(session);
        } else {
          setMsg(data.message || "Failed to fetch user");
        }
      } catch (err) {
        //setMsg("Something went wrong");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("better-auth.session_token");
    toast.success("Logout successful!", {
      position: "top-center",
      autoClose: 1500,
    });
    authClient.signOut({
      fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
    },
  }}
    )

  }

  if (!userdata) {
    return (
      <div className= {styles.centeredContainer}>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user.name || user.email || "User"}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

