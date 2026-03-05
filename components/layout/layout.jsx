import React from "react";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";

const Layout = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = token;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {isLoggedIn && <Sidebar />}

      <div
        className={`flex-1 transition-all duration-300 ${
          isLoggedIn ? "ml-64" : "ml-0"
        }`}
      >
        <Header />

        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;