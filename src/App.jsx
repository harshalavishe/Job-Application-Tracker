
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./Home.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import SignIn from "./Signin.jsx";
import DashBoard from "./DashBoard.jsx";
import AddJob from "./AddJob.jsx";
import ShowJobs from "./ShowJobs.jsx";
import JobDetail from "./JobDetail.jsx";
import ApplicationTracker from "./ApplicationTracker.jsx";
import DashboardLayout from "./DashboardLayout.jsx";


function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1>My Profile 👤</h1>
        <p>Manage your personal information</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">HV</div>

        <h2>Harshala Vishe</h2>

        <div className="profile-divider"></div>

        <h3>Personal Information</h3>

        <div className="profile-details">
          <div className="profile-detail">
            <span>Full Name</span>
            <strong>Harshala Vishe</strong>
          </div>

          <div className="profile-detail">
            <span>Education</span>
            <strong>BE Information Technology</strong>
          </div>

          <div className="profile-detail">
            <span>College</span>
            <strong>Indala College of Engineering</strong>
          </div>

          <div className="profile-detail">
            <span>Preferred Role</span>
            <strong>Frontend Developer</strong>
          </div>

          <div className="profile-detail">
            <span>Location</span>
            <strong>Mumbai / Pune</strong>
          </div>
        </div>

        <div className="profile-divider"></div>

        <h3>My Skills</h3>

        <div className="profile-skills">
          <span>HTML5</span>
          <span>CSS3</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Git & GitHub</span>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route path="/" element={<Home />} />

      {/* COMMON SIDEBAR LAYOUT */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/applications" element={<ApplicationTracker />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/jobs" element={<ShowJobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* SIGN IN */}
      <Route path="/signin" element={<SignIn />} />

      {/* INVALID URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
