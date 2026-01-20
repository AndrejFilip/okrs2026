import React, { memo } from "react";

export const StatItem = memo(
  ({
    title,
    value,
    unit,
    icon,
  }: {
    title: string;
    value: number;
    unit: string;
    icon: React.ReactNode;
  }) => {
    return (
      <div
        {...{
          className:
            "bg-slate-800 rounded-lg text-white p-2 w-[30vw] lg:h-[150px] h-auto flex items-center gap-3 justify-center",
        }}
      >
        {icon}
        <div
          {...{
            className:
              "flex flex-col gap-4 items-center text-mono justify-center",
          }}
        >
          <span {...{ className: "text-xl" }}>{title}</span>
          <span {...{ className: "text-3xl font-bold" }}>
            {value} {unit}
          </span>
        </div>
      </div>
    );
  },
);
