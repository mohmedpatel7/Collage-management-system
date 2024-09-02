import React, { useContext, useState } from "react";
import "../../style/style.css";
import UserContext from "../../../context/UserContex";

export default function PublishResult({ showAlert }) {
  const { addResult } = useContext(UserContext);

  const [result, setResult] = useState({
    Sid: "",
    sem: "",
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
  });

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const totalMarks = calculateTotalMarks();
    const formData = { ...result, totalMarks };

    const {
      success,
      errors: validationErrors,
      message,
    } = await addResult(formData);

    if (success) {
      showAlert("Result added successfully.", "success");
      setResult({
        Sid: "",
        sem: "",
        subject1: "",
        subject2: "",
        subject3: "",
        subject4: "",
        subject5: "",
      });
      setErrors([]); // Clear errors
    } else {
      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        showAlert(message || "Error adding result.", "danger");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert to number if the field is for subjects or sem
    if (name.startsWith("subject") || name === "sem") {
      setResult({
        ...result,
        [name]: Number(value),
      });
    } else {
      setResult({
        ...result,
        [name]: value,
      });
    }
  };

  const calculateTotalMarks = () => {
    const { subject1, subject2, subject3, subject4, subject5 } = result;
    // Ensure calculation only occurs with valid numbers
    return (
      Number(subject1 || 0) +
      Number(subject2 || 0) +
      Number(subject3 || 0) +
      Number(subject4 || 0) +
      Number(subject5 || 0)
    );
  };

  return (
    <>
      <section className="container result my-2">
        <header>Publish Student Result</header>
        <form className="form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="alert alert-danger">
              {errors.map((error, index) => (
                <p key={index}>{error.msg}</p>
              ))}
            </div>
          )}
          <div className="input-box">
            <label>Student Id:</label>
            <input
              required
              placeholder="Enter Student Id"
              type="text"
              name="Sid"
              onChange={handleChange}
              value={result.Sid}
            />
          </div>
          <div className="select-box">
            <select name="sem" onChange={handleChange} value={result.sem}>
              <option hidden>Enter Sem</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Subject 1:</label>
              <input
                required
                placeholder="Enter subject 1 marks"
                type="number"
                name="subject1"
                onChange={handleChange}
                value={result.subject1}
              />
            </div>
          </div>
          <div className="input-box ">
            <label>Subject 2:</label>
            <input
              required
              placeholder="Enter subject 2 marks"
              type="number"
              name="subject2"
              onChange={handleChange}
              value={result.subject2}
            />
          </div>
          <div className="input-box ">
            <label>Subject 3:</label>
            <input
              required
              placeholder="Enter subject 3 marks"
              type="number"
              name="subject3"
              onChange={handleChange}
              value={result.subject3}
            />
          </div>
          <div className="input-box ">
            <label>Subject 4:</label>
            <input
              required
              placeholder="Enter subject 4 marks"
              type="number"
              name="subject4"
              onChange={handleChange}
              value={result.subject4}
            />
          </div>
          <div className="input-box ">
            <label>Subject 5:</label>
            <input
              required
              placeholder="Enter subject 5 marks"
              type="number"
              name="subject5"
              onChange={handleChange}
              value={result.subject5}
            />
          </div>
          <div className="input-box">
            <label>Total Marks:</label>
            <input type="text" value={calculateTotalMarks()} readOnly />
          </div>
          <button
            type="submit"
            disabled={
              !(
                result.Sid &&
                result.sem &&
                result.subject1 &&
                result.subject2 &&
                result.subject3 &&
                result.subject4 &&
                result.subject5
              )
            }
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
