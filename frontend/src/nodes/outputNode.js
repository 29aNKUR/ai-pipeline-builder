import { useState } from "react";
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      color="#f38ba8"
      inputs={[{ id: "value", label: "value" }]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </FieldSelect>
      </FieldLabel>
    </BaseNode>
  );
};
