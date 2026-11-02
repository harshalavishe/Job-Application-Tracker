
import { useState } from "react";

function Signin() {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match!");
        return;
      }

      alert("Sign Up page is ready! Authentication will be added later.");
    } else {
      alert("Sign In page is ready! Authentication will be added later.");
    }
  };

  return (
    <div className="auth-page">

      <style>{`
        * {
          box-sizing: border-box;
        }

        .auth-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 25px;
          background: #f4f6fb;
          font-family: Arial, Helvetica, sans-serif;
        }

        .auth-card {
          width: 100%;
          max-width: 475px;
          padding: 42px;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .auth-heading {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-heading h1 {
          margin: 0 0 10px;
          color: #5145ed;
          font-size: 38px;
          font-weight: 700;
        }

        .auth-heading p {
          margin: 0;
          color: #666666;
          font-size: 18px;
        }

        .auth-card label {
          display: block;
          margin: 19px 0 9px;
          color: #000000;
          font-size: 17px;
          font-weight: 700;
        }

        .auth-card input {
          width: 100%;
          padding: 15px;
          border: 1px solid #cccccc;
          border-radius: 9px;
          outline: none;
          background: #ffffff;
          color: #000000;
          font-size: 16px;
        }

        .auth-card input:focus {
          border-color: #5145ed;
          box-shadow: 0 0 0 3px rgba(81,69,237,0.1);
        }

        .auth-card input::placeholder {
          color: #888888;
        }

        .auth-button {
          width: 100%;
          margin-top: 25px;
          padding: 15px;
          border: none;
          border-radius: 9px;
          background: #5145ed;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .auth-button:hover {
          background: #4035d5;
          transform: translateY(-2px);
        }

        .auth-switch {
          margin: 22px 0 0;
          text-align: center;
          color: #000000;
          font-size: 16px;
        }

        .auth-switch button {
          border: none;
          background: none;
          color: #5145ed;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
        }

        .auth-switch button:hover {
          text-decoration: underline;
        }

        @media (max-width: 500px) {
          .auth-card {
            padding: 30px 22px;
          }

          .auth-heading h1 {
            font-size: 32px;
          }

          .auth-heading p {
            font-size: 15px;
          }

          .auth-switch {
            font-size: 14px;
          }
        }
      `}</style>

      <form className="auth-card" onSubmit={handleSubmit}>

        {/* HEADING */}
        <div className="auth-heading">
          <h1>{isSignup ? "Welcome" : "Welcome Back"}</h1>

          <p>
            {isSignup
              ? "Create your JobTracker account"
              : "Login to your JobTracker account"}
          </p>
        </div>

        {/* SIGN UP NAME FIELD */}
        {isSignup && (
          <>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </>
        )}

        {/* EMAIL */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        {/* PASSWORD */}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          minLength="6"
          required
        />

        {/* CONFIRM PASSWORD */}
        {isSignup && (
          <>
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              minLength="6"
              required
            />
          </>
        )}

        {/* BUTTON */}
        <button type="submit" className="auth-button">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>

        {/* SWITCH BETWEEN SIGN IN AND SIGN UP */}
        <p className="auth-switch">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Sign In" : " Sign Up"}
          </button>
        </p>

      </form>
    </div>
  );
}

export default Signin;
