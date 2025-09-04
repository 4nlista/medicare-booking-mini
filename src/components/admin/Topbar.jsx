import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      {/* Bên trái */}
      <div className="topbar-left">Dashboard</div>

      {/* Bên phải */}
      <div className="topbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
        <FaBell className="icon" /> {/*logo */}
        <FaUserCircle className="icon user-icon" /> {/*profile*/}
      </div>
    </header>
  );
}
