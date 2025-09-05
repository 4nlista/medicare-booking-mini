import database from "../../database.json";

// Lấy danh sách bác sĩ
const getDoctors = async () => {
  try {
    const doctors = database.users
      .filter((user) => user.role === "doctor")
      .map((doctor) => {
        const profile =
          database.profiles.find((p) => p.user_id === doctor.id) || {};
        const doctorInfo =
          database.doctors.find((d) => d.user_id === doctor.id) || {};

        return {
          id: doctor.id,
          username: doctor.username,
          email: doctor.email,
          status: doctor.status,
          role: doctor.role,
          full_name: profile.full_name || "",
          dob: profile.dob || "",
          gender: profile.gender || "",
          phone: profile.phone || "",
          address: profile.address || "",
          city: profile.city || "",
          country: profile.country || "",
          specialization: doctorInfo.specialization || "",
          room_id: doctorInfo.room_id || null,
          working_hours: doctorInfo.working_hours || [],
        };
      });

    return doctors;
  } catch (error) {
    console.error("Lỗi khi load danh sách bác sĩ", error);
    return [];
  }
};

export default {
  getDoctors,
};
