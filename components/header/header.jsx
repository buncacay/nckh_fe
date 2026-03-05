import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = token;
  console.log("sao kh dfasdfads v");
  let name = "";

  if (token) {
    console.log(token);
    try {
      const decoded = jwtDecode(token);
      name =
        decoded.name ||
        decoded.unique_name ||
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      console.log(name);
    } catch {
      localStorage.clear();
      navigate("/login");
    }
  }

  return (
    <header
      className={`fixed top-0 right-0 h-16 flex items-center justify-between px-8 bg-white border-b shadow-sm z-10 ${
        isLoggedIn ? "left-64" : "left-0"
      }`}
    >
      <span className="text-gray-500 text-sm font-medium">
        Dashboard
      </span>

      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Bell size={20} className="text-gray-500" />

          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/150"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-semibold text-gray-700">
              {name || "User"}
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
        >
          Đăng nhập
        </button>
      )}
    </header>
  );
};

export default Header;