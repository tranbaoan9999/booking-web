'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>Have questions? We would love to hear from you!</p>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <h2>Get In Touch</h2>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📍</div>
            <div>
              <h3>Address</h3>
              <p>123 Cherry Blossom Street<br/>Sakura City, SC 12345</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📞</div>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>✉️</div>
            <div>
              <h3>Email</h3>
              <p>info@sakuramura.com</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>🕒</div>
            <div>
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>
              Saturday: 10:00 AM - 4:00 PM<br/>
              Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
