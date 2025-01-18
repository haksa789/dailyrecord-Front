import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ onCloseModal }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onCloseModal(); // 모달 닫기
    navigate("/"); // 홈으로 이동
  };

  return (
    <div>
      <h2>Dashboard Page</h2>
      <button onClick={handleGoHome}>Go to Home</button>
    </div>
  );
};

export default Dashboard;
