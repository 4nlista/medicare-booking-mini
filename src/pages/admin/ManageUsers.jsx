import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ManageUsersService from "../../services/admin/ManageUsersService";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Load users khi mở trang
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await ManageUsersService.getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Xóa user
  const handleDelete = async (id) => {
    const success = await ManageUsersService.deleteUser(id);
    if (success) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="manage-users-container">
        {/* Header */}
        <div className="manage-users-header">
          <h1>Quản lí tài khoản</h1>
          <button
            className="add-user-btn"
            onClick={() => alert("Thêm chưa làm")}
          >
            + Thêm mới
          </button>
        </div>

        {/* Table */}
        <table className="manage-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => alert("Sửa chưa làm")}
                    >
                      Sửa
                    </button>
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
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
