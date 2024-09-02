import React, { useContext, useState, useRef } from "react";
import "../../style/style.css";
import UserContext from "../../../context/UserContex";

export default function AddingNotice({ showAlert }) {
  const { add_notice } = useContext(UserContext);

  const [notice, setNotice] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState([]);
  const [file, setFile] = useState(null);

  // Ref to reset file input
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object to handle file upload
    const formData = new FormData();
    formData.append("title", notice.title);
    formData.append("description", notice.description);

    if (file) {
      formData.append("file", file); // Append the file to the formData
    }

    const {
      success,
      erro: validationErrors,
      message,
    } = await add_notice(formData);

    if (success) {
      showAlert("Notice added successfully.", "success");

      // Clear the form
      setNotice({
        title: "",
        description: "",
      });

      setFile(null); // Clear the file state

      // Clear the file input using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setErrors([]); // Clear errors
    } else {
      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        setErrors([{ msg: message || "Error adding notice..!" }]);
      }
    }
  };

  const handleChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  return (
    <>
      <section className="container result my-2">
        <header>Publish Notice</header>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <p key={index}>{error.msg}</p>
            ))}
          </div>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Title:</label>
            <input
              required
              placeholder="Enter Notice Title"
              type="text"
              name="title"
              onChange={handleChange}
              value={notice.title}
            />
          </div>
          <div className="input-box">
            <label>Description:</label>
            <input
              required
              placeholder="Enter Notice Description"
              type="text"
              name="description"
              onChange={handleChange}
              value={notice.description}
            />
          </div>
          <div>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          <strong>*Maximum file size 5mb.</strong>
          <div className="row">
            <div className="col-md-6">
              <button
                type="reset"
                onClick={() => {
                  setNotice({
                    title: "",
                    description: "",
                  });
                  setFile(null);
                  showAlert("Cleared..", "success");
                }}
              >
                Clear
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="disabled"
                type="submit"
                disabled={(notice.title && notice.description).length === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
