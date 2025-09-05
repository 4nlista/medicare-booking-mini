import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ManageDoctorService from "../../services/admin/ManageDoctorService";
import "./ManageDoctor.css";

const ManageDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      let data = await ManageDoctorService.getDoctors();

      // load từ localStorage nếu có chỉnh sửa
      const savedData = localStorage.getItem("doctors");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        data = data.map((doc) => parsed.find((d) => d.id === doc.id) || doc);
      }
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  // ================= ảnh avatar ================
  const totalAvatars = 3;
  const getAvatarUrl = (id) => {
    const avatarNumber = (id % totalAvatars) + 1;
    return `/images/doctor/doctor${avatarNumber}.jpg`;
  };
  // ============================================

  const filteredDoctors = doctors.filter(
    (d) =>
      d.full_name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const openDetail = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(false);
    setEditedDoctor(doctor);
    setError(null);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsEditMode(false);
    setError(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSave = () => {
    if (!editedDoctor.first_name || !editedDoctor.last_name) {
      setError("First Name và Last Name không được để trống.");
      return;
    }
    if (editedDoctor.email && !validateEmail(editedDoctor.email)) {
      setError("Email không hợp lệ.");
      return;
    }
    setError(null);

    const updated = doctors.map((doc) =>
      doc.id === editedDoctor.id ? editedDoctor : doc
    );
    setDoctors(updated);
    setSelectedDoctor(editedDoctor);
    setEditedDoctor(editedDoctor);
    setIsEditMode(false);

    localStorage.setItem("doctors", JSON.stringify(updated));
  };

  return (
    <AdminLayout>
      <div className="manage-doctor-container">
        <h1>Quản lí bác sĩ</h1>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc chuyên môn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="doctor-search"
        />

        <table className="doctor-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Chuyên môn</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Không tìm thấy bác sĩ
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.full_name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.address}</td>
                  <td>
                    <span
                      className={
                        doctor.status === "active"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => openDetail(doctor)}>Xem</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Modal hiển thị chi tiết */}
        {selectedDoctor && !isEditMode && (
          <div className="modal-overlay">
            <div className="modal-content profile-modal">
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>

              <div className="profile-grid">
                {/* LEFT: Avatar + Basic */}
                <div className="profile-left">
                  <img
                    src={getAvatarUrl(selectedDoctor.id)}
                    alt="Avatar"
                    className="profile-avatar"
                  />
                  <h2>{selectedDoctor.full_name}</h2>
                  <button className="btn btn-success">Cập nhật ảnh</button>
                </div>

                {/* RIGHT: Info sections */}
                <div className="profile-right">
                  <h2>Thông tin cá nhân</h2>
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <th>
                          Họ tên<td>{selectedDoctor.full_name || "-"}</td>
                        </th>
                        <th>
                          Email<td>{selectedDoctor.email || "-"}</td>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          Số điện thoại<td>{selectedDoctor.phone || "-"}</td>
                        </th>

                        <th>
                          Vai trò <td>{selectedDoctor.role || "-"}</td>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          Quốc gia<td>{selectedDoctor.country || "-"}</td>
                        </th>

                        <th>
                          Địa chỉ <td>{selectedDoctor.address || "-"}</td>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          Giới tính<td>{selectedDoctor.gender || "-"}</td>
                        </th>

                        <th>
                          Ngày sinh<td>{selectedDoctor.dob || "-"}</td>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <button className="btn btn-warning">Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal chỉnh sửa */}
        {selectedDoctor && isEditMode && (
          <div className="modal-overlay">
            <div className="modal-content edit-modal">
              <div className="modal-header">
                <h3>Edit Doctor</h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditedDoctor(selectedDoctor);
                    setError(null);
                  }}
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="edit-form"
              >
                <div className="form-grid">
                  <div className="form-row">
                    <label>First Name</label>
                    <input
                      name="first_name"
                      value={editedDoctor.first_name || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Last Name</label>
                    <input
                      name="last_name"
                      value={editedDoctor.last_name || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={editedDoctor.email || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-row">
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={editedDoctor.phone || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-row">
                    <label>Date of Birth</label>
                    <input
                      name="dob"
                      type="date"
                      value={editedDoctor.dob || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-row">
                    <label>User Role</label>
                    <select
                      name="role"
                      value={editedDoctor.role || "doctor"}
                      onChange={handleEditChange}
                    >
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Country</label>
                    <input
                      name="country"
                      value={editedDoctor.country || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-row">
                    <label>City</label>
                    <input
                      name="city"
                      value={editedDoctor.city || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>

                {error && <p className="error-text">{error}</p>}

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditedDoctor(selectedDoctor);
                      setError(null);
                    }}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageDoctor;
