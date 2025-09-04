import React from "react";
import logo from "../../assets/images/medicare-logo-01.svg";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Logo + description */}
        <div className="footer-col">
          <Link to="/">
            <img src={logo} alt="Medicare Logo" className="footer-logo" />
          </Link>

          <p>
            Nền tảng đặt lịch y tế trực tuyến, kết nối bệnh nhân và bác sĩ một
            cách nhanh chóng và tiện lợi.
          </p>
          <div className="footer-socials">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Department */}
        <div className="footer-col">
          <h4>Dịch vụ</h4>
          <ul>
            <li>Surgery</li>
            <li>Women’s Health</li>
            <li>Radiology</li>
            <li>Cardiology</li>
            <li>General Medicine</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Hỗ trợ khách hàng</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
            <li>Customer Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <p>
            Email: <strong>support@medicare.com</strong>
          </p>
          <p>Thứ 2 - Thứ 6: 08:30 - 18:00</p>
          <p>
            Hotline: <strong>+84 123 456 789</strong>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom container ">
        <p className="text-center">
          © {year} Medicare Booking. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
