import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import UserContext from "../../../context/UserContex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Createstudent({ showAlert }) {
  const { studentSignup } = useContext(UserContext);

  const [formdata, setformdata] = useState({
    Sid: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      success,
      errors: validationErrors,
      message,
    } = await studentSignup(formdata);

    // Debugging: Log the response from the API call
    console.log("API response:", { success, validationErrors, message });

    if (success) {
      showAlert("Student created successfully", "success");
      setErrors([]);
      setformdata({
        Sid: "",
        name: "",
        email: "",
        password: "",
      });
    } else {
      if (validationErrors && validationErrors.length > 0) {
        setErrors(validationErrors);
      } else {
        showAlert(message || "Error creating fecalty.", "danger");
      }
    }
  };

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg">
          <h2 className="card-title text-center mb-4">
            Sign up to create student account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Sid" className="form-label">
                {" "}
                {/* Ensure htmlFor matches input id */}
                Student Id:
              </label>
              <input
                type="text"
                className="form-control"
                id="Sid"
                placeholder="Student ID"
                name="Sid"
                value={formdata.Sid}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Full Name"
                name="name"
                value={formdata.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
              />
              <span
                className="position-absolute"
                style={{
                  top: "83%",
                  right: "35px",
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
            <div className="d-grid">
              <button
                className="btn btn-signup btn-block"
                type="submit"
                disabled={
                  (
                    formdata.Sid &&
                    formdata.name &&
                    formdata.email &&
                    formdata.password
                  ).length === 0
                }
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
