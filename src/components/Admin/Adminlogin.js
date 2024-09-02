import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AdminLogin({ showAlert }) {
  const [admin, setadmin] = useState({ Aid: "", password: "" });
  const navigate = useNavigate();

  const adminLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/admin/adminLogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Aid: admin.Aid,
            password: admin.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showAlert(errorData.error || "Invalid Id or Password...!", "danger");
        return; // Stop further execution since there's an error.
      }

      const data = await response.json();
      if (data.admin_token) {
        localStorage.setItem("admin_token", data.admin_token);
        setadmin({ Aid: "", password: "" });
        navigate("/");
        showAlert("Login successfully", "success");
      }
    } catch (error) {
      console.error("Error:", error.message);
      showAlert(error.message, "danger");
    }
  };

  const handleChange = (event) => {
    setadmin({ ...admin, [event.target.name]: event.target.value });
  };

  const handleClear = (event) => {
    setadmin({ Aid: "", password: "" });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      data-aos="zoom-in"
    >
      <div className="form-container">
        <p className="title">Admin Login</p>
        <form className="form" onSubmit={adminLogin}>
          <input
            type="text"
            className="input"
            placeholder="Login Id"
            name="Aid"
            onChange={handleChange}
            value={admin.Aid}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={admin.password}
          />
          <span
            className="position-absolute"
            style={{
              top: "51.5%",
              right: "35%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>

          <button type="reset" className="mx-2 form-btn" onClick={handleClear}>
            Clear
          </button>
          <button type="submit" className="form-btn my-1 mx-2">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
