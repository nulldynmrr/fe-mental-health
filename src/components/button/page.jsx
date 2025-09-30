"use client";
import React from "react";

const Button = ({
  variant = "primary",
  text,
  icon,
  iconPosition = "left",
  onClick,
  fullWidth = false,
  maxWidth,
}) => {
  const baseStyle =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary:
      "bg-white text-primary-500 border border-primary-500 hover:bg-primary-50",
    disabled: "bg-gray-400 text-white cursor-not-allowed",
    outline: "border border-[#EBE9F1] text-gray-600 hover:bg-gray-100",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const customMaxWidth = maxWidth ? `max-w-[${maxWidth}]` : "";

  const isIconOnly = icon && !text;

  return (
    <button
      className={`${baseStyle} ${
        variants[variant]
      } ${widthStyle} ${customMaxWidth} ${isIconOnly ? "p-3 text-xl" : ""}`}
      onClick={onClick}
      disabled={variant === "disabled"}
      style={maxWidth ? { maxWidth } : {}}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {text && <span>{text}</span>}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
