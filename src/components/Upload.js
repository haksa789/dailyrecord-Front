import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(`Upload successful: ${data.message}`);
    } catch (error) {
      alert("Error uploading file!");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Your Photo</h2>
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleUpload} style={styles.button}>
        Upload
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
  },
  input: {
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Upload;
