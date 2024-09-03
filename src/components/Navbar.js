import React, { useState, useEffect } from "react";
import { Offcanvas, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";

function CollegeSystemSlider({
  setshowAdminProfile,
  setshowFecaltyProfile,
  setshowStudentProfile,
}) {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!show) {
      setIsOpen(false);
    }
  }, [show]);

  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("admin_token");
  const isFecalty = localStorage.getItem("fecalty_token");
  const isStudent = localStorage.getItem("student_token");

  return (
    <>
      <Navbar bg="light" expand="lg">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Button
            className={`mx-3 menu-btn ${isOpen ? "open" : ""}`}
            onClick={() => setShow(!show)}
          >
            <div className="menu-btn-lines"></div>
            <div className="menu-btn-lines"></div>
            <div className="menu-btn-lines"></div>
          </Button>
          <div className="d-flex ms-auto">
            {!isAdmin && !isFecalty && !isStudent && (
              <>
                <i
                  className="fa-solid fa-user-tie menu-icon px-3"
                  onClick={() => navigate("/adminLogin")}
                  title="Admin Login"
                ></i>
                <i
                  className="fa-solid fa-chalkboard-user menu-icon px-3"
                  onClick={() => {
                    navigate("/FecaltyLogin");
                  }}
                  title="Fecalty Login"
                ></i>
                <i
                  className="fa-solid fa-graduation-cap menu-icon px-3"
                  title="Student Login"
                  onClick={() => {
                    navigate("/studentLogin");
                  }}
                ></i>
              </>
            )}

            {isAdmin && (
              <i
                className="fa-solid fa-user-tie menu-icon px-3"
                onClick={() => setshowAdminProfile(true)}
                title="Profile"
              ></i>
            )}

            {isFecalty && (
              <i
                className="fa-solid fa-chalkboard-user menu-icon px-3"
                onClick={() => setshowFecaltyProfile(true)}
                title="Profile"
              ></i>
            )}

            {isStudent && (
              <i
                className="fa-solid fa-graduation-cap menu-icon px-3"
                title="Student Login"
                onClick={() => setshowStudentProfile(true)}
              ></i>
            )}
          </div>
        </div>
      </Navbar>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className={`custom-offcanvas ${show ? "show" : ""}`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MKICS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              <i className="fas fa-home"></i> HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleClose}>
              <i className="fas fa-info-circle"></i> ABOUT
            </Nav.Link>

            {/* User Menu with Sublinks */}
            {isAdmin && (
              <Nav.Item className="nav-item">
                <Nav.Link as={Link} to="/user" onClick={handleClose}>
                  <i className="fas fa-user"></i> USER
                </Nav.Link>
                <div className="submenu">
                  <Nav.Link as={Link} to="/createfecalty" onClick={handleClose}>
                    CREATE FECALTY
                  </Nav.Link>
                  <Nav.Link as={Link} to="/createstudent" onClick={handleClose}>
                    CREATE STUDENT
                  </Nav.Link>
                  <Nav.Link as={Link} to="/fecalties" onClick={handleClose}>
                    FECALTIES
                  </Nav.Link>
                  <Nav.Link as={Link} to="/students" onClick={handleClose}>
                    STUDENTS
                  </Nav.Link>
                </div>
              </Nav.Item>
            )}

            {/* Notice Menu with Sublinks */}
            {isAdmin && (
              <Nav.Item className="nav-item">
                <Nav.Link as={Link} to="/notices" onClick={handleClose}>
                  <i className="fas fa-bullhorn"></i> NOTICE
                </Nav.Link>
                <div className="submenu">
                  <Nav.Link as={Link} to="/addNotices" onClick={handleClose}>
                    ADD NOTICE
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cheakNotices" onClick={handleClose}>
                    NOTICES
                  </Nav.Link>
                </div>
              </Nav.Item>
            )}

            {/* Result Menu with Sublinks */}
            {isAdmin && (
              <Nav.Item className="nav-item">
                <Nav.Link as={Link} to="/result" onClick={handleClose}>
                  <i className="fas fa-chart-line"></i> RESULT
                </Nav.Link>
                <div className="submenu">
                  <Nav.Link as={Link} to="/PublishResult" onClick={handleClose}>
                    PULISH RESULT
                  </Nav.Link>
                  <Nav.Link as={Link} to="/serchstd" onClick={handleClose}>
                    SEARCH STUDENT
                  </Nav.Link>
                </div>
              </Nav.Item>
            )}

            {isFecalty && (
              <Nav.Item className="nav-item">
                <Nav.Link as={Link} to="/fecaltie_notice" onClick={handleClose}>
                  <i className="fas fa-bullhorn"></i> NOTICE
                </Nav.Link>

                <div className="submenu">
                  <Nav.Link
                    as={Link}
                    to="fecaltie_add_notice"
                    onClick={handleClose}
                  >
                    ADD NOTICE
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/fecaltie_cheack_notice"
                    onClick={handleClose}
                  >
                    NOTICES
                  </Nav.Link>
                </div>
              </Nav.Item>
            )}

            {isFecalty && (
              <Nav.Item className="nav-item">
                <Nav.Link
                  as={Link}
                  to="/fecaltie_students"
                  onClick={handleClose}
                >
                  <i className="fa-solid fa-graduation-cap"></i> STUDENTS
                </Nav.Link>
              </Nav.Item>
            )}

            {isFecalty && (
              <Nav.Item className="nav-item">
                <Nav.Link as={Link} to="/fecaltie_result" onClick={handleClose}>
                  <i className="fas fa-chart-line"></i> RESULT
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>

          {isStudent && (
            <Nav.Item className="nav-item">
              <Nav.Link as={Link} to="/student_notice" onClick={handleClose}>
                <i className="fas fa-bullhorn"></i> NOTICE
              </Nav.Link>
            </Nav.Item>
          )}

          {isStudent && (
            <Nav.Item className="nav-item">
              <Nav.Link as={Link} to="/student_result" onClick={handleClose}>
                <i className="fas fa-chart-line"></i> RESULT
              </Nav.Link>
            </Nav.Item>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CollegeSystemSlider;
