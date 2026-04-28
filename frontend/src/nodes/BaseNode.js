import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  color = "#6366f1",
  icon = null,
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  width,
  style = {},
}) => {
  const nodeWidth = width || minWidth;

  return (
    <div
      style={{
        width: nodeWidth,
        minWidth,
        background: "#1e1e2e",
        border: "1px solid #313244",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        overflow: "visible",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          background: color,
          borderRadius: "11px 11px 0 0",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 0.3,
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "10px 12px 12px", position: "relative" }}>
        {children}
      </div>
      {inputs.map((handle, i) => (
        <div key={handle.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{
              background: "#a6e3a1",
              border: "2px solid #1e1e2e",
              width: 10,
              height: 10,
              top:
                handle.style?.top ||
                `${((i + 1) / (inputs.length + 1)) * 100}%`,
              ...handle.style,
            }}
          />
          {handle.label && (
            <span
              style={{
                position: "absolute",
                left: 14,
                top: handle.style?.top
                  ? `calc(${handle.style.top} - 7px)`
                  : `calc(${((i + 1) / (inputs.length + 1)) * 100}% - 7px)`,
                fontSize: 10,
                color: "#cdd6f4",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}
      {outputs.map((handle, i) => (
        <div key={handle.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={{
              background: "#89b4fa",
              border: "2px solid #1e1e2e",
              width: 10,
              height: 10,
              top:
                handle.style?.top ||
                `${((i + 1) / (outputs.length + 1)) * 100}%`,
              ...handle.style,
            }}
          />
          {handle.label && (
            <span
              style={{
                position: "absolute",
                right: 14,
                top: handle.style?.top
                  ? `calc(${handle.style.top} - 7px)`
                  : `calc(${((i + 1) / (outputs.length + 1)) * 100}% - 7px)`,
                fontSize: 10,
                color: "#cdd6f4",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                textAlign: "right",
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
export const FieldLabel = ({ children }) => (
  <label
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 4,
      marginBottom: 8,
      fontSize: 11,
      color: "#a6adc8",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    }}
  >
    {children}
  </label>
);

export const FieldInput = ({ style = {}, ...props }) => (
  <input
    style={{
      width: "100%",
      background: "#313244",
      border: "1px solid #45475a",
      borderRadius: 6,
      padding: "5px 8px",
      color: "#cdd6f4",
      fontSize: 12,
      outline: "none",
      boxSizing: "border-box",
      ...style,
    }}
    {...props}
  />
);

export const FieldSelect = ({ children, style = {}, ...props }) => (
  <select
    style={{
      width: "100%",
      background: "#313244",
      border: "1px solid #45475a",
      borderRadius: 6,
      padding: "5px 8px",
      color: "#cdd6f4",
      fontSize: 12,
      outline: "none",
      boxSizing: "border-box",
      ...style,
    }}
    {...props}
  >
    {children}
  </select>
);

export const FieldTextarea = ({ style = {}, ...props }) => (
  <textarea
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
      ...style,
    }}
    {...props}
  />
);
