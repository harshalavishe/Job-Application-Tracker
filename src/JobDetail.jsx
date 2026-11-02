
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const [salary, setSalary] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");

  // GET JOB DETAILS
  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCompany(data.company);
        setRole(data.role);
        setLocation(data.location);
        setJobType(data.jobType);
        setAppliedDate(data.appliedDate);
        setStatus(data.status);
        setSalary(data.salary);
        setJobLink(data.jobLink);
        setNotes(data.notes);
      })
      .catch((error) => console.error("Error fetching job:", error));
  }, [id]);

  // UPDATE JOB
  const handleUpdate = () => {
    const jobData = {
      company: company,
      role: role,
      location: location,
      jobType: jobType,
      appliedDate: appliedDate,
      status: status,
      salary: salary,
      jobLink: jobLink,
      notes: notes
    };

    fetch(`http://localhost:3000/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update job");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Job Updated:", data);
        alert("Job Updated Successfully!");
        navigate("/jobs");
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong!");
      });
  };

  return (
    <>
      <h1>Edit Job Application</h1>

      <h3>Company Name:</h3>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <h3>Job Role:</h3>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <h3>Location:</h3>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <h3>Job Type:</h3>
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="Full-time">Full-time</option>
        <option value="Internship">Internship</option>
        <option value="Part-time">Part-time</option>
      </select>

      <h3>Applied Date:</h3>
      <input
        type="date"
        value={appliedDate}
        onChange={(e) => setAppliedDate(e.target.value)}
      />

      <h3>Status:</h3>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>

      <h3>Salary / Stipend:</h3>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <h3>Job Link:</h3>
      <input
        type="url"
        value={jobLink}
        onChange={(e) => setJobLink(e.target.value)}
      />

      <h3>Notes:</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={handleUpdate}>Update Job</button>
    </>
  );
}
