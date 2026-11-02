
import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your message has been submitted successfully!");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have any questions? We would love to hear from you.</p>
      </div>

      <div className="contact-container">

        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            If you have any questions or need help with your
            Job Application Tracker, feel free to contact us.
          </p>

          <div className="info-item">
            <h3>Email</h3>
            <p>support@jobtracker.com</p>
          </div>

          <div className="info-item">
            <h3>Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info-item">
            <h3>Location</h3>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Your Message</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
}
