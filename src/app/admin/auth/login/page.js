"use client"

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function AdminLoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await signIn("credentials", {
        identifier: data.email,
        password: data.password,
        role: "admin",
        redirect: false,
      })

      if (res?.ok) {
        toast.success("Logged in successfully")
        router.push("/admin/dashboard")
      } else {
        toast.error("Invalid email or password")
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow border-0 p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              {...register("email")}
            />

            {errors.email && (
              <small className="text-danger">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              {...register("password")}
            />

            {errors.password && (
              <small className="text-danger">
                {errors.password.message}
              </small>
            )}
          </div>

          <button
            className="btn btn-dark w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}