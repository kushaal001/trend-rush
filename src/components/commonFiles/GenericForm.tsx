"use client";
import React, { useState } from "react";
import { X } from "lucide-react"; // Make sure this is imported at the top

export type FieldType =
    | "text"
    | "number"
    | "email"
    | "password"
    | "file"
    | "select"
    | "textarea"
    | "date";

export interface GenericField {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string | number }[]; // for select
    accept?: string; // for file input
}

interface GenericFormProps<T> {
    title: string;
    initialValues: T;
    fields: GenericField[];
    onSubmit: (data: T) => void;
    onCancel?: () => void;
}

export default function GenericForm<T extends Record<string, any>>({
    title,
    initialValues,
    fields,
    onSubmit,
    onCancel,
}: GenericFormProps<T>) {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        let newValue: any = value;
        if (type === "number") {
            newValue = value === "" ? "" : Number(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block font-medium mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        {field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name] ?? ""}
                                onChange={handleChange}
                                required={field.required}
                                placeholder={field.placeholder}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                            />
                        ) : field.type === "select" ? (

                            <div className="relative">
                                <select
                                    name={field.name}
                                    value={formData[field.name] ?? ""}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring appearance-none pr-10"
                                >
                                    <option value="" disabled hidden>
                                        {field.placeholder || `Select ${field.label}`}
                                    </option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                {formData[field.name] && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({ ...prev, [field.name]: "" }))
                                        }
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>


                        ) : field.type === "file" ? (
                            <>
                                <input
                                    type="file"
                                    name={field.name}
                                    accept={field.accept}
                                    onChange={handleFileChange}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                                />
                                {formData[field.name] instanceof File && (
                                    <div className="mt-2">
                                        <img
                                            src={URL.createObjectURL(formData[field.name])}
                                            alt="Preview"
                                            className="h-20 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] ?? ""}
                                onChange={handleChange}
                                required={field.required}
                                placeholder={field.placeholder}
                                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-end gap-4">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
