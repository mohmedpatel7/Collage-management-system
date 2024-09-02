import React from "react";
import UserContext from "../UserContex";

const UserState = (props) => {
  const fecaltySignup = async (formData) => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/fecalty/createFecalty`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);

        return {
          success: false,
          errors: data.errors || [],
          message: data.error || "Something went wrong",
        };
      }

      if (data && data.fecalty_token) {
        localStorage.setItem("fecalty_token", data.fecalty_token);
      }

      return {
        success: true,
        errors: [],
        message: "Fecalty created successfully",
      };
    } catch (error) {
      console.error("Error:", error.message);
      return {
        success: false,
        errors: [],
        message: error.message || "An unexpected error occurred",
      };
    }
  };

  const studentSignup = async (formdata) => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/student/createstudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
          body: JSON.stringify(formdata),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData); // Log error details
        if (errorData.errors) {
          // Backend validation errors
          return {
            success: false,
            errors: data.errors || [],
            message: data.error || "Something went wrong",
          };
        }

        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      if (data && data.student_token) {
        localStorage.setItem("student_token", data.student_token);
      }
      return {
        success: true,
        errors: [],
        message: "Fecalty created successfully",
      };
    } catch (error) {
      console.error("Error:", error.message);
      return {
        success: false,
        errors: [],
        message: error.message || "An unexpected error occurred",
      };
    }
  };

  const addResult = async (formdata) => {
    try {
      const response = await fetch(
        `https://collage-backend-ftmf.onrender.com/api/admin/addResult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
          body: JSON.stringify(formdata),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData); // Log error details

        if (errorData.errors) {
          // Backend validation errors
          return { success: false, errors: errorData.errors };
        }

        throw new Error(errorData.error || "Something went wrong");
      }

      await response.json();
      return { success: true };
    } catch (error) {
      console.error("Error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const add_notice = async (formdata) => {
    try {
      const response = await fetch(`https://collage-backend-ftmf.onrender.com/api/admin/notice`, {
        method: "POST",
        headers: {
          "admin-token": localStorage.getItem("admin_token"),
        },
        body: formdata,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          // Backend validation errors
          return { success: false, errors: errorData.errors };
        }
        throw new Error(errorData.error || "Something went wrong");
      }

      await response.json();
      return { success: true };
    } catch (error) {
      console.error("Error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const add_notice_fecalty = async (formdata) => {
    try {
      const response = await fetch(`https://collage-backend-ftmf.onrender.com/api/fecalty/notice`, {
        method: "POST",
        headers: {
          "fecalty-token": localStorage.getItem("fecalty_token"),
        },
        body: formdata,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          // Backend validation errors
          return { success: false, errors: errorData.errors };
        }
        throw new Error(errorData.error || "Something went wrong");
      }

      await response.json();
      return { success: true };
    } catch (error) {
      console.error("Error:", error.message);
      return { success: false, message: error.message };
    }
  };

  return (
    <UserContext.Provider
      value={{
        fecaltySignup,
        studentSignup,
        addResult,
        add_notice,
        add_notice_fecalty,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
