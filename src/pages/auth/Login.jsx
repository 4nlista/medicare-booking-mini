// src/pages/auth/Login.jsx
import React, { useState } from "react";
import "./Login.css";
import CustomLink from "../../routes/CustomLink";
import { AUTH_ROUTES } from "../../routes/routes";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate để điều hướng
import { loginUser } from "../../services/auth/LoginService"; // Import LoginService.js

const Login = () => {
  const [email, setEmail] = useState(""); // State để lưu email
  const [password, setPassword] = useState(""); // State để lưu mật khẩu
  const [error, setError] = useState(""); // State để lưu thông báo lỗi
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng sau khi đăng nhập thành công

  // Hàm xử lý khi người dùng nhấn nút đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form (reload trang)

    // Gọi LoginService.js để thực hiện đăng nhập
    const result = loginUser(email, password);

    // Nếu đăng nhập thành công
    if (result.success) {
      navigate(result.redirectPath); // Điều hướng tới trang phù hợp dựa trên vai trò người dùng
    } else {
      setError(result.message); // Nếu có lỗi, hiển thị thông báo lỗi
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>MediCare Login</h2>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật email khi người dùng nhập
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật mật khẩu khi người dùng nhập
          />
        </div>

        <button type="submit" className="login-button">
          Đăng nhập
        </button>

        <p className="register-link">
          Chưa có tài khoản ?{" "}
          <CustomLink to={AUTH_ROUTES.REGISTER}>Đăng ký</CustomLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
