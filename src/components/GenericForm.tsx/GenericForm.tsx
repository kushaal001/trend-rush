"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox" | "date";
  required?: boolean;
  options?: { label: string; value: string }[]; // only for select
  colSpan?: number; // grid column span
}

interface GenericFormProps {
  title?: string;
  fields: FieldConfig[];
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  onGenerateCode?: () => void;
  showBackButton?: boolean;
}
import { useRouter } from "next/navigation";

export default function GenericForm({
  title,
  fields,
  formData,
  setFormData,
  onSubmit,
  onGenerateCode,
  showBackButton,
}: GenericFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked }:any = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
const router = useRouter();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-between">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
{showBackButton && (

<button
  type="button"
  onClick={() => router.back()}
  className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
>
  <ArrowLeft className="w-4 h-4" />
  Back
</button>

)}
</div> 

      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => {
          const colSpan = field.colSpan || 6;

          return (
            <div key={field.name} className={`col-span-${colSpan}`}>
              <label className="block font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Select</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.label}
                  className="w-full border px-4 py-2 rounded"
                />
              )}
            </div>
          );
        })}
      </div>

      {onGenerateCode && (
        <div>
          <button
            type="button"
            onClick={onGenerateCode}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Generate Code
          </button>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
