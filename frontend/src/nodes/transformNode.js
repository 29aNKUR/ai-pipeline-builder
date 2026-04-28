import { useState } from "react";
import { BaseNode, FieldLabel, FieldSelect, FieldInput } from "./BaseNode";

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "uppercase");
  const [param, setParam] = useState(data?.param || "");

  const showParam = ["replace", "slice", "split"].includes(operation);

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      color="#94e2d5"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[{ id: "output", label: "output" }]}
    >
      <FieldLabel>
        Operation
        <FieldSelect
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="replace">Replace</option>
          <option value="slice">Slice</option>
          <option value="split">Split</option>
          <option value="json_parse">JSON Parse</option>
          <option value="json_stringify">JSON Stringify</option>
        </FieldSelect>
      </FieldLabel>
      {showParam && (
        <FieldLabel>
          Param
          <FieldInput
            value={param}
            onChange={(e) => setParam(e.target.value)}
            placeholder="Parameter..."
          />
        </FieldLabel>
      )}
    </BaseNode>
  );
};
