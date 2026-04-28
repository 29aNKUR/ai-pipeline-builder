import { useState } from "react";
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      color="#6366f1"
      outputs={[{ id: "value", label: "value" }]}
    >
      <FieldLabel>
        Name
        <FieldInput
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </FieldLabel>
      <FieldLabel>
        Type
        <FieldSelect
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </FieldSelect>
      </FieldLabel>
    </BaseNode>
  );
};
