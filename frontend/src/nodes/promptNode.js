import { useState } from "react";
import { BaseNode, FieldLabel, FieldTextarea } from "./BaseNode";

export const PromptNode = ({ id, data }) => {
  const [template, setTemplate] = useState(
    data?.template || "You are a helpful assistant. Answer: {{question}}",
  );

  return (
    <BaseNode
      id={id}
      title="Prompt"
      icon="✍️"
      color="#cba6f7"
      inputs={[{ id: "context", label: "context" }]}
      outputs={[{ id: "prompt", label: "prompt" }]}
    >
      <FieldLabel>
        Template
        <FieldTextarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          rows={3}
        />
      </FieldLabel>
    </BaseNode>
  );
};
