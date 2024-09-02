import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";

export default function Listfecalty({ showAlert }) {
  const [fecalty, setFecalty] = useState([]);

  const fetchAll = async () => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/admin/getAllFecalties`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
        }
      );

      if (!response.ok) {
        showAlert("Failed to fetch..!", "danger");
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setFecalty(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      showAlert("Internal server error..!", "danger");
    }
  };

  const deleteUser = async (Fid) => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/deleteFecalty/${Fid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
        }
      );

      if (!response.ok) {
        showAlert("Failed to delete..!", "danger");
        return;
      }

      setFecalty((prevFecalty) =>
        prevFecalty.filter((item) => item.Fid !== Fid)
      );
      showAlert("Fecalty deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting fecalty:", error.message);
      showAlert("Internal server error..!", "danger");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-hover table-bordered custom-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Fecalty Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date of Creation</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fecalty.map((item, index) => (
              <tr key={item.Fid}>
                <td>{index + 1}</td>
                <td>{item.Fid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <i
                    className="fa-solid fa-trash-can mx-2"
                    onClick={() => deleteUser(item.Fid)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
