"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchData } from "@/_lib/api";
import { authClient } from "@/_lib/betterauth/client-auth";
import { data } from "react-router-dom";
import styles from "./page.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const [userdata, setUser] = useState(null);
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    const token = cookieStore.get("better-auth.session_token");
    if (!token) {
      setMsg("Not logged in");
      router.push("/login");
      return;
    }

    const fetchUser = () => {
      try {
      
        fetch("/api/auth/get-session")
          .then((res) => res.json())
          .then((data) => {
            setMsg("Failed to fetch user");
            setUser(data);
          });
       
      } catch (err) {
        setMsg("Something went wrong: " + err);
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
          router.push("/"); // redirect to root page.
        },
      },
    });
  };

  if (!userdata) {
    return (
      <div className={styles.centeredContainer}>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          Welcome, {userdata.user.name || userdata.user.email || "User"}
        </h2>
        <p>
          <strong>Email:</strong> {userdata.user.email}
        </p>
        <p>
          <strong>User ID:</strong> {userdata.user.id}
        </p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
