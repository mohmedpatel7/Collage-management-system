import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import UserContext from "../../../context/UserContex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Createfecalty({ showAlert }) {
  const { fecaltySignup } = useContext(UserContext);

  const [formvalues, setFormvalues] = useState({
    Fid: "",
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: Log form values before submitting
    console.log("Submitting form with values:", formvalues);

    const {
      success,
      errors: validationErrors,
      message,
    } = await fecaltySignup(formvalues);

    // Debugging: Log the response from the API call
    console.log("API response:", { success, validationErrors, message });

    if (success) {
      showAlert("Fecalty created successfully", "success");
      setErrors([]);
      // Clear form after successful submission
      setFormvalues({
        Fid: "",
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
    setFormvalues({
      ...formvalues,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg">
          <h2 className="card-title text-center mb-4">
            Sign up to create fecalty account
          </h2>
          <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <p key={index}>{error.msg}</p>
                ))}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="Fid" className="form-label">
                Fecalty Id:
              </label>
              <input
                type="text"
                className="form-control"
                id="Fid"
                placeholder="Fecalty ID"
                name="Fid"
                value={formvalues.Fid}
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
                value={formvalues.name}
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
                value={formvalues.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={formvalues.password}
                onChange={handleChange}
              />
              <span
                className="position-absolute"
                style={{
                  top: "70%",
                  right: "10px",
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
                  !(
                    formvalues.Fid &&
                    formvalues.name &&
                    formvalues.email &&
                    formvalues.password
                  )
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
