import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://ai-pipeline-builder-production.up.railway.app/pipelines/parse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes, edges }),
        },
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      alert(
        `Pipeline Analysis\n` +
          `─────────────────\n` +
          `Nodes:  ${data.num_nodes}\n` +
          `Edges:  ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? "✅ Yes" : "❌ No (contains cycles)"}`,
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 28px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: 0.5,
          boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(99,102,241,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(99,102,241,0.4)";
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
