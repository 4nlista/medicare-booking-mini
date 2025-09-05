import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ManageUsersService from "../../services/admin/ManageUsersService";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "customer",
  });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // State cho modal xác nhận xóa
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Lưu user muốn xóa

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await ManageUsersService.getUsers();
      const updatedUsers = data.map((user) => {
        const savedStatus = localStorage.getItem(`user_${user.id}_status`);
        return savedStatus ? { ...user, status: savedStatus } : user;
      });
      setUsers(updatedUsers);
    };
    fetchUsers();
  }, []);

  // Xử lý xóa người dùng
  const handleDeleteClick = (id) => {
    setUserToDelete(id); // Lưu user cần xóa
    setShowConfirmDelete(true); // Hiển thị modal xác nhận
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      const result = await ManageUsersService.deleteUser(userToDelete);
      if (result.success) {
        setUsers(users.filter((u) => u.id !== userToDelete));
      } else {
        alert(result.message);
      }
    }
    setShowConfirmDelete(false); // Ẩn modal xác nhận
    setUserToDelete(null); // Xóa user cần xóa
  };

  const handleDeleteCancel = () => {
    setShowConfirmDelete(false); // Đóng modal
    setUserToDelete(null); // Hủy xóa
  };

  // Kiểm tra tính hợp lệ khi thêm người dùng mới
  const validateNewUser = () => {
    if (!newUser.username || !newUser.password || !newUser.email) {
      setError("Tất cả các trường đều phải được điền.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newUser.email)) {
      setError("Email không hợp lệ.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleAddUser = async () => {
    if (!validateNewUser()) return;

    const result = await ManageUsersService.addUser(newUser);
    if (result.success) {
      setUsers([...users, result.user]);
      setNewUser({ username: "", password: "", email: "", role: "customer" });
      setIsAddingUser(false);
    } else {
      alert(result.message);
    }
  };

  const handleRoleChange = async (id, role) => {
    if (role === "admin") {
      alert("Không thể thay đổi vai trò của admin.");
      return;
    }

    const result = await ManageUsersService.updateUser(id, { role });
    if (result.success) {
      setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
    } else {
      alert(result.message);
    }
  };

  const handleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = ManageUsersService.filterUsersByRole(users, roleFilter);
  const searchedUsers = ManageUsersService.filterUsersBySearch(
    filteredUsers,
    searchQuery
  );
  const currentUsers = ManageUsersService.paginateUsers(
    searchedUsers,
    currentPage,
    usersPerPage
  );

  const totalPages = ManageUsersService.totalPages(searchedUsers, usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = async (id, status) => {
    const user = users.find((user) => user.id === id);

    if (user.role === "admin") {
      alert("Không thể thay đổi trạng thái của tài khoản admin.");
      return;
    }

    const newStatus = status === "active" ? "inactive" : "active";

    ManageUsersService.saveStatusToLocalStorage(id, newStatus);

    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <AdminLayout>
      <div className="manage-users-container">
        <div className="manage-users-header">
          <h1>Quản lý tài khoản</h1>
          <button
            className="add-user-btn"
            onClick={() => setIsAddingUser(true)}
          >
            + Thêm mới
          </button>
        </div>

        <div className="filter-search-container">
          <div className="filter-container">
            <label>Lọc theo role:</label>
            <select value={roleFilter} onChange={handleFilterChange}>
              <option value="all">Tất cả</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="search-container">
            <label>Tìm kiếm:</label>
            <input
              type="text"
              placeholder="Tìm theo tên hoặc email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Modal thêm người dùng */}
        {isAddingUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Thêm người dùng mới</h3>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Nhập username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Nhập password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="form-actions">
                <button className="btn btn-add" onClick={handleAddUser}>
                  Thêm
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={() => setIsAddingUser(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="manage-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={user.role === "admin"}
                  >
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
                <td>
                  <div
                    className={`status-toggle ${
                      user.status === "active" ? "online" : "offline"
                    }`}
                  >
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.status === "active"}
                        onChange={() =>
                          handleStatusChange(user.id, user.status)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                    <span>
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteClick(user.id)}
                      disabled={user.role === "admin"}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>

        {/* Modal xác nhận xóa */}
        {showConfirmDelete && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Bạn có chắc chắn muốn xóa người dùng này không?</h3>
              <div className="form-actions">
                <button
                  className="btn btn-delete"
                  onClick={handleDeleteConfirm}
                >
                  Có
                </button>
                <button className="btn btn-cancel" onClick={handleDeleteCancel}>
                  Không
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
