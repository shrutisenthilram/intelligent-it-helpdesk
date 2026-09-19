import { useState } from 'react'
import './App.css'
const USE_MOCK_DATA = false;
//connection
const WEBHOOK_URL = 'http://localhost:5678/webhook/ticket-triage';

const CATEGORY_COLORS = {
  'Identity & Access': '#4f46e5',
  'Network & Connectivity': '#0891b2',
  'Hardware & Device': '#ca8a04',
  'Application & Software': '#16a34a',
  'Security Incident': '#dc2626',
};

function mockClassify(subject, description) {
  const text = (subject + ' ' + description).toLowerCase();
  if (text.includes('phish') || text.includes('malware') || text.includes('suspicious') || text.includes('compromised')) {
    return {
      category: 'Security Incident',
      priority: 'Critical',
      team: 'Security Operations Center',
      summary: 'Potential security incident detected in ticket description.',
      action: 'Escalated for immediate security investigation.',
    };
  }
  if (text.includes('vpn') || text.includes('wifi') || text.includes('dns') || text.includes('connect')) {
    return {
      category: 'Network & Connectivity',
      priority: 'High',
      team: 'Network Operations',
      summary: 'Connectivity issue reported by employee.',
      action: 'Routed to network operations for diagnosis.',
    };
  }
  if (text.includes('password') || text.includes('mfa') || text.includes('locked') || text.includes('access')) {
    return {
      category: 'Identity & Access',
      priority: 'Medium',
      team: 'Identity & Access Management',
      summary: 'Account or access issue reported by employee.',
      action: 'Routed to identity team for resolution.',
    };
  }
  if (text.includes('laptop') || text.includes('monitor') || text.includes('keyboard') || text.includes('camera')) {
    return {
      category: 'Hardware & Device',
      priority: 'Medium',
      team: 'Endpoint Support',
      summary: 'Hardware issue reported by employee.',
      action: 'Routed to endpoint support for triage.',
    };
  }
  return {
    category: 'Application & Software',
    priority: 'Medium',
    team: 'Application Support',
    summary: 'Software issue reported by employee.',
    action: 'Routed to application support team.',
  };
}

function App() {
  const [form, setForm] = useState({ employeeName: '', email: '', subject: '', description: '' });
  const [tickets, setTickets] = useState([]);
  const [counts, setCounts] = useState({
    'Identity & Access': 0,
    'Network & Connectivity': 0,
    'Hardware & Device': 0,
    'Application & Software': 0,
    'Security Incident': 0,
  });
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [ticketCounter, setTicketCounter] = useState(1000);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) {
      setStatus('error');
      return;
    }
    setStatus('loading');

    let result;
    try {
      if (USE_MOCK_DATA) {
        await new Promise((r) => setTimeout(r, 700));
        result = mockClassify(form.subject, form.description);
      } else {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Webhook error');
        const raw = await res.json();
        result = raw.output || raw;
      }

      const newTicketId = `IT-${ticketCounter + 1}`;
      setTicketCounter(ticketCounter + 1);

      const newTicket = {
        id: newTicketId,
        subject: form.subject,
        summary: result.summary || `${result.category} issue reported.`,
        team: result.team || `${result.category} Team`,
        action: result.action || 'Routed for review.',
        ...result,
      };

      setTickets([newTicket, ...tickets]);
      setCounts({ ...counts, [result.category]: (counts[result.category] || 0) + 1 });
      setStatus('idle');
      setForm({ employeeName: '', email: '', subject: '', description: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const totalTickets = tickets.length;

  return (
    <div className="app">
      <header className="header">
        <h1>Intelligent IT Service Desk</h1>
        <p>AI-assisted ticket classification & routing</p>
      </header>

      <div className="grid">
        <section className="panel">
          <h2>Submit a Request</h2>
          <form onSubmit={handleSubmit} className="form"> 
            <label>
              Name
              <input name="employeeName" value={form.employeeName} onChange={handleChange} placeholder="Sarah Chen" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="sarah@example.com" />
            </label>
            <label>
              Subject
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Cannot access VPN" required />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="My VPN connection fails after MFA and I cannot access internal applications."
                required
              />
            </label>
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Analyzing ticket...' : 'Submit Ticket'}
            </button>
            {status === 'error' && (
              <p className="error-text">Please fill in a subject and description.</p>
            )}
          </form>
        </section>

        <section className="panel">
          <h2>IT Operations Dashboard</h2>
          <p className="total">Total tickets: {totalTickets}</p>

          <div className="counts">
            {Object.entries(counts).map(([cat, count]) => (
              <div key={cat} className="count-row">
                <span className="dot" style={{ background: CATEGORY_COLORS[cat] }} />
                <span className="cat-name">{cat}</span>
                <span className="cat-count">{count}</span>
              </div>
            ))}
          </div>

          <h3>Recent Ticket Result</h3>
          {tickets.length === 0 && <p className="empty">No tickets submitted yet.</p>}
          {tickets.slice(0, 1).map((t) => (
            <div key={t.id} className="ticket-card" style={{ borderLeftColor: CATEGORY_COLORS[t.category] }}>
              <div className="ticket-top">
                <strong>{t.id}</strong>
                <span className="badge" style={{ background: CATEGORY_COLORS[t.category] }}>
                  {t.category.toUpperCase()}
                </span>
                <span className="priority">{t.priority?.toUpperCase()}</span>
              </div>
              <p className="ticket-subject">{t.subject}</p>
              <p className="ticket-summary"><strong>AI Summary:</strong> {t.summary}</p>
              <p className="ticket-team"><strong>Assigned Team:</strong> {t.team}</p>
              <p className="ticket-action"><strong>Action:</strong> {t.action}</p>
            </div>
          ))}

          {tickets.length > 1 && (
            <div className="history">
              <h3>History</h3>
              {tickets.slice(1).map((t) => (
                <div key={t.id} className="history-row">
                  <span className="dot" style={{ background: CATEGORY_COLORS[t.category] }} />
                  <span>{t.id} — {t.subject}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App