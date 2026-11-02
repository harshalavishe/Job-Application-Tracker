
import { useEffect, useState } from "react";
import "./ApplicationTracker.css";

const filters = [
  "All",
  "Pending",
  "Interview",
  "Accepted",
  "Rejected",
  "No Answer"
];

// Existing project status values आणि UI status यांचे mapping
const getDisplayStatus = (status) => {
  const value = status?.toLowerCase();

  if (value === "applied" || value === "pending") return "Pending";
  if (value === "interviewed" || value === "interview") return "Interview";
  if (value === "selected" || value === "accepted") return "Accepted";
  if (value === "rejected") return "Rejected";
  if (value === "no answer") return "No Answer";

  return status || "Pending";
};

const getDatabaseStatus = (status) => {
  const statusMap = {
    Pending: "Applied",
    Interview: "Interviewed",
    Accepted: "Selected",
    Rejected: "Rejected",
    "No Answer": "No Answer"
  };

  return statusMap[status] || status;
};

export default function ApplicationTracker() {
  const [jobs, setJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    fetch("http://localhost:3000/jobs")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch jobs");
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Calculate status counts
  const statusCounts = {
    Pending: jobs.filter(
      (job) => getDisplayStatus(job.status) === "Pending"
    ).length,

    Interview: jobs.filter(
      (job) => getDisplayStatus(job.status) === "Interview"
    ).length,

    Accepted: jobs.filter(
      (job) => getDisplayStatus(job.status) === "Accepted"
    ).length,

    Rejected: jobs.filter(
      (job) => getDisplayStatus(job.status) === "Rejected"
    ).length,

    "No Answer": jobs.filter(
      (job) => getDisplayStatus(job.status) === "No Answer"
    ).length
  };

  const statusColors = {
    Pending: "#3B82F6",
    Interview: "#F59E0B",
    Accepted: "#22C55E",
    Rejected: "#F43F5E",
    "No Answer": "#94A3B8"
  };

  // Filter and search applications
  const filteredJobs = jobs.filter((job) => {
    const status = getDisplayStatus(job.status);

    const matchesFilter =
      activeFilter === "All" || status === activeFilter;

    const matchesSearch =
      (job.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (job.role || "").toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Update application status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/jobs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: getDatabaseStatus(newStatus)
          })
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update status");
      }

      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          String(job.id) === String(id)
            ? { ...job, status: getDatabaseStatus(newStatus) }
            : job
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
      alert("Unable to update status. Please try again.");
    }
  };

  const totalJobs = jobs.length;

  return (
    <div className="application-tracker">

      {/* APPLICATION STATUS */}
      <section className="status-panel">
        <h2>Application Status</h2>

        <div className="status-list">
          {filters.slice(1).map((status) => {
            const count = statusCounts[status];
            const percentage =
              totalJobs > 0 ? (count / totalJobs) * 100 : 0;

            return (
              <div className="status-row" key={status}>
                <span className={`status-label ${status.toLowerCase().replace(" ", "-")}`}>
                  {status}
                </span>

                <span className="status-count">
                  {count}
                </span>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: statusColors[status]
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* APPLICATIONS LIST */}
      <section className="applications-panel">

        <h2>Applications</h2>

        {/* FILTER BUTTONS */}
        <div className="application-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="application-search">
          <input
            type="text"
            placeholder="Search company or position"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setActiveFilter("All")}>
            Search
          </button>
        </div>

        {/* JOB CARDS */}
        <div className="application-list">

          {loading ? (
            <p className="empty-message">Loading applications...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="empty-message">
              No applications found.
            </p>
          ) : (
            filteredJobs.map((job) => {
              const currentStatus = getDisplayStatus(job.status);

              return (
                <div className="application-card" key={job.id}>

                  <div className="application-details">
                    <h3>{job.role}</h3>

                    <span className="job-type">
                      {job.jobType || "Full-time"}
                    </span>

                    <p className="company-name">
                      {job.company}
                    </p>

                    <p className="job-location">
                      {job.location || "Location not specified"}
                    </p>
                  </div>

                  <div className="application-status-control">
                    <label>Status:</label>

                    <select
                      className={`application-status-select ${currentStatus.toLowerCase().replace(" ", "-")}`}
                      value={currentStatus}
                      onChange={(e) =>
                        handleStatusChange(job.id, e.target.value)
                      }
                    >
                      {filters.slice(1).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
              );
            })
          )}

        </div>
      </section>
    </div>
  );
}
