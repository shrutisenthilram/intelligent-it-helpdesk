import "./ProjectPage.css";

const github =
  "https://github.com/shrutisenthilram/intelligent-it-helpdesk";

export default function ProjectPage({ openDemo }) {
  return (
    <main className="project-page">

      {/* NAV */}
      <nav className="project-nav">
        <a href="https://www.shrutisenthilram.com" className="name">
          Shruti Senthilram
        </a>

        <div className="nav-links">
          <button onClick={openDemo}>Prototype</button>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="kicker">
          <span>[ CASE STUDY: AI WORKFLOW AUTOMATION ]</span>
          <span>2026</span>
        </div>

        <div className="hero-grid">
          <div>
            <h1>
              From Request
              <br />
              <em>to Action.</em>
            </h1>

            <p className="hero-copy">
              A working IT ticket triage system that uses AI to understand
              unstructured requests and deterministic workflow logic to route
              them consistently.
            </p>

            <div className="hero-buttons">
              <button className="primary" onClick={openDemo}>
                View live prototype →
              </button>

              <a href={github} target="_blank" rel="noreferrer">
                View GitHub ↗
              </a>
            </div>
          </div>

          <div className="hero-side">
            <div>
              <label>PERSONA</label>
              <p>IT Administrator</p>
            </div>

            <div>
              <label>TECHNOLOGY</label>
              <p>n8n + Gemini + React</p>
            </div>

            <div>
              <label>MY ROLE</label>
              <p>Product thinking, workflow design & development</p>
            </div>

            <div>
              <label>TYPE</label>
              <p>Working technical prototype</p>
            </div>
          </div>
        </div>

        <div className="mini-flow">
          <span>TICKET</span>
          <b>→</b>
          <span>AI READS IT</span>
          <b>→</b>
          <span>ROUTED</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="section-number">01</div>

        <div className="section-content">
          <div className="section-label">PROBLEM + PERSONA</div>

          <h2>
            Every ticket needs to be
            <br />
            <em>understood before it can be acted on.</em>
          </h2>

          <div className="problem-grid">
            <div className="large-copy">
              <p>
                A request like <strong>“my VPN keeps dropping”</strong> needs
                someone to interpret it before anything actually happens.
              </p>
            </div>

            <div className="body-copy">
              <p>
                Traditionally, someone reads the ticket, judges its urgency,
                decides what kind of issue it is, and assigns it to the right
                team.
              </p>

              <p>
                For an IT Administrator, that repetitive triage costs time,
                consistency, and attention that could be spent on harder
                problems.
              </p>
            </div>
          </div>

          <div className="manual-flow">
            {[
              "Ticket arrives",
              "Human reads",
              "Human classifies",
              "Human routes",
              "Team acts",
            ].map((step, index) => (
              <div className="manual-step" key={step}>
                <span>0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY IDEA */}
      <section className="dark-section">
        <div className="section-number">02</div>

        <div className="section-content">
          <div className="section-label">THE KEY DECISION</div>

          <p className="giant-statement">
            The AI
            <br />
            <em>interprets.</em>
            <br />
            The workflow
            <br />
            <em>decides.</em>
          </p>

          <div className="dark-explanation">
            <p>
              AI is useful because employees can describe the same problem in
              completely different ways.
            </p>

            <p>
              But AI alone isn't predictable enough to control an operational
              workflow. Once Gemini identifies the category and priority,
              deterministic n8n logic takes over.
            </p>
          </div>
        </div>
      </section>

      {/* ANALOGY */}
      <section className="section analogy">
        <div className="section-number">03</div>

        <div className="section-content">
          <div className="section-label">THE MENTAL MODEL</div>

          <h2>The ER triage nurse.</h2>

          <p className="intro">
            The same pattern already exists in an emergency room.
          </p>

          <div className="comparison">
            <div>
              <label>IN THE ER</label>

              <p>A patient arrives.</p>
              <p>A nurse interprets the symptoms and urgency.</p>
              <p>Hospital protocol determines where the patient goes.</p>

              <strong>The nurse interprets. Protocol decides.</strong>
            </div>

            <div>
              <label>IN THIS WORKFLOW</label>

              <p>A ticket gets submitted.</p>
              <p>Gemini interprets the request and its priority.</p>
              <p>Deterministic workflow logic routes it to the right team.</p>

              <strong>The AI interprets. Workflow logic decides.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="architecture-section">
        <div className="section-number">04</div>

        <div className="section-content">
          <div className="section-label">ARCHITECTURE</div>

          <h2>How the system actually works.</h2>

          <div className="architecture-flow">
            {[
              ["Webhook", "Receive the ticket"],
              ["Validate", "Check subject + description"],
              ["Classify", "Gemini reads the request"],
              ["Structure", "Category + priority"],
              ["Route", "Apply deterministic logic"],
              ["Respond", "Return result to browser"],
            ].map(([title, description], index) => (
              <div className="architecture-step" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>

          <div className="architecture-note">
            <span>DESIGN PRINCIPLE</span>
            <p>
              The model has one bounded job. Structured output makes the result
              predictable for everything downstream.
            </p>
          </div>
        </div>
      </section>

      {/* PROTOTYPE */}
      <section className="prototype-section">
        <div className="section-number">05</div>

        <div className="section-content">
          <div className="section-label">WORKING PROTOTYPE</div>

          <div className="prototype-heading">
            <h2>
              Don't just read about it.
              <br />
              <em>Try it.</em>
            </h2>

            <p>
              Submit an IT request and see how the prototype interprets and
              classifies it.
            </p>
          </div>

          <button className="prototype-window" onClick={openDemo}>
            <div className="browser-bar">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>Intelligent IT Service Desk</span>
            </div>

            <div className="prototype-preview">
              <span>LIVE PROTOTYPE</span>
              <h3>Intelligent IT Helpdesk</h3>
              <p>
                Unstructured request → AI classification → structured result
              </p>

              <strong>OPEN PROTOTYPE →</strong>
            </div>
          </button>
        </div>
      </section>

      {/* VALUE */}
      <section className="section">
        <div className="section-number">06</div>

        <div className="section-content">
          <div className="section-label">PERSONA VALUE</div>

          <h2>
            Automate the repetitive part.
            <br />
            <em>Keep people in control.</em>
          </h2>

          <div className="before-after">
            <div>
              <label>BEFORE</label>
              <p>
                Every ticket needs someone to read it, understand it,
                categorize it, prioritize it, and route it manually.
              </p>
            </div>

            <div>
              <label>AFTER</label>
              <p>
                The workflow handles routine interpretation automatically.
                People stay involved when something requires actual judgment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING */}
      <section className="closing">
        <div className="section-number">07</div>

        <div className="section-content">
          <div className="section-label">WHAT I TOOK AWAY</div>

          <h2>
            Good AI products aren't about
            <br />
            making <em>everything</em> AI.
          </h2>

          <div className="closing-copy">
            <p>
              Building this changed how I think about AI product design.
              The interesting question wasn't simply whether an LLM could
              classify a ticket.
            </p>

            <p>
              It was deciding where probabilistic interpretation adds value,
              where deterministic software should take over, and how those
              pieces can form a workflow that remains understandable and
              controllable.
            </p>
          </div>

          <div className="closing-actions">
            <button className="primary" onClick={openDemo}>
              Try the prototype →
            </button>

            <a href={github} target="_blank" rel="noreferrer">
              View source on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Shruti Senthilram</span>

        <div>
          <a href="https://www.shrutisenthilram.com">Portfolio ↗</a>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </footer>
    </main>
  );
}