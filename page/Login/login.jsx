// src/login/Login.jsx
import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="bg-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <div className="login-card">
        <h1 className="title">SIGN IN</h1>
        <p className="subtitle">
          Hệ thống Quản lý Văn bằng & Chứng chỉ<br />
          dựa trên công nghệ Blockchain
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" placeholder="Tên đăng nhập hoặc Email" required autoFocus />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Mật khẩu" required />
          </div>

          <a href="#" className="forgot">Quên mật khẩu?</a>

          <button type="submit" className="login-btn">
            Đăng nhập hệ thống
          </button>
        </form>

        <p className="footer">
          Đảm bảo bảo mật • minh bạch • bất biến<br />
          bằng công nghệ Blockchain hiện đại
        </p>
      </div>
    </div>
  );
};

export default Login;