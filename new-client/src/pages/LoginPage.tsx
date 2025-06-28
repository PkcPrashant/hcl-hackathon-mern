import React, { useState, JSX } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../features/store";
import { setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  emailAddress: string;
  password: string;
}

export default function LoginPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: { emailAddress: "", password: "" },
    validationSchema: Yup.object({
      emailAddress: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, setTouched }) => {
      setTouched({ emailAddress: true, password: true }, false);
      try {
        const res = await fetch("http://localhost:8080/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
       console.log(res,"response for the login")
        const data = await res.json();
    
        if (!res.ok) throw new Error(data.message || "Login failed");
    
        dispatch(setUser({ user: data.user, token: data.token }));
        navigate("/order-page");
      } catch (err: any) {
        setErrors({ password: err.message });
      } finally {
        setSubmitting(false);
      }
    }
    
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
              Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("emailAddress")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your emailAddress"
            />
            {formik.touched.emailAddress && formik.errors.emailAddress && (
              <div className="text-red-500 text-sm">
                {formik.errors.emailAddress}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
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
