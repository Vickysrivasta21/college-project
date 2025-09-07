"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchData } from "@/_lib/api";
import { authClient } from "@/_lib/betterauth/client-auth";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await authClient.signUp.email(formData, {
              onRequest: (ctx) => {
                  //show loading
              },
              onSuccess: (ctx) => {
                //localStorage.setItem("token", data.token);
                toast.success("SignUp successful!", {
                position: "top-center",
                autoClose: 1500,
              });
              //window.location.href = "/dashboard";
                  //redirect to the dashboard or sign in page
              },
              onError: (ctx) => {
                  // display the error message
                    toast.error(ctx.error.message || "SignUp Failed.", {
                  position: "top-center",
               });
                  //alert(ctx.error.message);
              },
      });
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="auth-page" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
          Login
        </Link>
      </p>
    </div>
  );
}
