import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../style/style.css";

export default function Profile({
  showStudentProfile,
  setshowStudentProfile,
  showAlert,
}) {
  const [student, setstudent] = useState({
    Sid: "",
    name: "",
    email: "",
    date: "",
  });

  const fetchstudentData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/student/getstudent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "student-token": localStorage.getItem("student_token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();
      setstudent({
        Sid: data.Sid,
        name: data.name,
        email: data.email,
        date: data.date,
      });
    } catch (error) {
      showAlert("Failed to fetch student data", "danger");
    }
  }, [showAlert]);

  useEffect(() => {
    if (showStudentProfile) {
      fetchstudentData();
    }
  }, [showStudentProfile, fetchstudentData]);

  const navigate = useNavigate();
  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout..?");
    if (confirm) {
      localStorage.removeItem("student_token");
      setshowStudentProfile(false);
      navigate("/");
      showAlert("Logout successful...", "success");
    }
  };

  return (
    <Modal
      show={showStudentProfile}
      onHide={() => setshowStudentProfile(false)}
      className="profile-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Student Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>student Id:</strong> {student.Sid}
        </p>
        <p>
          <strong>Name:</strong> {student.name}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Date of join:</strong>{" "}
          {new Date(student.date).toLocaleDateString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-3d" onClick={() => setshowStudentProfile(false)}>
          Close
        </Button>
        <Button className="btn-3d" onClick={logout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
