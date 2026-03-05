import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as auth from "../../services/authServices";
import {jwtDecode} from "jwt-decode";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hàm login
  const handleLogin = async () => {
    try {

      const loginDto = {
        username: email,
        password: password
      };

      const kq = await auth.login(loginDto);
      console.log(kq);
      if (kq.data.sucess) {
        console.log("ooefdfasdfa");
        localStorage.setItem("accessToken", kq.data.accessToken);
        localStorage.setItem("refreshToken", kq.data.refreshToken);
        const accessToken = kq.data.accessToken;
          
        if (!accessToken) return null;
        const decoded = jwtDecode(accessToken);
        console.log(decoded);  
        if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
          localStorage.clear();
          return null;
        }
    
        const role =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        
        localStorage.setItem("role", role);
        
        if (role=="Admin") navigate("/dashboard");
        else {
          navigate("/infor");
        }
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

      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 to-white">

       <img
          src="/images/a.jpg"
          alt="login"
          className="w-full h-full object-cover"
        />

      </div>


      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">

        <div className="
          w-full
          max-w-md
          
          
         
          
          p-10
        ">

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