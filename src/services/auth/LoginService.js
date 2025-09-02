// src/services/auth/LoginService.js
import database from "../../database.json"; // Import dữ liệu người dùng giả lập từ file JSON

// Hàm xử lý đăng nhập
export const loginUser = (email, password) => {
  try {
    // Kiểm tra người dùng trong database.json (mô phỏng cơ sở dữ liệu)
    const user = database.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Mô phỏng token và phân quyền
      const token = "fake-jwt-token";

      // Lưu thông tin user vào localStorage (bao gồm role, username và id)
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username); // Lưu username
      localStorage.setItem("id", user.id); // Lưu id của người dùng

      // Điều hướng dựa trên vai trò (role) của người dùng
      let redirectPath = "/";
      switch (user.role) {
        case "admin":
          redirectPath = "/admin/dashboard_admin";
          break;
        case "doctor":
          redirectPath = "/doctor/home_doctor";
          break;
        case "staff":
          redirectPath = "/staff/dashboard_staff";
          break;
        case "customer":
          redirectPath = "/customer/home_customer";
          break;
        default:
          redirectPath = "/";
          break;
      }

      return { success: true, redirectPath };
    } else {
      return { success: false, message: "Sai email hoặc mật khẩu" };
    }
  } catch (error) {
    console.error("Login error", error);
    return {
      success: false,
      message: "Có lỗi xảy ra. Vui lòng thực hiện lại!",
    };
  }
};
