
import { useState } from "react";
import "./AddJob.css";

export default function AddJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const [salary, setSalary] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setCompany("");
    setRole("");
    setLocation("");
    setJobType("Full-time");
    setAppliedDate("");
    setStatus("Applied");
    setSalary("");
    setJobLink("");
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company.trim() || !role.trim() || !appliedDate) {
      alert("Please fill in Company Name, Job Role and Applied Date.");
      return;
    }

    const jobData = {
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      jobType,
      appliedDate,
      status,
      salary,
      jobLink: jobLink.trim(),
      notes: notes.trim()
    };

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      alert("Job Added Successfully!");
      resetForm();

    } catch (error) {
      console.error("Error adding job:", error);
      alert("Something went wrong! Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-job-page">

      {/* PAGE HEADER */}
      <div className="add-job-header">
        <div>
          <h1>Add New Job Application</h1>
          <p className="add-job-subtitle">
            Keep your job search organized. Add and manage your applications here.
          </p>
        </div>

        <div className="add-job-header-icon">💼</div>
      </div>

      {/* FORM CARD */}
      <div className="add-job-card">

        <div className="form-card-header">
          <div>
            <h2>Application Details</h2>
            <p>Enter the details of the job you applied for.</p>
          </div>
          <span className="required-note">* Required fields</span>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="add-job-grid">

            {/* COMPANY */}
            <div className="form-group">
              <label>Company Name <span>*</span></label>
              <input
                type="text"
                placeholder="e.g. TCS, Infosys, Wipro"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label>Job Role <span>*</span></label>
              <input
                type="text"
                placeholder="e.g. React Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>

            {/* LOCATION */}
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Pune, Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* JOB TYPE */}
            <div className="form-group">
              <label>Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* APPLIED DATE */}
            <div className="form-group">
              <label>Applied Date <span>*</span></label>
              <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                required
              />
            </div>

            {/* STATUS */}
            <div className="form-group">
              <label>Application Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>
            </div>

            {/* SALARY */}
            <div className="form-group">
              <label>Salary / Stipend</label>
              <input
                type="number"
                min="0"
                placeholder="Enter salary or stipend"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            {/* JOB LINK */}
            <div className="form-group">
              <label>Job Application Link</label>
              <input
                type="url"
                placeholder="https://example.com/job"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
              />
            </div>

          </div>

          {/* NOTES */}
          <div className="form-group notes-group">
            <label>Additional Notes</label>
            <textarea
              placeholder="Add interview details, important dates or any other notes..."
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* BUTTONS */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-job-btn"
              onClick={resetForm}
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="submit-job-btn"
              disabled={loading}
            >
              {loading ? "Adding Job..." : "＋ Add Job Application"}
            </button>
          </div>

        </form>
      </div>

      <p className="add-job-footer-text">
        💡 Tip: Keep your application status updated to track your career progress.
      </p>

    </div>
  );
}
