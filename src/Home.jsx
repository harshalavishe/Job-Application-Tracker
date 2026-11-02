
import { Link, useNavigate } from "react-router-dom";
import girlImage from "./assets/girl.png.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-navbar">
        <Link to="/" className="home-logo">
          <span>Job</span>
          <span className="tracker-text">Tracker</span>
        </Link>

        <div className="home-nav-links">
          <Link to="/" className="active">Home</Link>
          <a href="#about">About</a>
          <Link to="/contact">Contact</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">
          <p className="hero-tag">
            <span>●</span> YOUR CAREER, YOUR JOURNEY
          </p>

          <h1>
            Find Your <span className="gradient-text">Dream Job.</span>
            <br />
            Track <span className="gradient-text">Every Step.</span>
          </h1>

          <p className="hero-description">
            Keep all your job applications in one place.
            Track interviews, manage application status,
            and move closer to your dream career.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Get Started →
            </button>

            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>

          {/* HERO STATS */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-icon">💼</span>
              <div>
                <h3>Organize</h3>
                <p>Your Applications</p>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div>
                <h3>Track</h3>
                <p>Your Progress</p>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">🏆</span>
              <div>
                <h3>Achieve</h3>
                <p>Your Career Goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="hero-image">
          <div className="illustration-glow"></div>

          <img
            src={girlImage}
            alt="Girl working on laptop"
            className="job-hero-image"
          />

          <div className="floating-badge">
            <span>✓</span>
            Your next opportunity awaits
          </div>

          <div className="image-caption">
            <span className="caption-icon">✦</span>
            <div>
              <h3>Your Future Starts Here</h3>
              <p>Discover opportunities. Grow your career.</p>
            </div>
          </div>
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="about">
        <h2>
          Everything in <span className="gradient-text">One Place</span>
        </h2>

        <p className="features-subtitle">
          Make your job search simple and organized.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Track Applications</h3>
            <p>
              Manage all your job applications easily
              in one place.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Interview Planner</h3>
            <p>
              Keep track of interviews and follow-ups.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>View Progress</h3>
            <p>
              Understand your job search with
              application statistics and graphs.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>
          © 2026 JobTracker. Build your career with confidence.
          <span> 💙</span>
        </p>
      </footer>

    </div>
  );
}

export default Home;
