import React, { useState } from "react";

const AuthModal = ({ show, onClose, isLogin, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const apiUrl = isLogin
    ? `${API_BASE_URL}/api/members/login` // 로그인 엔드포인트
    : `${API_BASE_URL}/api/members/register`; // 회원가입 엔드포인트

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        if (isLogin) onLoginSuccess();
        alert(isLogin ? "Login successful!" : "Registration successful!");
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error?.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "300px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
