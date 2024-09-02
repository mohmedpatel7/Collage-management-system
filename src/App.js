import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nabar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Adminlogin from "./components/Admin/Adminlogin";
import Adminprofile from "./components/Admin/Adminprofile";
import Alert from "./components/Alert";
import Userhome from "./components/Admin/User/Userhome";
import Createfecalty from "./components/Admin/User/Createfecalty";
import Createstudent from "./components/Admin/User/CreateStudent";
import UserState from "./context/user/UserState";
import Listfecalty from "./components/Admin/User/Listfecalty";
import Liststudent from "./components/Admin/User/Liststudent";
import Resulthome from "./components/Admin/result/Resulthome";
import PublishResult from "./components/Admin/result/PublishResult";
import StudentSrch from "./components/Admin/result/StudentSrch";
import Noticehome from "./components/Admin/Notice/NoticeHome";
import AddingNotice from "./components/Admin/Notice/AddingNotice";
import Notices from "./components/Admin/Notice/Notices";
import FecaltyLogin from "./components/Fecalty/FecaltyLogin";
import FecaltyProfile from "./components/Fecalty/FecaltyProfile";
import Stdsrch from "./components/Fecalty/result/Stdsrch";
import NoticeHome from "./components/Fecalty/Notice/NoticeHome";
import AddNotice from "./components/Fecalty/Notice/AddNotice";
import Notice from "./components/Fecalty/Notice/Notice";
import Students from "./components/Fecalty/Students/Students";
import StudentLogin from "./components/Student/StudentLogin";
import StudentProfile from "./components/Student/StudentProfile";
import Notices_std from "./components/Student/Notice/Notices";
import StdResult from "./components/Student/Result/StdResult";

function App() {
  const [alert, setAlert] = useState(null);
  const [showAdminProfile, setshowAdminProfile] = useState(false);
  const [showFecaltyProfile, setshowFecaltyProfile] = useState(false);
  const [showStudentProfile, setshowStudentProfile] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <UserState>
      <Router>
        <Nabar
          setshowAdminProfile={setshowAdminProfile}
          setshowFecaltyProfile={setshowFecaltyProfile}
          setshowStudentProfile={setshowStudentProfile}
        />
        <Alert alert={alert} showAlert={showAlert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/user" element={<Userhome />} />
          <Route exact path="/result" element={<Resulthome />} />
          <Route
            exact
            path="/adminLogin"
            element={<Adminlogin showAlert={showAlert} />}
          />
          <Route
            exact
            path="/createfecalty"
            element={<Createfecalty showAlert={showAlert} />}
          />
          <Route
            exact
            path="/createstudent"
            element={<Createstudent showAlert={showAlert} />}
          />
          <Route
            exact
            path="/fecalties"
            element={<Listfecalty showAlert={showAlert} />}
          />
          <Route
            exact
            path="/students"
            element={<Liststudent showAlert={showAlert} />}
          />
          <Route
            exact
            path="/PublishResult"
            element={<PublishResult showAlert={showAlert} />}
          />
          <Route
            exact
            path="/serchstd"
            element={<StudentSrch showAlert={showAlert} />}
          />
          <Route exact path="/notices" element={<Noticehome />} />
          <Route
            exact
            path="/addNotices"
            element={<AddingNotice showAlert={showAlert} />}
          />
          <Route
            exact
            path="/cheakNotices"
            element={<Notices showAlert={showAlert} />}
          />
          <Route
            exact
            path="/FecaltyLogin"
            element={<FecaltyLogin showAlert={showAlert} />}
          />
          <Route
            exact
            path="/fecaltie_result"
            element={<Stdsrch showAlert={showAlert} />}
          />
          <Route exact path="/fecaltie_notice" element={<NoticeHome />} />
          <Route
            exact
            path="fecaltie_add_notice"
            element={<AddNotice showAlert={showAlert} />}
          />
          <Route
            exact
            path="/fecaltie_cheack_notice"
            element={<Notice showAlert={showAlert} />}
          />
          <Route
            exact
            path="/fecaltie_students"
            element={<Students showAlert={showAlert} />}
          />
          <Route
            exact
            path="/studentLogin"
            element={<StudentLogin showAlert={showAlert} />}
          />
          <Route
            exact
            path="/student_notice"
            element={<Notices_std showAlert={showAlert} />}
          />
          <Route
            exact
            path="/student_result"
            element={<StdResult showAlert={showAlert} />}
          />
        </Routes>
        <Adminprofile
          showAdminProfile={showAdminProfile}
          setshowAdminProfile={setshowAdminProfile}
          showAlert={showAlert}
        />
        <FecaltyProfile
          showFecaltyProfile={showFecaltyProfile}
          setshowFecaltyProfile={setshowFecaltyProfile}
          showAlert={showAlert}
        />
        <StudentProfile
          showStudentProfile={showStudentProfile}
          setshowStudentProfile={setshowStudentProfile}
          showAlert={showAlert}
        />
        <Footer />
      </Router>
    </UserState>
  );
}

export default App;
