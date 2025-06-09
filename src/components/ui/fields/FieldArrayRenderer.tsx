// components/forms/FieldArrayRenderer.tsx
"use client";

import { useFieldArray, Control } from "react-hook-form";

import { Trash, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { FieldConfig } from "@/components/GenericForm";

interface FieldArrayRendererProps {
  field: FieldConfig;
  form: any;
  renderField: (field: FieldConfig) => React.ReactNode;
}

const FieldArrayRenderer: React.FC<FieldArrayRendererProps> = ({ field, form, renderField }) => {
  const { fields: items, append, remove } = useFieldArray({
    control: form.control as Control,
    name: field.name,
  });


  return (
    <div className="col-span-2 border-t ">
      <div className="flex justify-between items-center py-10">
        <h3 className="text-lg font-semibold">{field.label}</h3>
        <button
         style={{
            boxShadow: `
            inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
            inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
            inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
            inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
          `
          }}
          type="button"
          onClick={() => append({})}
          className="text-sm text-white px-4 py-1.5  text-[13px] leading-[160%] rounded-[10px]  dark:font-medium bg-[var(--secondary_color)]"
        >
          <Plus size={16} className="inline mr-1" />
          Add
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="grid grid-cols-2 gap-4 mb-4 border p-4 rounded-md bg-gray-50 relative"
        >
          {field.fields?.map((subField:any) => {
            const updatedField: FieldConfig = {
              ...subField,
              name: `${field.name}[${index}].${subField.name}`,
            };
            return <div key={updatedField.name}>{renderField(updatedField)}</div>;
          })}

          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-red-600"
          >
            <Trash size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FieldArrayRenderer;
