import { useState } from "react";
import { BaseNode, FieldLabel, FieldSelect } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || "gpt-4o");

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🧠"
      color="#a6e3a1"
      inputs={[
        { id: "system", label: "system", style: { top: "33%" } },
        { id: "prompt", label: "prompt", style: { top: "66%" } },
      ]}
      outputs={[{ id: "response", label: "response" }]}
    >
      <FieldLabel>
        Model
        <FieldSelect value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
          <option value="claude-3-sonnet">Claude 3 Sonnet</option>
          <option value="gemini-pro">Gemini Pro</option>
        </FieldSelect>
      </FieldLabel>
      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: "#6c7086",
          textAlign: "center",
        }}
      >
        Inputs: system prompt + user prompt
      </p>
    </BaseNode>
  );
};
