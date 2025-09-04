import database from "../../database.json";

// Lấy danh sách users
const getUsers = async () => {
  try {
    return database.users;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};

// Thêm user
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

// Cập nhật user (thay đổi trạng thái hoặc vai trò)
const updateUser = async (id, updatedUser) => {
  try {
    const index = database.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      database.users[index] = { ...database.users[index], ...updatedUser };
      return { success: true, user: database.users[index] };
    }
    return { success: false, message: "Không tìm thấy tài khoản" };
  } catch (error) {
    console.error("Error updating user", error);
    return { success: false, message: "Cập nhật thất bại" };
  }
};

// Xóa user
const deleteUser = async (id) => {
  try {
    const index = database.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      const deletedUser = database.users.splice(index, 1); // Xóa user khỏi mảng
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

// Cập nhật trạng thái Active/Inactive
const updateStatus = async (id, status) => {
  try {
    const newStatus = status === "active" ? "inactive" : "active";
    return await updateUser(id, { status: newStatus });
  } catch (error) {
    console.error("Error updating status", error);
    return { success: false, message: "Không thể cập nhật trạng thái" };
  }
};

// Gom tất cả vào một object để export
const ManageUsersService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  filterUsersByRole,
  paginateUsers,
  totalPages,
  updateStatus,
};

export default ManageUsersService;
