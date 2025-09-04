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
    const id = String(database.users.length + 1);
    const user = { id, ...newUser };
    database.users.push(user);
    return { success: true, user };
  } catch (error) {
    console.error("Error adding user", error);
    return { success: false, message: "Không thêm được tài khoản" };
  }
};

// Cập nhật user
const updateUser = async (id, updatedUser) => {
  try {
    const index = database.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      if (
        database.users[index].role === "admin" &&
        updatedUser.role !== "admin"
      ) {
        return {
          success: false,
          message: "Không được thay đổi role của admin",
        };
      }
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
      if (database.users[index].role === "admin") {
        return { success: false, message: "Không thể xóa tài khoản admin" };
      }
      const deletedUser = database.users.splice(index, 1);
      return { success: true, user: deletedUser[0] };
    }
    return { success: false, message: "Không tìm thấy tài khoản" };
  } catch (error) {
    console.error("Error deleting user", error);
    return { success: false, message: "Xóa thất bại" };
  }
};

// Gom hết vào 1 object để export
const ManageUsersService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};

export default ManageUsersService;
