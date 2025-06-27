// src/IncidentForm.js
import React, { useState } from 'react';

export default function IncidentForm() {
  // Form field state
  const [childName, setChildName]     = useState('');
  const [childId, setChildId]         = useState('');
  const [date, setDate]               = useState(new Date().toISOString().slice(0,16));
  const [type, setType]               = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter]       = useState('');

  // Track whether we've submitted
  const [submitted, setSubmitted] = useState(false);

  // Handle form POST to Netlify
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build a FormData object from the form element
    const form = e.target;
    const data = new FormData(form);

    // POST to Netlify Forms
    try {
      await fetch('/', {
        method: 'POST',
        body: data
      });
      // Show the Thank You message
      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      alert('Sorry—there was a problem. Please try again.');
    }
  };

  // If submitted, show a confirmation screen
  if (submitted) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1 style={{ color: '#0052cc' }}>Thank You!</h1>
        <p>Your incident report has been received.</p>
        <button onClick={() => window.location.reload()} style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#0052cc',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}>
          Submit Another
        </button>
      </div>
    );
  }

  // Otherwise render the form
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0052cc' }}>📝 Critical Incident Report</h1>
      <form
        name="incident-report"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        style={{ display: 'grid', gap: '1rem', maxWidth: 600, margin: 'auto', background: '#fff', padding: '2rem', borderRadius: 8 }}
      >
        {/* Netlify form-name hook */}
        <input type="hidden" name="form-name" value="incident-report" />

        <label>
          Child Name:
          <input
            name="childName"
            value={childName}
            onChange={e => setChildName(e.target.value)}
            required
          />
        </label>

        <label>
          Child ID:
          <input
            name="childId"
            value={childId}
            onChange={e => setChildId(e.target.value)}
            required
          />
        </label>

        <label>
          Date &amp; Time:
          <input
            type="datetime-local"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Incident Type:
          <input
            name="type"
            placeholder="e.g. Serious injury/illness"
            value={type}
            onChange={e => setType(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Reporter Name/Email:
          <input
            name="reporter"
            value={reporter}
            onChange={e => setReporter(e.target.value)}
            required
          />
        </label>

        <button type="submit" s
