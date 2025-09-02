// src/services/auth/RegisterService.js

export const registerUser = async (username, email, password) => {
  try {
    // Lấy danh sách người dùng từ API (json-server)
    const response = await fetch("http://localhost:9999/users");
    const users = await response.json();

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingEmail = users.find((user) => user.email === email);
    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
    const existingUsername = users.find((user) => user.username === username);

    if (existingEmail) {
      return { success: false, message: "Email đã tồn tại!" };
    }
    if (existingUsername) {
      return { success: false, message: "Username đã tồn tại!" };
    }

    // Tìm ID cao nhất trong danh sách người dùng (ép kiểu sang số để tránh cộng chuỗi)
    const lastUserId = users.reduce((maxId, user) => {
      // Đảm bảo ID là số, tránh việc cộng chuỗi
      const userId = parseInt(user.id, 10); // Ép kiểu ID thành số
      return userId > maxId ? userId : maxId; // Lấy ID lớn nhất
    }, 0);

    // Tạo ID mới bằng cách tăng ID cao nhất lên 1
    const newUserId = lastUserId + 1;

    // Tạo thông tin người dùng mới
    const newUser = {
      id: newUserId, // ID tăng dần
      username,
      email,
      password,
      role: "customer", // Role là customer cho đăng ký
    };

    // Gửi request POST để thêm người dùng vào db.json
    const res = await fetch("http://localhost:9999/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    // Nếu thêm thành công, return kết quả
    return {
      success: true,
      message: "Đăng ký thành công!",
      redirectPath: "/customer/dashboard",
    };
  } catch (error) {
    console.error("Register error", error);
    return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại!" };
  }
};
