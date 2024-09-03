import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

export default function StudentLogin({ showAlert }) {
  const [student, setstudent] = useState({ Sid: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const studentLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/student/studentLogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Sid: student.Sid,
            password: student.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showAlert(errorData.error || "Invalid Id or Password...!", "danger");
        return;
      }

      const data = await response.json();
      if (data.student_token) {
        localStorage.setItem("student_token", data.student_token);
        setstudent({ Sid: "", password: "" });
        navigate("/");
        showAlert("Login successfully", "success");
      }
    } catch (error) {
      console.error("Error:", error.message);
      showAlert(error.message, "danger");
    }
  };

  const handleChange = (event) => {
    setstudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleClear = () => {
    setstudent({ Sid: "", password: "" });
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
        <p className="title text-center mb-4">Student Login</p>
        <form className="form" onSubmit={studentLogin}>
          <div className="form-group position-relative mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Login Id"
              name="Sid"
              onChange={handleChange}
              value={student.Sid}
            />
          </div>
          <div className="form-group position-relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={student.password}
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
