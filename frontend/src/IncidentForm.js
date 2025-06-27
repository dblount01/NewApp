// src/IncidentForm.js
import React, { useState } from 'react';

export default function IncidentForm() {
  const [childName, setChildName]     = useState('');
  const [childId, setChildId]         = useState('');
  const [date, setDate]               = useState(new Date().toISOString().slice(0,16));
  const [type, setType]               = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter]       = useState('');
  const [status, setStatus]           = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Build FormData for Formspree
    const form = e.target;
    const formData = new FormData(form);
    // Debug: log payload
    console.log('💥 Sending payload:', Array.from(formData.entries()));

    try {
      const response = await fetch('https://formspree.io/f/meokvgjq', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      console.log('💥 Response status:', response.status);
      const result = await response.json();
      console.log('💥 Response JSON:', result);
      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>🙏 Thank You!</h1>
        <p>Your incident report has been submitted.</p>
        <button onClick={() => window.location.reload()}>Submit Another</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>📝 Critical Incident Report</h1>
      <form onSubmit={handleSubmit} name="incident-report" data-netlify="true" style={{ maxWidth: 600, margin: 'auto', display:'grid', gap:'1rem', background:'#fff', padding:'2rem', borderRadius:8 }}>
        {/* Formspree requires the form-name hidden input */}
        <input type="hidden" name="form-name" value="incident-report" />

        <label>
          Child Name:
          <input name="childName" value={childName} onChange={e => setChildName(e.target.value)} required />
        </label>

        <label>
          Child ID:
          <input name="childId" value={childId} onChange={e => setChildId(e.target.value)} required />
        </label>

        <label>
          Date &amp; Time:
          <input type="datetime-local" name="date" value={date} onChange={e => setDate(e.target.value)} required />
        </label>

        <label>
          Incident Type:
          <input name="type" placeholder="e.g. Serious injury/illness" value={type} onChange={e => setType(e.target.value)} required />
        </label>

        <label>
          Description:
          <textarea name="description" rows="5" value={description} onChange={e => setDescription(e.target.value)} required />
        </label>

        <label>
          Reporter Name/Email:
          <input name="reporter" value={reporter} onChange={e => setReporter(e.target.value)} required />
        </label>

        <button type="submit" style={{ padding:'0.75rem', background:'#0052cc', color:'#fff', border:'none', borderRadius:4, cursor:'pointer' }} disabled={status==='sending'}>
          {status==='sending' ? 'Sending…' : 'Submit Report'}
        </button>
        {status==='error' && <p style={{ color:'red' }}>Submission failed. Please try again.</p>}
      </form>
    </div>
  );
}
