import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/medicare-logo-01.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <Link to="/">
          <img src={logo} alt="Medical Booking" />
        </Link>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          style={{ marginLeft: "auto", display: "none" }}
          className="hamburger-btn"
        >
          ☰
        </button>

        {/* Nav links */}
        <nav className="nav-links">
          <NavLink to="/" end>
            {({ isActive }) => <span>Trang chủ</span>}
          </NavLink>
          <NavLink to="/customer/booking">
            {({ isActive }) => <span>Đặt lịch</span>}
          </NavLink>
          <Link to="/">
            <button className="secondary">Đăng nhập</button>
          </Link>
        </nav>
      </div>

      {/* Responsive (ẩn/hiện khi cần) - có thể nâng sau */}
      {open && (
        <div>
          <div>
            <NavLink to="/" onClick={() => setOpen(false)}>
              Trang chủ
            </NavLink>
            <NavLink to="/customer/booking" onClick={() => setOpen(false)}>
              Đặt lịch
            </NavLink>
            <Link to="/login" onClick={() => setOpen(false)}>
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
