// src/components/PrivateRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../features/store";
import { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) return <Navigate to="/" replace />;
  return children;
}
