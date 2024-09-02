import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";

export default function StudentSrch({ showAlert }) {
  const [semester, setSemester] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!semester) {
      setError(showAlert("Please enter Student ID and Semester..!", "danger"));
      setStudentData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/student/getResult/${semester}`,
        {
          method: "GET",
          headers: {
            "student-token": localStorage.getItem("student_token"),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          showAlert(errorData.message || "Failed to fetch data...!", "danger")
        );
      }

      const data = await response.json();
      const { student, result } = data;
      setStudentData({
        Sid: student.Sid,
        name: student.name,
        email: student.email,
        sem: result.sem,
        subject1: result.subject1,
        subject2: result.subject2,
        subject3: result.subject3,
        subject4: result.subject4,
        subject5: result.subject5,
        total: result.totalMarks,
        date: result.Date,
      });
      setError("");
      showAlert("Student data fetched successfully!", "success");
    } catch (err) {
      setError(err.message);
      setStudentData(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card-std shadow-sm p-4 mb-4">
        <h3 className="text-center mb-4">Search Student Profile</h3>
        <div className="row align-items-center">
          <div className="col-md-2">
            <label htmlFor="semester" className="form-label">
              Semester:
            </label>
            <select
              className="form-control-std"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-custom w-100"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {!studentData ? (
        <div>
          <h3 className="text-center mb-4">Search result.</h3>
        </div>
      ) : (
        <div className="card-result shadow-sm p-6 my-5">
          <div className="card-body">
            <h4 className="card-title-std">{studentData.name}</h4>
            <p className="card-text-std">
              <strong>Student Id:</strong> {studentData.Sid}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {studentData.email}
            </p>
            <h4 className="card-text my-4">
              <strong>Result</strong>
            </h4>
            <h5 className="card-text">
              <strong>Semester:</strong> {studentData.sem}
            </h5>
            <p className="card-text">
              <strong>Subject 1:</strong> {studentData.subject1}
            </p>
            <p className="card-text">
              <strong>Subject 2:</strong> {studentData.subject2}
            </p>
            <p className="card-text">
              <strong>Subject 3:</strong> {studentData.subject3}
            </p>
            <p className="card-text">
              <strong>Subject 4:</strong> {studentData.subject4}
            </p>
            <p className="card-text">
              <strong>Subject 5:</strong> {studentData.subject5}
            </p>
            <p className="card-text">
              <strong>Total:</strong> {studentData.total}
            </p>
            <p>
              <strong>Date:</strong>
              {new Date(studentData.date).toLocaleDateString()}
            </p>
            <div className="row">
              <div className="col-md-2">
                <button
                  className="btn btn-custom"
                  onClick={() => {
                    setStudentData(null);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
