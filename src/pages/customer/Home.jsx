import React, { useEffect, useState } from "react";

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
      // Nếu không tìm thấy thông tin trong localStorage, có thể điều hướng đến trang đăng nhập
      console.log("Thông tin người dùng không có trong localStorage");
    }
  }, []);

  return (
    <div>
      {username && userId ? (
        <>
          <h1>{`Đây là giao diện của ${username}`}</h1>
          <h4>{`Chào mừng bạn, Customer với ID : ${userId}`}</h4>
        </>
      ) : (
        <p>Vui lòng đăng nhập để truy cập giao diện này.</p>
      )}
    </div>
  );
};

export default Home;
