import React from "react";

export const Divider = ({ label }: { label: string }) => {
  return (
    <div {...{ className: "flex items-center w-full" }}>
      <div {...{ className: "flex-1 border-t border-gray-300" }}></div>
      <span
        {...{ className: "mx-4 text-xs font-mono text-slate-800 font-bold" }}
      >
        {label}
      </span>
      <div {...{ className: "flex-1 border-t border-gray-300" }}></div>
    </div>
  );
};
