
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "./DashBoard.css";

const COLORS = ["#3B82F6", "#F59E0B", "#22C55E", "#EF4444"];

export default function DashBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch jobs");
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error))
      .finally(() => setLoading(false));
  }, []);

  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewedJobs = jobs.filter(
    (job) => job.status === "Interviewed"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const selectedJobs = jobs.filter(
    (job) => job.status === "Selected"
  ).length;

  const chartData = [
    { name: "Applied", count: appliedJobs },
    { name: "Interviewed", count: interviewedJobs },
    { name: "Selected", count: selectedJobs },
    { name: "Rejected", count: rejectedJobs }
  ];

  const pieData = chartData.filter((item) => item.count > 0);

  return (
    <div className="dashboard-page">

      <div className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            Track and manage your job applications.
          </p>
        </div>

        <button
          className="dashboard-add-btn"
          onClick={() => navigate("/add-job")}
        >
          + Add New Job
        </button>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          {/* STATISTICS */}
          <div className="stats-container">

            <div className="stat-card purple">
              <h3>Total Applications</h3>
              <h1>{totalJobs}</h1>
            </div>

            <div className="stat-card blue">
              <h3>Applied</h3>
              <h1>{appliedJobs}</h1>
            </div>

            <div className="stat-card orange">
              <h3>Interviewed</h3>
              <h1>{interviewedJobs}</h1>
            </div>

            <div className="stat-card red">
              <h3>Rejected</h3>
              <h1>{rejectedJobs}</h1>
            </div>

            <div className="stat-card green">
              <h3>Selected</h3>
              <h1>{selectedJobs}</h1>
            </div>

          </div>

          {/* CHARTS */}
          <div className="charts-container">

            <div className="chart-card">
              <h2>Application Status</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    name="Applications"
                    radius={[6, 6, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h2>Application Distribution</h2>

              {pieData.length === 0 ? (
                <p>No application data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {pieData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            COLORS[
                              chartData.findIndex(
                                (item) => item.name === entry.name
                              )
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>

            <button onClick={() => navigate("/add-job")}>
              + Add New Job
            </button>

            <button onClick={() => navigate("/jobs")}>
              View All Applications
            </button>
          </div>

          {/* RECENT APPLICATIONS */}
          <div className="recent-jobs">
            <h2>Recent Applications</h2>

            {jobs.length === 0 ? (
              <p>No applications added yet.</p>
            ) : (
              jobs.slice(-5).reverse().map((job) => (
                <div className="recent-job-card" key={job.id}>
                  <div>
                    <h3>{job.company}</h3>
                    <p>{job.role}</p>
                  </div>

                  <span className={`status ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
