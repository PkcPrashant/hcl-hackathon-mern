import React, { JSX } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../features/store";
import { setUser } from "../features/authSlice";

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<LoginFormValues>({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Login failed");

        dispatch(setUser(data.user));
      } catch (err: any) {
        setErrors({ password: err.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...formik.getFieldProps("username")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-start items-start
          ">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
