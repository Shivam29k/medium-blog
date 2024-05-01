import { ChangeEventHandler } from "react";

export function InputFeild({
  label,
  placeholder,
  type,
  onChange,
  autocomplete
}: {
  label: string;
  placeholder: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  autocomplete?: string;
}) {
  return (
    <div className="w-full">
      <div
        // for="first_name"
        className="block mb-2 text-lg font-semibold text-slate-700"
      >
        {label}
      </div>
      <input
        type={type}
        name={label.toLowerCase()}
        className="shadow hover:shadow-md hover:-translate-y-1 transition-all bg-gray-50 border border-gray-300 focus:outline-none  text-gray-900 text-sm rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5"
        placeholder={placeholder}
        autoComplete={autocomplete}
        required
        onChange={onChange}
      />
    </div>
  );
}
