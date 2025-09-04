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

  // Load users khi mở trang
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await ManageUsersService.getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Thêm người dùng mới
  const handleAddUser = async () => {
    const result = await ManageUsersService.addUser(newUser);
    if (result.success) {
      setUsers([...users, result.user]);
      setNewUser({ username: "", password: "", email: "", role: "customer" });
      setIsAddingUser(false);
    } else {
      alert(result.message);
    }
  };

  // Cập nhật vai trò người dùng
  const handleRoleChange = async (id, role) => {
    const result = await ManageUsersService.updateUser(id, { role });
    if (result.success) {
      setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
    } else {
      alert(result.message);
    }
  };

  // Xóa người dùng
  const handleDelete = async (id) => {
    const result = await ManageUsersService.deleteUser(id);
    if (result.success) {
      setUsers(users.filter((u) => u.id !== id));
    } else {
      alert(result.message);
    }
  };

  // Lọc theo role
  const handleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  // Phân trang
  const filteredUsers = ManageUsersService.filterUsersByRole(users, roleFilter);
  const currentUsers = ManageUsersService.paginateUsers(
    filteredUsers,
    currentPage,
    usersPerPage
  );
  const totalPages = ManageUsersService.totalPages(filteredUsers, usersPerPage);

  // Thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Thay đổi trạng thái active/inactive
  const handleStatusChange = async (id, status) => {
    const result = await ManageUsersService.updateStatus(id, status);
    if (result.success) {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: result.user.status } : user
        )
      );
    } else {
      alert(result.message);
    }
  };

  return (
    <AdminLayout>
      <div className="manage-users-container">
        {/* Header */}
        <div className="manage-users-header">
          <h1>Quản lý tài khoản</h1>
          <button
            className="add-user-btn"
            onClick={() => setIsAddingUser(true)} // Show form when clicked
          >
            + Thêm mới
          </button>
        </div>

        {/* Lọc theo role */}
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

        {/* Form thêm người dùng (modal nhỏ) */}
        {isAddingUser && (
          <div className="add-user-form-overlay">
            <div className="add-user-form">
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

        {/* Table */}
        <table className="manage-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
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
                  >
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
                <td>
                  <div className="status-toggle">
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
                      onClick={() => handleDelete(user.id)}
                      disabled={user.role === "admin"} // ngăn xóa admin
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
