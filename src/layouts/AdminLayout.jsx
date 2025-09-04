import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content">
        {/* Topbar */}
        <Topbar />

        {/* Nội dung trang */}
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
