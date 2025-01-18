import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Upload from "./components/Upload";
import AuthModal from "./components/AuthModal";

const App = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 모드 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부 상태 관리
  const [user, setUser] = useState(null); // 사용자 정보 저장

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const openModal = (isLoginMode) => {
    setIsLogin(isLoginMode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // 사용자 정보 가져오기 함수 (useCallback으로 메모이제이션)
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/members/me`, {
        method: "GET",
        credentials: "include", // 쿠키 포함
      });
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true); // 로그인 상태 업데이트
        setUser(userData); // 사용자 정보 저장
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  }, [API_BASE_URL]);

  // 로그인 성공 처리
  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // 로그인 상태를 true로 설정
    fetchUserInfo(); // 사용자 정보 가져오기
    closeModal(); // 모달 닫기
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false); // 로그인 상태를 false로 설정
    setUser(null); // 사용자 정보 초기화
    alert("You have been logged out.");
  };

  // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <BrowserRouter>
      <Header
        onLogin={() => openModal(true)}
        onSignUp={() => openModal(false)}
        onLogout={handleLogout} // 로그아웃 함수 전달
        isAuthenticated={isAuthenticated} // 로그인 상태 전달
        user={user} // 사용자 정보 전달
      />
      <Routes>
        <Route path="/" element={<h2>Welcome to My Blog</h2>} />
        <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />
        <Route path="/posts" element={<h2>My Posts</h2>} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <AuthModal
        show={showModal}
        onClose={closeModal}
        isLogin={isLogin}
        onLoginSuccess={handleLoginSuccess} // 로그인 성공 핸들러 전달
      />
    </BrowserRouter>
  );
};

export default App;
