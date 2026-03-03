import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as auth from "../../services/authServices";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hàm login
  const handleLogin = async () => {
    try {

      const loginDto = {
        email: email,
        password: password
      };

      const kq = await auth.login(loginDto);
      console.log(kq);
      if (kq.data.sucess) {
        navigate("/dashboard");
      }
      else {
        alert("Kiểm tra lại mật khẩu và tên đăng nhập");
      }

    } catch (err) {
      console.log("Login error:", err);
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 to-white">

        <img
          src="/cube.png"
          alt="login"
          className="w-[65%] object-contain drop-shadow-lg"
        />

      </div>


      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">

        <div className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-xl
          border border-slate-200
          p-10
        ">

          {/* TITLE */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold text-blue-900">
              Welcome to
            </h1>

            <h2 className="text-3xl font-bold text-blue-600">
              VCertificate
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Sign in to manage your certificates
            </p>

          </div>


          {/* EMAIL */}
          <label className="text-sm font-medium text-slate-600">
            Email
          </label>

          <div className="
            flex items-center
            border border-slate-200
            rounded-xl
            px-4 py-3
            mt-2 mb-5
            bg-white
            focus-within:border-blue-500
            focus-within:ring-2
            focus-within:ring-blue-100
            transition
          ">

            <Mail size={18} className="text-slate-400" />

            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="
              bg-transparent
              outline-none
              ml-3
              w-full
              text-sm"
            />

          </div>


          {/* PASSWORD */}
          <label className="text-sm font-medium text-slate-600">
            Password
          </label>

          <div className="
            flex items-center
            border border-slate-200
            rounded-xl
            px-4 py-3
            mt-2 mb-6
            bg-white
            focus-within:border-blue-500
            focus-within:ring-2
            focus-within:ring-blue-100
            transition
          ">

            <Lock size={18} className="text-slate-400" />

            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="
              bg-transparent
              outline-none
              ml-3
              w-full
              text-sm"
            />

          </div>


          {/* LOGIN */}
          <button
            onClick={handleLogin}
            className="
            w-full
            py-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            rounded-xl
            transition
            shadow-md
            active:scale-[0.98]
            "
          >
            Login
          </button>


          {/* OR */}
          <div className="text-center text-slate-400 my-6 text-sm">
            ───────── Or ─────────
          </div>


          {/* GUEST */}
          <button
            className="
            w-full
            py-3
            border border-slate-200
            rounded-xl
            font-semibold
            text-slate-600
            hover:bg-slate-50
            transition
            "
            onClick={() => navigate("/guest")}
          >
            Continue as Guest
          </button>

        </div>

      </div>

    </div>
  );
}