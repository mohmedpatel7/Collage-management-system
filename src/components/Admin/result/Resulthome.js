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
              <p className="cookieHeading">Publish result</p>
              <p className="cookieDescription">
                Pusblish student result by teir Student id and sem wise.
              </p>
              <button
                className="acceptButton"
                onClick={() => navigate("/PublishResult")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center mb-4 my-3">
            <div className="cookieCard-result">
              <p className="cookieHeading">Find student result</p>
              <p className="cookieDescription">
                Find & Delete student result by their Student id and sem wise.
              </p>
              <button
                className="acceptButton"
                onClick={() => navigate("/serchstd")}
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
