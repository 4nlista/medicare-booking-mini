import { useEffect, useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
const Home = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Lấy thông tin từ localStorage
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");

    if (storedUsername && storedId) {
      setUsername(storedUsername);
      setUserId(storedId);
    } else {
      // Nếu không có thông tin trong localStorage => có thể điều hướng login
      console.log("Thông tin người dùng không có trong localStorage");
    }
  }, []);

  return (
    <CustomerLayout>
      <div className="card text-center">
        {username && userId ? (
          <>
            <h1 className="mb-2">Đây là giao diện của {username}</h1>
            <h4>Chào mừng bạn, Customer với ID: {userId}</h4>
          </>
        ) : (
          <p>Vui lòng đăng nhập để truy cập giao diện này.</p>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Home;
