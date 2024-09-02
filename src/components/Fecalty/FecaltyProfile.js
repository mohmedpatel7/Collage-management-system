import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../style/style.css";

export default function Profile({
  showFecaltyProfile,
  setshowFecaltyProfile,
  showAlert,
}) {
  const [fecalty, setfecalty] = useState({
    Fid: "",
    name: "",
    email: "",
    date: "",
  });

  const fetchFecaltyData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/getfecalty`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "fecalty-token": localStorage.getItem("fecalty_token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch fecalty data");
      }

      const data = await response.json();
      setfecalty({
        Fid: data.Fid,
        name: data.name,
        email: data.email,
        date: data.date,
      });
    } catch (error) {
      showAlert("Failed to fetch fecalty data", "danger");
    }
  }, [showAlert]);

  useEffect(() => {
    if (showFecaltyProfile) {
      fetchFecaltyData();
    }
  }, [showFecaltyProfile, fetchFecaltyData]);

  const navigate = useNavigate();
  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout..?");
    if (confirm) {
      localStorage.removeItem("fecalty_token");
      setshowFecaltyProfile(false);
      navigate("/");
      showAlert("Logout successful...", "success");
    }
  };

  return (
    <Modal
      show={showFecaltyProfile}
      onHide={() => setshowFecaltyProfile(false)}
      className="profile-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Fecalty Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>fecalty Id:</strong> {fecalty.Fid}
        </p>
        <p>
          <strong>Name:</strong> {fecalty.name}
        </p>
        <p>
          <strong>Email:</strong> {fecalty.email}
        </p>
        <p>
          <strong>Date of join:</strong>{" "}
          {new Date(fecalty.date).toLocaleDateString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-3d" onClick={() => setshowFecaltyProfile(false)}>
          Close
        </Button>
        <Button className="btn-3d" onClick={logout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
