import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <span {...{ className: "text-red-400 text-xs font-mono font-bold" }}>
      {message}
    </span>
  );
};
