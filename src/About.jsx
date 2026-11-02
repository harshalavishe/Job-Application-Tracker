import "./About.css";
export default function About() {
  return (
    <div className="about-page">
      <h1>About <span>JobTracker</span></h1>

      <p className="about-intro">
        JobTracker helps you manage your job search
        easily and stay organized.
      </p>

      <div className="about-card">
        <h2>Our Purpose</h2>
        <p>
          Finding a job can be challenging. JobTracker
          helps you keep all your job applications in
          one place and track your progress.
        </p>

        <h2>What You Can Do</h2>
        <ul>
          <li>Add and manage job applications</li>
          <li>Track pending, interview and rejected jobs</li>
          <li>Manage interview schedules</li>
          <li>View your job search progress</li>
        </ul>
      </div>
    </div>
  );
}

