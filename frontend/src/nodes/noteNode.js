import { useState } from "react";
import { BaseNode, FieldTextarea } from "./BaseNode";

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || "Add a note here...");

  return (
    <BaseNode id={id} title="Note" icon="🗒️" color="#585b70">
      <FieldTextarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Write a note..."
      />
    </BaseNode>
  );
};
