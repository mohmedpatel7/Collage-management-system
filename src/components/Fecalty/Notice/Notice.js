import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import { Link } from "react-router-dom";

export default function Notices({ showAlert }) {
  const [notices, setNotices] = useState([]);

  const fetch_notices = async () => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/getNotices`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "fecalty-token": localStorage.getItem("fecalty_token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setNotices(data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error(error);
      showAlert("Internal server error..!", "danger");
    }
  };

  const delete_notice = async (id) => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/deleteNotice/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "fecalty-token": localStorage.getItem("fecalty_token"),
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // If response is not ok, check for errors
        if (result.errors) {
          // Assuming backend returns validation errors in 'errors' field
          showAlert(result.errors.map((err) => err.msg).join(", "), "danger");
        } else {
          showAlert(result.message || "Failed to delete notice", "danger");
        }
        return;
      }

      // Clearing notice from frontend after deleting notice.
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice._id !== id)
      );

      showAlert("Notice Deleted..", "success");
    } catch (error) {
      console.error(error);
      showAlert("Internal server error..!", "danger");
    }
  };

  const download_notice = async (id, filename) => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/downloadNotice/${id}`,
        {
          method: "GET",
          headers: {
            "fecalty-token": localStorage.getItem("fecalty_token"),
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        if (result.errors) {
          showAlert(result.errors.map((err) => err.msg).join(", "), "danger");
        } else {
          showAlert(result.message || "Failed to download notice", "danger");
        }
        return;
      }

      const blob = await response.blob(); // Convert response to blob for binary data
      const url = window.URL.createObjectURL(blob); // Create a URL for the blob
      const a = document.createElement("a");
      a.href = url;

      // Set the filename for download
      a.download = filename || "notice-file.pdf"; // Default filename if none is provided

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Free memory

      showAlert("File downloaded successfully.", "success");
    } catch (error) {
      console.error(error);
      showAlert("Internal server error..!", "danger");
    }
  };

  useEffect(() => {
    fetch_notices();
  }, [fetch_notices]);

  return (
    <>
      <h2 className="text-center my-1">
        <u>NOTICES</u>
      </h2>
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <div
            className="container d-flex justify-content-center my-5"
            key={index}
          >
            <div className="col-md-8">
              <div className="card card-notice">
                <div className="card-header">{notice.title}</div>
                <div className="card-body">
                  <div className="card-text">{notice.description}</div>
                  {notice.file && (
                    <div className="card-text my-2">
                      <Link to={notice.file} rel="noopener noreferrer">
                        <i className="fa fa-file" aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                  <div className="card-text text-end">
                    {notice.file && (
                      <i
                        className="fa-solid fa-arrow-down mx-4"
                        onClick={() => {
                          download_notice(notice._id);
                        }}
                      />
                    )}
                    <i
                      className="fa fa-trash"
                      onClick={() => {
                        const val = window.confirm("Are you sure.");
                        if (val) {
                          delete_notice(notice._id);
                          showAlert("Notice Deleted.");
                        } else {
                          return;
                        }
                      }}
                    />
                  </div>
                  <div className="card-footer text-muted text-end">
                    <strong>
                      {new Date(notice.date).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="container my-5">
          <h3>No notices available..</h3>
        </div>
      )}
    </>
  );
}
