import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/medicare-logo-01.svg";
import {
  FaTachometerAlt,
  FaUserMd,
  FaUsers,
  FaCog,
  MdMedicalServices,
  FaChartBar,
  FaBars,
  FaUserTie,
} from "../../assets/icons/Icon";
import { AiOutlineLogout } from "react-icons/ai";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button (chỉ hiện ở mobile) */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        <FaBars />
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <img src={logo} alt="Medicare Logo" />
        </div>

        {/* Menu */}
        <nav className="sidebar-menu">
          <NavLink to="/admin/dashboard_admin" className="sidebar-link">
            <FaTachometerAlt />
            <span>Quản trị</span>
          </NavLink>

          <NavLink to="/admin/doctors" className="sidebar-link">
            <FaUserMd />
            <span>Quản lí bác sĩ</span>
          </NavLink>

          <NavLink to="/admin/services" className="sidebar-link">
            <MdMedicalServices />
            <span>Quản lí dịch vụ</span>
          </NavLink>

          <NavLink to="/admin/staffs" className="sidebar-link">
            <FaUserTie />
            <span>Quản lí nhân viên</span>
          </NavLink>

          <NavLink to="/admin/users" className="sidebar-link">
            <FaUsers />
            <span>Quản lí tài khoản</span>
          </NavLink>

          <NavLink to="/admin/reports" className="sidebar-link">
            <FaChartBar />
            <span>Thống kê</span>
          </NavLink>

          <NavLink to="/admin/setting" className="sidebar-link">
            <FaCog />
            <span>Cài đặt</span>
          </NavLink>

          <NavLink to="/" className="sidebar-link logout">
            <AiOutlineLogout />
            <span>Đăng xuất</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
