// src/IncidentForm.js
import React, { useState } from 'react';

export default function IncidentForm() {
  const [childName, setChildName] = useState('');
  const [childId, setChildId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,16));
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0052cc' }}>📝 Critical Incident Report</h1>
      <form
        name="incident-report"
        method="POST"
        data-netlify="true"
        action="/thank-you.html"
        style={{ display: 'grid', gap: '1rem', maxWidth: 600, margin: 'auto', background: '#fff', padding: '2rem', borderRadius: 8 }}
      >
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

        <button type="submit" style={{ padding: '0.75rem', background: '#0052cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Submit Report
        </button>
      </form>
    </div>
  );
}

