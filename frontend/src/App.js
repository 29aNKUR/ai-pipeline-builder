import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import "./index.css";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#11111b",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          background: "#181825",
          borderBottom: "1px solid #313244",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 20 }}>⚡</span>
        <span
          style={{
            color: "#cdd6f4",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: 0.5,
          }}
        >
          VectorShift Pipeline Builder
        </span>
      </div>

      <PipelineToolbar />

      <div style={{ flex: 1, overflow: "hidden" }}>
        <PipelineUI />
      </div>

      <div style={{ background: "#181825", borderTop: "1px solid #313244" }}>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
