
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./ShowJobs.css";

export default function ShowJobs() {
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(true);

  const navigate = useNavigate();

  // GET JOBS
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // DELETE JOB
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/jobs/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete job");
        }

        setJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to delete job!");
      });
  };

  // CHART DATA
  const chartData = [
    {
      name: "Applied",
      count: jobs.filter((job) => job.status === "Applied").length
    },
    {
      name: "Interviewed",
      count: jobs.filter((job) => job.status === "Interviewed").length
    },
    {
      name: "Rejected",
      count: jobs.filter((job) => job.status === "Rejected").length
    },
    {
      name: "Selected",
      count: jobs.filter((job) => job.status === "Selected").length
    }
  ];

  return (
    <div className="dashboard">

      {/* PAGE TITLE */}
      <h1 className="page-title">
        Job Application Dashboard
      </h1>

      {/* TOTAL JOBS */}
      <div className="total-jobs-card">
        <h2>Total Applications</h2>
        <h1>{jobs.length}</h1>
      </div>

      {/* CHART CARD */}
      <div className="chart-card">

        <h2>Job Application Status</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>

            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="count"
              name="Applications"
              stroke="#7c3aed"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* ADD JOB BUTTON */}
      <button
        className="add-job-btn"
        onClick={() => navigate("/add-job")}
      >
        + Add New Job
      </button>

      {/* HIDE / SHOW BUTTON */}
      <button
        className="show-jobs-btn"
        onClick={() => setShowJobs(!showJobs)}
      >
        {showJobs ? "Hide Jobs" : "Show Jobs"}
      </button>

      {/* JOB CARDS */}
      {showJobs && (
        <div className="jobs-container">

          {jobs.map((job) => (

            <div className="job-card" key={job.id}>

              <h2>{job.company}</h2>

              <h3>{job.role}</h3>

              <p className="job-location">
                📍 {job.location}
              </p>

              <div className="job-details">

                <div className="job-row">
                  <span>Job Type</span>
                  <strong>{job.jobType}</strong>
                </div>

                <div className="job-row">
                  <span>Applied Date</span>
                  <strong>{job.appliedDate}</strong>
                </div>

                <div className="job-row">
                  <span>Status</span>
                  <strong>{job.status}</strong>
                </div>

                <div className="job-row">
                  <span>Salary / Stipend</span>
                  <strong>{job.salary}</strong>
                </div>

              </div>

              <p className="job-notes">
                {job.notes}
              </p>

              {job.jobLink && (
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Job
                </a>
              )}

              <div className="action-buttons">

                <button
                  className="edit-btn"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

          {jobs.length === 0 && (
            <p>No Job Applications Found.</p>
          )}

        </div>
      )}

    </div>
  );
}
