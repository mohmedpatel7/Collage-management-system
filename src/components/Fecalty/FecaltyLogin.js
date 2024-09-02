import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FecaltyLogin({ showAlert }) {
  const [fecalty, setfecalty] = useState({ Fid: "", password: "" });
  const navigate = useNavigate();

  const fecaltyLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/fecaltyLogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Fid: fecalty.Fid,
            password: fecalty.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        showAlert(errorData.error || "Invalid Id or Password...!", "danger");
        return; // Stop further execution since there's an error.
      }

      const data = await response.json();
      if (data.fecalty_token) {
        localStorage.setItem("fecalty_token", data.fecalty_token);
        setfecalty({ Fid: "", password: "" });
        navigate("/");
        showAlert("Login successfully", "success");
      }
    } catch (error) {
      console.error("Error:", error.message);
      showAlert(error.message, "danger");
    }
  };

  const handleChange = (event) => {
    setfecalty({ ...fecalty, [event.target.name]: event.target.value });
  };

  const handleClear = (event) => {
    setfecalty({ Fid: "", password: "" });
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
        <p className="title">Fecalty Login</p>
        <form className="form" onSubmit={fecaltyLogin}>
          <input
            type="text"
            className="input"
            placeholder="Login Id"
            name="Fid"
            onChange={handleChange}
            value={fecalty.Fid}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={fecalty.password}
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
