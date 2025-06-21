"use client";

import GenericForm, { GenericField } from "./GenericForm";

export default function Main() {
  const initialValues = {
    name: "",
    age: "", // note: set to empty string instead of 0
    email: "",
    role: "",
    profilePic: null,
    bio: "",
    dob: "",
  };

  const fields: GenericField[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter your full name",
    },
      {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
    placeholder: "Select your birth date",
  },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: true,
      placeholder: "Enter your age",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      placeholder: "Select your role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
    {
      name: "profilePic",
      label: "Profile Picture",
      type: "file",
      placeholder: "Upload profile image",
      accept: "image/*",
    },
    {
      name: "bio",
      label: "Short Bio",
      type: "textarea",
      placeholder: "Write a short bio about yourself",
    },
  ];

  const handleSubmit = (data: typeof initialValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <GenericForm
      title="User Registration"
      initialValues={initialValues}
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={() => alert("Cancelled")}
    />
  );
}
