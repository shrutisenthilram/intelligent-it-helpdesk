import { useState } from "react";
import ProjectPage from "./ProjectPage";
import HelpdeskApp from "./HelpdeskApp";

export default function App() {
  const [view, setView] = useState("project");

  if (view === "demo") {
    return (
      <div>
        <button
          onClick={() => setView("project")}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 99999,
            padding: "12px 18px",
            border: "none",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Back to case study
        </button>

        <HelpdeskApp />
      </div>
    );
  }

  return <ProjectPage openDemo={() => setView("demo")} />;
}