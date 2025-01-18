import React, { useState } from "react";

const Header = ({ onLogin, onSignUp, onLogout, isAuthenticated, user }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>My Blog</h1>
      <div style={styles.nav}>
        {isAuthenticated ? (
          <>
            <span style={styles.userGreeting}>
              Welcome, {user?.username || "User"}!
            </span>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "write" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("write")}
              onMouseLeave={handleMouseLeave}
              onClick={() => console.log("Navigating to Write Post")}
            >
              Write Post
            </button>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "mypage" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("mypage")}
              onMouseLeave={handleMouseLeave}
              onClick={() => console.log("Navigating to My Page")}
            >
              My Page
            </button>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "logout" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("logout")}
              onMouseLeave={handleMouseLeave}
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "login" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("login")}
              onMouseLeave={handleMouseLeave}
              onClick={onLogin}
            >
              Login
            </button>
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === "signup" ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("signup")}
              onMouseLeave={handleMouseLeave}
              onClick={onSignUp}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  nav: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  userGreeting: {
    marginRight: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Header;
