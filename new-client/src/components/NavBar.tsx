import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);

  // if (!token) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-semibold">Welcome, {user?.firstName || "User"}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </nav>
  );
}
