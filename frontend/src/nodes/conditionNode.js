import { useState } from "react";
import { BaseNode, FieldLabel, FieldInput, FieldSelect } from "./BaseNode";

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "equals");
  const [value, setValue] = useState(data?.value || "");

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      color="#f9e2af"
      inputs={[{ id: "input", label: "input" }]}
      outputs={[
        { id: "true", label: "true", style: { top: "33%" } },
        { id: "false", label: "false", style: { top: "66%" } },
      ]}
    >
      <FieldLabel>
        Operator
        <FieldSelect
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="equals">equals</option>
          <option value="contains">contains</option>
          <option value="greater_than">greater than</option>
          <option value="less_than">less than</option>
          <option value="is_empty">is empty</option>
        </FieldSelect>
      </FieldLabel>
      <FieldLabel>
        Value
        <FieldInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Compare value..."
        />
      </FieldLabel>
    </BaseNode>
  );
};
