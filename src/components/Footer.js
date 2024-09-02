import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About MKICS College</h5>
              <p>
                MKICS College is a premier institution offering top-notch
                education in BCA. We are dedicated to fostering academic
                excellence and holistic development of our students.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-map-marker-alt"></i>College Road, Bharuch
                </li>
                <li>
                  <i className="fas fa-phone"></i> +91 4564597890
                </li>
                <li>
                  <i className="fas fa-envelope"></i> infomkicscollege@gmail.com
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a to="#" className="text-white">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a to="#" className="text-white">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a to="#" className="text-white">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="mb-0">© 2024 MKICS College. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
