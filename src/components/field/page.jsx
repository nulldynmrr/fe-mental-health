"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]">
            <Icon size={18} />
          </span>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`w-full border border-[#D1D1D1] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none
            ${Icon ? "pl-12" : "pl-4"}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
