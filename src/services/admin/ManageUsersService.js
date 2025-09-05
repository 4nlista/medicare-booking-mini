import database from "../../database.json";

// Lấy danh sách người dùng
const getUsers = async () => {
  try {
    return database.users.map((user) => {
      const savedStatus = localStorage.getItem(`user_${user.id}_status`);
      const savedRole = localStorage.getItem(`user_${user.id}_role`);

      return {
        ...user,
        status: savedStatus || user.status || "inactive",
        role: savedRole || user.role,
      };
    });
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};

// Thêm người dùng
const addUser = async (newUser) => {
  try {
    const id = String(database.users.length + 1); // Tạo id cho người dùng mới
    const user = { id, ...newUser };
    database.users.push(user); // Thêm user vào mảng
    return { success: true, user };
  } catch (error) {
    console.error("Error adding user", error);
    return { success: false, message: "Không thêm được tài khoản" };
  }
};

// Cập nhật vai trò người dùng (bảo vệ admin không thể thay đổi vai trò)
const updateUser = async (id, updatedUser) => {
  try {
    const index = database.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      // Không cho phép admin thay đổi role
      if (
        updatedUser.role === "admin" &&
        database.users[index].role !== "admin"
      ) {
        return {
          success: false,
          message: "Không thể thay đổi vai trò của admin",
        };
      }

      database.users[index] = { ...database.users[index], ...updatedUser };
      // ✅ Lưu role vào localStorage nếu có cập nhật
      if (updatedUser.role) {
        localStorage.setItem(`user_${id}_role`, updatedUser.role);
      }
      return { success: true, user: database.users[index] };
    }
    return { success: false, message: "Không tìm thấy tài khoản" };
  } catch (error) {
    console.error("Error updating user", error);
    return { success: false, message: "Cập nhật thất bại" };
  }
};

// Xóa người dùng
const deleteUser = async (id) => {
  try {
    const index = database.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      const deletedUser = database.users.splice(index, 1);

      // ✅ Xóa localStorage khi xóa user
      localStorage.removeItem(`user_${id}_status`);
      localStorage.removeItem(`user_${id}_role`);

      return { success: true, user: deletedUser[0] };
    }
    return { success: false, message: "Không tìm thấy tài khoản" };
  } catch (error) {
    console.error("Error deleting user", error);
    return { success: false, message: "Xóa thất bại" };
  }
};

// Lọc người dùng theo role
const filterUsersByRole = (users, role) => {
  if (role === "all") return users;
  return users.filter((user) => user.role === role);
};

// Lọc người dùng theo tên hoặc email
const filterUsersBySearch = (users, searchQuery) => {
  if (!searchQuery) return users;
  return users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

// Phân trang người dùng
const paginateUsers = (users, currentPage, usersPerPage) => {
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  return users.slice(indexOfFirstUser, indexOfLastUser);
};

// Tổng số trang
const totalPages = (users, usersPerPage) => {
  return Math.ceil(users.length / usersPerPage);
};

// Cập nhật trạng thái Active/Inactive và lưu vào localStorage
const updateStatus = async (id, status) => {
  try {
    const newStatus = status === "active" ? "inactive" : "active";
    localStorage.setItem(`user_${id}_status`, newStatus); // Lưu vào localStorage
    return await updateUser(id, { status: newStatus });
  } catch (error) {
    console.error("Error updating status", error);
    return { success: false, message: "Không thể cập nhật trạng thái" };
  }
};

// Kiểm tra tính hợp lệ của người dùng (username, email, password)
const validateNewUser = (newUser) => {
  if (!newUser.username || !newUser.password || !newUser.email) {
    return { isValid: false, message: "Tất cả các trường đều phải được điền." };
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(newUser.email)) {
    return { isValid: false, message: "Email không hợp lệ." };
  }

  return { isValid: true };
};

// Lưu trạng thái người dùng vào localStorage
const saveStatusToLocalStorage = (id, status) => {
  localStorage.setItem(`user_${id}_status`, status);
};

const ManageUsersService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  filterUsersByRole,
  filterUsersBySearch,
  paginateUsers,
  totalPages,
  updateStatus,
  validateNewUser,
  saveStatusToLocalStorage,
};

export default ManageUsersService;
