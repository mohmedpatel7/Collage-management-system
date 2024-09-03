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
  const [showPassword, setShowPassword] = useState(false);

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
        return;
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

  const handleClear = () => {
    setadmin({ Aid: "", password: "" });
  };

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
      <div className="form-container p-4 border rounded shadow-sm bg-white">
        <p className="title text-center mb-4">Admin Login</p>
        <form className="form" onSubmit={adminLogin}>
          <div className="form-group position-relative mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Login Id"
              name="Aid"
              onChange={handleChange}
              value={admin.Aid}
            />
          </div>
          <div className="form-group position-relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={admin.password}
            />
            <span
              className="position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="reset"
              className="btn btn-secondary mx-2"
              onClick={handleClear}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary mx-2">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
