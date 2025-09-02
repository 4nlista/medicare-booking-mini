// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../../services/auth/RegisterService"; // Import service đăng ký
import { useNavigate } from "react-router-dom"; // Dùng useNavigate để điều hướng
import { AUTH_ROUTES } from "../../routes/routes";
import CustomLink from "../../routes/CustomLink";
import {
  showSuccessToast,
  showErrorToast,
  ToastNotificationContainer,
} from "../../utils/Toast"; // Import các hàm Toast
import "./Register.css"; // Import CSS cho Register

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form

    const result = await registerUser(username, email, password); // Gọi service đăng ký

    if (result.success) {
      showSuccessToast(result.message); // Hiển thị thông báo thành công
      setTimeout(() => {
        navigate(AUTH_ROUTES.LOGIN); // Điều hướng về trang đăng nhập
      }, 1500); // Điều hướng sau 1,5 giây
    } else {
      showErrorToast(result.message); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Đăng ký tài khoản</h2>

        {/* Nhập tên người dùng */}
        <div className="form-group">
          <label>Tên người dùng</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên người dùng"
            required
          />
        </div>

        {/* Nhập email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            required
          />
        </div>

        {/* Nhập mật khẩu */}
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
            minLength="3" // Đảm bảo mật khẩu có ít nhất 6 ký tự
          />
        </div>

        {/* Nút đăng ký */}
        <button className="register-button" type="submit">
          Đăng ký
        </button>

        {/* Link quay lại đăng nhập */}
        <p className="login-link">
          Đã có tài khoản?{" "}
          <CustomLink to={AUTH_ROUTES.LOGIN}>Đăng nhập</CustomLink>
        </p>
      </form>

      {/* Thêm ToastContainer để hiển thị Toastify */}
      <ToastNotificationContainer />
    </div>
  );
};

export default Register;
