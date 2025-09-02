"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchData } from "@/_lib/api";
import { authClient } from "@/_lib/betterauth/client-auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await authClient.signIn.email(formData, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
          //localStorage.setItem("token", data.token);
          toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1500,
        });
        window.location.href = "/dashboard";
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
              toast.error(ctx.error.message || "Incorrect email or password", {
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don't have an account?{" "}
        <Link
          href="/signup"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}
