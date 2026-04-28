import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode, FieldLabel } from "./BaseNode";

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  const seen = new Set();
  let match;
  const re = new RegExp(VARIABLE_REGEX.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [currText]);

  const lines = currText.split("\n");
  const longestLine = Math.max(...lines.map((l) => l.length), 20);
  const dynWidth = Math.min(Math.max(220, longestLine * 8 + 40), 500);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      color="#fab387"
      width={dynWidth}
      outputs={[{ id: "output", label: "output" }]}
    >
      {variables.map((varName, i) => (
        <div key={varName}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              background: "#a6e3a1",
              border: "2px solid #1e1e2e",
              width: 10,
              height: 10,
              top:
                variables.length === 1
                  ? "50%"
                  : `${((i + 1) / (variables.length + 1)) * 100}%`,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 14,
              top:
                variables.length === 1
                  ? "calc(50% - 7px)"
                  : `calc(${((i + 1) / (variables.length + 1)) * 100}% - 7px)`,
              fontSize: 10,
              color: "#fab387",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {varName}
          </span>
        </div>
      ))}

      <FieldLabel>
        Text
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
          style={{
            width: "100%",
            background: "#313244",
            border: "1px solid #45475a",
            borderRadius: 6,
            padding: "5px 8px",
            color: "#cdd6f4",
            fontSize: 12,
            outline: "none",
            resize: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
            overflowY: "hidden",
            minHeight: 32,
          }}
        />
      </FieldLabel>
      {variables.length > 0 && (
        <div
          style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4 }}
        >
          {variables.map((v) => (
            <span
              key={v}
              style={{
                background: "#45475a",
                color: "#fab387",
                borderRadius: 4,
                padding: "2px 6px",
                fontSize: 10,
                fontFamily: "monospace",
              }}
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
