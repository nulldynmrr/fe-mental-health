"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  message,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-neut-800"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neut-400">
            <Icon size={18} />
          </span>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-neut-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none
            ${Icon ? "pl-12" : "pl-4"} ${message ? "border-red-500" : ""}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neut-400"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        )}
      </div>

      {message && <p className="mt-1 text-xs text-red-500">{message}</p>}
    </div>
  );
};

export default InputField;
