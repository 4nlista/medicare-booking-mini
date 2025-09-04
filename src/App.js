import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import các page auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgetPassword from "./pages/auth/ForgetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Import admin.jsx
import DASHBOARD_ADMIN from "./pages/admin/Dashboard";
import MANAGE_DOCTORS from "./pages/admin/ManageDoctor";
import MANAGE_SERVICES from "./pages/admin/ManageServices";
import MANAGE_STAFFS from "./pages/admin/ManageStaff";
import MANAGE_USERS from "./pages/admin/ManageUsers";
import SETTING from "./pages/admin/Setting";
import REPORT from "./pages/admin/Reports";

// Import doctor.jsx
import HOME from "./pages/doctor/Home";
import HISTORY from "./pages/doctor/History";
import PATIENT from "./pages/doctor/Patient";
import PROFILE_DOCTOR from "./pages/doctor/Profile";
import SCHEDULE from "./pages/doctor/Schedule";

// Import staff.jsx
import DASHBOARD_STAFF from "./pages/staff/Dashboard";
import HISTORY_APPOINTMENTS from "./pages/staff/HistoryAppointments";
import HISTORY_PAYMENT from "./pages/staff/HistoryPayment";
import LIST_CUSTOMERS from "./pages/staff/ListCustomers";
import LIST_DOCTORS from "./pages/staff/ListDoctors";
import MANAGE_APPOINTMENTS from "./pages/staff/ManageAppointments";
import PROFILE_STAFF from "./pages/staff/Profile";
import SUPPORT from "./pages/staff/Support";

// Import customer.jsx
import HOME_CUSTOMER from "./pages/customer/Home"; // Chưa có nhưng ví dụ

// Import định tuyến
import {
  AUTH_ROUTES,
  ADMIN_ROUTES,
  CUSTOMER_ROUTES,
  DOCTOR_ROUTES,
  STAFF_ROUTES,
} from "./routes/routes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path={AUTH_ROUTES.LOGIN} element={<Login />} />
        <Route path={AUTH_ROUTES.REGISTER} element={<Register />} />
        <Route
          path={AUTH_ROUTES.CHANGE_PASSWORD}
          element={<ChangePassword />}
        />
        <Route
          path={AUTH_ROUTES.FORGET_PASSWORD}
          element={<ForgetPassword />}
        />
        <Route path={AUTH_ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />

        {/* Admin routes */}
        <Route
          path={ADMIN_ROUTES.DASHBOARD_ADMIN}
          element={<DASHBOARD_ADMIN />}
        />
        <Route
          path={ADMIN_ROUTES.MANAGE_DOCTORS}
          element={<MANAGE_DOCTORS />}
        />
        <Route
          path={ADMIN_ROUTES.MANAGE_SERVICES}
          element={<MANAGE_SERVICES />}
        />
        <Route path={ADMIN_ROUTES.MANAGE_STAFFS} element={<MANAGE_STAFFS />} />
        <Route path={ADMIN_ROUTES.MANAGE_USERS} element={<MANAGE_USERS />} />
        <Route path={ADMIN_ROUTES.REPORT} element={<REPORT />} />
        <Route path={ADMIN_ROUTES.SETTING} element={<SETTING />} />

        {/* Doctor routes */}
        <Route path={DOCTOR_ROUTES.HOME} element={<HOME />} />
        <Route path={DOCTOR_ROUTES.HISTORY} element={<HISTORY />} />
        <Route
          path={DOCTOR_ROUTES.PROFILE_DOCTOR}
          element={<PROFILE_DOCTOR />}
        />
        <Route path={DOCTOR_ROUTES.PATIENT} element={<PATIENT />} />
        <Route path={DOCTOR_ROUTES.SCHEDULE} element={<SCHEDULE />} />

        {/* Staff routes */}
        <Route
          path={STAFF_ROUTES.DASHBOARD_STAFF}
          element={<DASHBOARD_STAFF />}
        />
        <Route
          path={STAFF_ROUTES.HISTORY_APPOINTMENTS}
          element={<HISTORY_APPOINTMENTS />}
        />
        <Route
          path={STAFF_ROUTES.HISTORY_PAYMENT}
          element={<HISTORY_PAYMENT />}
        />
        <Route
          path={STAFF_ROUTES.LIST_CUSTOMERS}
          element={<LIST_CUSTOMERS />}
        />
        <Route path={STAFF_ROUTES.LIST_DOCTORS} element={<LIST_DOCTORS />} />
        <Route
          path={STAFF_ROUTES.MANAGE_APPOINTMENTS}
          element={<MANAGE_APPOINTMENTS />}
        />
        <Route path={STAFF_ROUTES.PROFILE_STAFF} element={<PROFILE_STAFF />} />
        <Route path={STAFF_ROUTES.SUPPORT} element={<SUPPORT />} />

        {/* Customer routes */}
        <Route path={CUSTOMER_ROUTES.HOME} element={<HOME_CUSTOMER />} />
      </Routes>
    </Router>
  );
}

export default App;
