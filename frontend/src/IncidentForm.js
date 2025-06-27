// src/IncidentForm.js
import React, { useState, useEffect } from 'react';

export default function IncidentForm() {
  // Debug: confirm component load
  console.log('🚀 IncidentForm component loaded');

  // Form state
  const [childName, setChildName]     = useState('');
  const [childId, setChildId]         = useState('');
  const [date, setDate]               = useState(new Date().toISOString().slice(0,16));
  const [type, setType]               = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter]       = useState('');
  const [status, setStatus]           = useState('idle'); // 'idle', 'sending', 'success', 'error'

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🎯 Submit button clicked');
    setStatus('sending');

    const payload = { childName, childId, date, type, description, reporter };
    console.log('💥 Sending payload:', payload);

    try {
      const response = await fetch('https://formspree.io/f/meokvgjq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log('💥 Response status:', response.status);
      const data = await response.json();
      console.log('💥 Response JSON:', data);

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  // Optional mount effect
  useEffect(() => {
    // Could add analytics or additional setup here
  }, []);

  // Show confirmation screen on success
  if (status === 'success') {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>🙏 Thank You!</h1>
        <p>Your incident report has been submitted.</p>
        <button onClick={() => window.location.reload()} style={{
          marginTop: '1rem', padding: '0.5rem 1rem', background: '#0052cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'
        }}>
          Submit Another
        </button>
      </div>
    );
  }

  // Render form
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>📝 Critical Incident Report</h1>
      <form onSubmit={handleSubmit} name="incident-report" data-netlify="true" style={{
        maxWidth: 600, margin: 'auto', display: 'grid', gap: '1rem', background: '#fff', padding: '2rem', borderRadius: 8
      }}>
        {/* Hidden input for Netlify and Formspree */}
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
          Date & Time:
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

        <button type="submit" style={{ padding: '0.75rem', background: '#0052cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Submit Report'}
        </button>

        {status === 'error' && <p style={{ color: 'red' }}>Submission failed—please try again.</p>}
      </form>
    </div>
  );
}


