import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";

export default function Userhome() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" mt-3 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center mb-4 my-5">
            <div className="cookieCard-result">
              <p className="cookieHeading">Add Notice</p>
              <p className="cookieDescription">
                Pusblish Notice for fecalties and student.
              </p>
              <button
                className="acceptButton"
                onClick={() => navigate("/addNotices")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center mb-4 my-3">
            <div className="cookieCard-result">
              <p className="cookieHeading">Notices</p>
              <p className="cookieDescription">Cheakout all notices.</p>
              <button
                className="acceptButton"
                onClick={() => navigate("/cheakNotices")}
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
