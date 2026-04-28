import { useState } from "react";
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from "./BaseNode";

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "https://api.example.com");
  const [method, setMethod] = useState(data?.method || "GET");

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      color="#89b4fa"
      inputs={[{ id: "body", label: "body" }]}
      outputs={[
        { id: "response", label: "response", style: { top: "33%" } },
        { id: "status", label: "status", style: { top: "66%" } },
      ]}
    >
      <FieldLabel>
        Method
        <FieldSelect value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </FieldSelect>
      </FieldLabel>
      <FieldLabel>
        URL
        <FieldInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </FieldLabel>
    </BaseNode>
  );
};
