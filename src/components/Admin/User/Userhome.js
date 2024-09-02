import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";

export default function Userhome() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center mb-4 my-5">
            <div className="cookieCard">
              <p className="cookieHeading">Create Fecalty</p>
              <p className="cookieDescription">Create Fecalty.</p>
              <button
                className="acceptButton"
                onClick={() => navigate("/createfecalty")}
              >
                Next
              </button>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center mb-4 my-5">
            <div className="cookieCard">
              <p className="cookieHeading">Create Student</p>
              <p className="cookieDescription">Create Student.</p>
              <button
                className="acceptButton"
                onClick={() => navigate("/createstudent")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center mb-4 my-2">
            <div className="cookieCard">
              <p className="cookieHeading">Find Fecalty</p>
              <p className="cookieDescription">Find Fecalty.</p>
              <button
                className="acceptButton"
                onClick={() => {
                  navigate("/fecalties");
                }}
              >
                Next
              </button>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center mb-4 my-2">
            <div className="cookieCard">
              <p className="cookieHeading">Find Student</p>
              <p className="cookieDescription">Find Student.</p>
              <button
                className="acceptButton"
                onClick={() => {
                  navigate("/students");
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
