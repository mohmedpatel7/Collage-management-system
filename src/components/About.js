import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className="hero-section text-center">
        <div className="container" data-aos="fade-up">
          <h1>About MKICS BCA College</h1>
          <p>Shaping the Future of Information Technology</p>
        </div>
      </div>

      <div className="container about-section">
        <div className="row">
          <div className="col-md-12 about-info">
            <h2>Our Mission</h2>
            <p>
              At MKICS BCA College, our mission is to provide quality education
              in the field of computer applications. We aim to equip students
              with the necessary skills and knowledge to excel in the rapidly
              changing tech world.
            </p>
          </div>
        </div>
      </div>

      <div className="container faculty-section">
        <h2>Our Faculty</h2>
        <div className="row">
          <div className="col-md-4 my-2">
            <div className="card-notice">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150"
                alt="Faculty Member"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. John Doe</h5>
                <p className="card-text">Head of Department</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-2">
            <div className="card-notice">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150"
                alt="Faculty Member"
              />
              <div className="card-body">
                <h5 className="card-title">Prof. Jane Smith</h5>
                <p className="card-text">Senior Lecturer</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-2">
            <div className="card-notice">
              <img
                className="card-img-top"
                src="https://via.placeholder.com/150"
                alt="Faculty Member"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Michael Lee</h5>
                <p className="card-text">Assistant Professor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
