import { DraggableNode } from "./draggableNode";

const nodes = [
  { type: "customInput", label: "Input", color: "#6366f1" },
  { type: "customOutput", label: "Output", color: "#f38ba8" },
  { type: "llm", label: "LLM", color: "#a6e3a1" },
  { type: "text", label: "Text", color: "#fab387" },
  { type: "api", label: "API Call", color: "#89b4fa" },
  { type: "prompt", label: "Prompt", color: "#cba6f7" },
  { type: "condition", label: "Condition", color: "#f9e2af" },
  { type: "transform", label: "Transform", color: "#94e2d5" },
  { type: "note", label: "Note", color: "#585b70" },
];

export const PipelineToolbar = () => (
  <div
    style={{
      padding: "12px 16px",
      background: "#181825",
      borderBottom: "1px solid #313244",
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}
  >
    <span
      style={{
        color: "#cdd6f4",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        marginRight: 8,
      }}
    >
      Nodes
    </span>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {nodes.map((n) => (
        <DraggableNode
          key={n.type}
          type={n.type}
          label={n.label}
          color={n.color}
        />
      ))}
    </div>
  </div>
);
