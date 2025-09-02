// routes.js

export const AUTH_ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  VERIFY_EMAIL: "/verify-email",
};

export const ADMIN_ROUTES = {
  DASHBOARD_ADMIN: "/admin/dashboard_admin",
  PROFILE: "/admin/profile",
  MANAGE_USERS: "/admin/users",
  MANAGE_DOCTORS: "/admin/doctors",
  MANAGE_STAFFS: "/admin/staffs",
  MANAGE_SERVICES: "/admin/services",
  REPORT: "/admin/reports",
  SETTING: "admin/setting",
};

export const DOCTOR_ROUTES = {
  HOME: "/doctor/home_doctor",
  PROFILE_DOCTOR: "/doctor/profile_doctor",
  PATIENT: "/doctor/patients",
};

export const STAFF_ROUTES = {
  DASHBOARD_STAFF: "/staff/dashboard_staff",
  PROFILE_STAFF: "/staff/profile_staff",
  SCHEDULE: "/staff/schedule",
};

export const CUSTOMER_ROUTES = {
  HOME: "/customer/home_customer",
  PROFILE_CUSTOMER: "/customer/profile_customer",
  BOOK_APPOINTMENT: "/customer/book",
};
