import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const CustomLink = ({
  to,
  children,
  className = "",
  activeClass = "active",
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? activeClass : ""}`.trim()}
    >
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  activeClass: PropTypes.string,
};

export default CustomLink;
