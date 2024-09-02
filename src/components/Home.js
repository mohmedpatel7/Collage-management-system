import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

function Home({ showAlert }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isAdmin = localStorage.getItem("admin_token");
  const isFecalty = localStorage.getItem("fecalty_token");
  const isStudent = localStorage.getItem("student_token");

  const navigate = useNavigate();

  return (
    <>
      <div className="hero-section text-center">
        <div className="container" data-aos="fade-up">
          <h1>Welcome to MKICS College</h1>
          <p>Empowering Students for a Brighter Future</p>
        </div>
      </div>

      <div className="container about-section">
        <div className="row">
          <div className="col-md-6 about-text">
            <h5>
              MKICS College has been a beacon of education since 2002. We
              provide a wide range of programs that cater to students' diverse
              needs and aspirations.
            </h5>
          </div>
          <div className="col-md-6 about-image">
            <img
              src="https://via.placeholder.com/500x300"
              alt="College"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      <div className="container links-section text-center">
        <h2>Important Links</h2>
        {!isAdmin && !isFecalty && !isStudent && (
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  showAlert("Please Login..", "danger");
                }}
              >
                Result
              </button>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  showAlert("Please Login...", "danger");
                }}
              >
                Notices
              </button>
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/user");
                }}
              >
                User
              </button>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/notices");
                }}
              >
                Notices
              </button>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/result");
                }}
              >
                Result
              </button>
            </div>
          </div>
        )}
        {isFecalty && (
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/fecaltie_students");
                }}
              >
                Students
              </button>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/fecaltie_notice");
                }}
              >
                Notices
              </button>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/result");
                }}
              >
                Result
              </button>
            </div>
          </div>
        )}
        {isStudent && (
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/student_notice");
                }}
              >
                Notices
              </button>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 mb-4">
              <button
                className="btn btn-custom"
                onClick={() => {
                  navigate("/student_result");
                }}
              >
                Result
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
