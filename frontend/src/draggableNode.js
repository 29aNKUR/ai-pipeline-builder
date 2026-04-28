export const DraggableNode = ({ type, label, color = "#6366f1" }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      style={{
        padding: "6px 14px",
        background: color + "22",
        border: `1px solid ${color}`,
        borderRadius: 8,
        cursor: "grab",
        color: color,
        fontSize: 12,
        fontWeight: 600,
        userSelect: "none",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color + "44";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = color + "22";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label}
    </div>
  );
};
